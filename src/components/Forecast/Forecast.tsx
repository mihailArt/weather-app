import Carousel from '../../Carousel/Carousel'
import './Forecast.css'

const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
}

function getCardinalDirection(angle: any) {
	const directions = [
		'↑ N',
		'↗ NE',
		'→ E',
		'↘ SE',
		'↓ S',
		'↙ SW',
		'← W',
		'↖ NW',
	]
	return directions[Math.round(angle / 45) % 8]
}

const Forecast = ({ children, ...props }: any) => {
	return (
		props &&
		props.values && (
			<div className='forecast'>
				<Carousel>
					{props.values.map((day: any, i: any) => {
						return (
							<div key={i} className='forecast-day'>
								<div className='forecast-day-header'>
									<div>
										{new Date(day.datetime).toLocaleDateString(
											'en-us',
											options
										)}
									</div>
									<div>{day.conditions}</div>
								</div>
								<div>
									{Math.round(day.maxt)} °C / {Math.round(day.mint)} °C
								</div>
								<div>
									Wind: {getCardinalDirection(day.wdir)}, {day.wspd} m/s
								</div>
							</div>
						)
					})}
				</Carousel>
			</div>
		)
	)
}

export default Forecast

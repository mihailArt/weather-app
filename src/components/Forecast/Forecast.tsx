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

const Forecast = ({ values }: any) => {
	return (
		values.length && (
			<div className='forecast'>
				<Carousel>
					{values.map((day: any, i: any) => {
						return (
							<div key={i} className='forecast-day-card'>
								<div className='forecast-day'>
									<div className='forecast-day-header'>
										<div className='forecast-date'>
											{new Date(day.datetime).toLocaleDateString(
												'en-us',
												options
											)}
										</div>
										<div className='forecast-description'>{day.conditions}</div>
									</div>
									<div className='forecast-temp'>
										{Math.round(day.maxt)} °C / {Math.round(day.mint)} °C
									</div>
									<div className='forecast-wind'>
										Wind: {getCardinalDirection(day.wdir)}, {day.wspd} m/s
									</div>
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

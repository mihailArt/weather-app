import Carousel from '../Carousel/Carousel'
import getCardinalDirection from '../../helpers/directionHelper'
import getDate from '../../helpers/dateHelper'
import './Forecast.css'

const Forecast = ({ values }: any) => {
	return (
		values.length && (
			<div className='forecast'>
				<Carousel>
					{values.map((day: any, i: number) => {
						return (
							<div key={i} className='forecast-day-card'>
								<div className='forecast-day'>
									<div className='forecast-day-header'>
										<div className='forecast-date'>{getDate(day.datetime)}</div>
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

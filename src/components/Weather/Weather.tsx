import getDate from '../../helpers/dateHelper'
import './Weather.css'

interface IWeather {
	date: number
	description: string
	temp: number
	feels_like: number
	pressure: number
	wind: string
}

const Weather = ({
	date,
	description,
	temp,
	feels_like,
	pressure,
	wind,
}: IWeather) => {
	return (
		<div className='weather-today'>
			<div className='weather-today-header'>
				<div className='weather-date'>
					{/* {date.toLocaleDateString('en-us', options)} */}
					{getDate(date)}
				</div>
				<div className='weather-description'>{`${description[0].toUpperCase()}${description.slice(
					1
				)}`}</div>
			</div>
			<div className='weather-temp'>{Math.round(temp)} °C</div>
			<div className='weather-today-optional'>
				<div className='weather-feels-like'>
					Feels like {Math.round(feels_like)} °C
				</div>
				<div className='weather-pressure'>
					Pressure: {Math.round(pressure * 0.75)} mm Hg
				</div>
				<div className='weather-wind'>{wind}</div>
			</div>
		</div>
	)
}

export default Weather

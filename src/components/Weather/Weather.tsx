import './Weather.css'

interface IWeather {
	date: Date
	description: string
	temp: number
	feels_like: number
	pressure: number
	wind: string
}

const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
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
				<div>{date.toLocaleDateString('en-us', options)}</div>
				<div>{`${description[0].toUpperCase()}${description.slice(1)}`}</div>
			</div>
			<div>{Math.round(temp)} °C</div>
			<div className='weather-today-optional'>
				<div>Feels like {Math.round(feels_like)} °C</div>
				<div>Pressure: {Math.round(pressure * 0.75)} mm Hg</div>
				<div>{wind}</div>
			</div>
		</div>
	)
}

export default Weather

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
		<div>
			Weather
			<div>Date: {date.toLocaleDateString('ru', options)}</div>
			<div>Description: {description}</div>
			<div>Temperature: {temp}</div>
			<div>Feels like: {feels_like}</div>
			<div>Pressure: {pressure}</div>
			<div>Wind: {wind}</div>
		</div>
	)
}

export default Weather

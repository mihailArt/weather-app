import { useEffect, useState } from 'react'
import './App.css'
import Location from './components/Location/Location'
import Weather from './components/Weather/Weather'
import Forecast from './components/Forecast/Forecast'

function App() {
	const [lat, setLat] = useState<number>(0)
	const [long, setLong] = useState<number>(0)
	const [data, setData] = useState<any>(null)
	const [forecast, setForecast] = useState<any>()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLat(position.coords.latitude)
			setLong(position.coords.longitude)
		})

		const fetchData = async () => {
			await fetch(
				`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}&lang=ru`
			)
				.then(res => res.json())
				.then(result => {
					setData(result)
					// console.log(result)
				})

			await fetch(
				`${process.env.REACT_APP_API_URL_FORECAST}/forecast?locations=${lat},${long}&aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY_FORECAST}`
			)
				.then(res => res.json())
				.then(result => {
					setForecast(Object.values(result.locations)[0])
					console.log(result)
				})
		}

		if (lat !== 0 || long !== 0) fetchData()
	}, [lat, long])

	if (!data) return <>"Loading..."</>

	return (
		<div className='app'>
			<div className='daily-info'>
				<Weather
					date={new Date(data.dt * 1000)}
					description={data.weather[0].description}
					temp={data.main.temp}
					feels_like={data.main.feels_like}
					pressure={data.main.pressure}
					wind={data.wind.deg + ' ' + data.wind.speed}
				/>
				<Location
					country={data.sys.country || null}
					city={data.name}
					time={new Date(data.dt * 1000)}
					lat={lat}
					long={long}
				/>
			</div>

			<Forecast {...forecast} />
		</div>
	)
}

export default App

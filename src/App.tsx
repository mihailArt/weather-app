import { useEffect, useState } from 'react'
import './App.css'
import Location from './components/Location/Location'
import Weather from './components/Weather/Weather'

function App() {
	const [lat, setLat] = useState<number>(0)
	const [long, setLong] = useState<number>(0)
	const [data, setData] = useState<any>(null)

	useEffect(() => {
		const fetchData = async () => {
			navigator.geolocation.getCurrentPosition(position => {
				setLat(position.coords.latitude)
				setLong(position.coords.longitude)
			})

			await fetch(
				`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}&lang=ru`
			)
				.then(res => res.json())
				.then(result => {
					setData(result)
					console.log(result)
				})
		}

		fetchData()
	}, [lat, long])

	console.log(data)

	if (!data) return <>"Loading..."</>

	return (
		<div className='app'>
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
	)
}

export default App

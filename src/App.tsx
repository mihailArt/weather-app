import { useEffect, useState } from 'react'
import './App.css'
import Location from './components/Location/Location'
import Weather from './components/Weather/Weather'
import Forecast from './components/Forecast/Forecast'
import SearchPlace from './components/SearchPlace/SearchPlace'

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

const fetchPlace = async (text: any) => {
	try {
		const res = await fetch(
			`${process.env.REACT_APP_API_URL_PLACES}/${text}.json?access_token=${process.env.REACT_APP_API_KEY_PLACES}&cachebuster=1625641871908&autocomplete=true&types=place`
		)
		if (!res.ok) throw new Error(res.statusText)
		return res.json()
	} catch (err) {
		return { error: 'Unable to retrieve places' }
	}
}

function App() {
	const [lat, setLat] = useState<number>(0)
	const [long, setLong] = useState<number>(0)
	const [data, setData] = useState<any>(null)
	const [forecast, setForecast] = useState<any>()

	const [city, setCity] = useState('')
	const [autocompleteCities, setAutocompleteCities] = useState<any>([])
	const [autocompleteErr, setAutocompleteErr] = useState('')

	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLat(position.coords.latitude)
			setLong(position.coords.longitude)
		})
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
			)
				.then(res => res.json())
				.then(result => {
					setData(result)
				})

			await fetch(
				`${process.env.REACT_APP_API_URL_FORECAST}/forecast?locations=${lat},${long}&aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&forecastDays=7&key=${process.env.REACT_APP_API_KEY_FORECAST}`
			)
				.then(res => res.json())
				.then(result => {
					setForecast(Object.values(result.locations)[0])
				})
		}

		if (lat !== 0 || long !== 0) fetchData()
	}, [lat, long])

	if (!data) return <>"Loading..."</>

	const handleOnClick = async () => {
		if (city !== '') {
			const cityData = await fetchPlace(city)
			setLong(cityData.features[0].center[0])
			setLat(cityData.features[0].center[1])
		}
	}

	const handleCityChange = async (e: any) => {
		setCity(e.target.value)
		if (!city) return

		const res = await fetchPlace(city)
		!autocompleteCities.includes(e.target.value) &&
			res.features &&
			setAutocompleteCities(res.features.map((place: any) => place.place_name))
		res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('')
	}

	return (
		<div className='app'>
			<div className='daily-info'>
				<Weather
					date={new Date(data.dt * 1000)}
					description={data.weather[0].description}
					temp={data.main.temp}
					feels_like={data.main.feels_like}
					pressure={data.main.pressure}
					wind={
						'Wind: ' +
						getCardinalDirection(data.wind.deg) +
						', ' +
						Math.round(data.wind.speed) +
						' m/s'
					}
				/>

				<SearchPlace
					isOpen={open}
					onClose={handleClose}
					autocompleteErr={autocompleteErr}
					handleCityChange={handleCityChange}
					city={city}
					autocompleteCities={autocompleteCities}
					handleOnClick={handleOnClick}
				/>

				<Location
					country={data.sys.country || null}
					city={data.name}
					time={new Date(data.dt * 1000)}
					lat={lat}
					long={long}
					handleOpen={handleOpen}
				/>
			</div>

			<Forecast {...forecast} />
		</div>
	)
}

export default App

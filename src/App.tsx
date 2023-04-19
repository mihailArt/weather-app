import { useEffect, useState } from 'react'
import './App.css'
import Location from './components/Location/Location'
import Weather from './components/Weather/Weather'
import Forecast from './components/Forecast/Forecast'

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

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setLat(position.coords.latitude)
			setLong(position.coords.longitude)
		})
	}, [])

	useEffect(() => {
		const fetchData = async () => {
			await fetch(
				`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}&lang=ru`
			)
				.then(res => res.json())
				.then(result => {
					setData(result)
				})

			await fetch(
				`${process.env.REACT_APP_API_URL_FORECAST}/forecast?locations=${lat},${long}&aggregateHours=24&unitGroup=metric&shortColumnNames=false&contentType=json&key=${process.env.REACT_APP_API_KEY_FORECAST}`
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
			console.log(lat + ' ' + long)
			setLong(cityData.features[0].center[0])
			setLat(cityData.features[0].center[1])
			console.log(lat + ' ' + long)
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
					wind={data.wind.deg + ' ' + data.wind.speed}
				/>

				<div>
					<div className='placesAutocomplete'>
						<div className='placesAutocomplete__inputWrap'>
							<label htmlFor='city' className='label'>
								Your city
								{autocompleteErr && (
									<span className='inputError'>{autocompleteErr}</span>
								)}
							</label>
							<input
								list='places'
								type='text'
								id='city'
								name='city'
								onChange={handleCityChange}
								value={city}
								required
								pattern={autocompleteCities.join('|')}
								autoComplete='off'
							/>
							<datalist id='places'>
								{autocompleteCities.map((city: any, i: any) => (
									<option key={i}>{city}</option>
								))}
							</datalist>
							<button onClick={handleOnClick}>Submit</button>
						</div>
					</div>
				</div>

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

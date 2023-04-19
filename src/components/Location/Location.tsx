import './Location.css'

interface ILocation {
	country?: string
	city: string
	time: Date
	lat: number
	long: number
}

const Location = ({ country, city, time, lat, long }: ILocation) => {
	return (
		<div className='location'>
			Location
			<div>Country: {country}</div>
			<div>City: {city}</div>
			<div>Time: {time.toLocaleTimeString()}</div>
			<div>Latitude: {lat}</div>
			<div>Longitude: {long}</div>
		</div>
	)
}

export default Location

import './Location.css'

interface ILocation {
	handleOpen: any
	country?: string
	city: string
	time: Date
	lat: number
	long: number
}

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const Location = ({
	handleOpen,
	country,
	city,
	time,
	lat,
	long,
}: ILocation) => {
	return (
		<div className='location'>
			<div className='location-country'>{regionNames.of(country || '')}</div>
			<div className='location-city'>{city}</div>
			<div className='location-coords'>
				{Number(lat).toFixed(6)}, {Number(long).toFixed(6)}
			</div>
			<div className='location-time'>{time.toLocaleTimeString()}</div>
			<button className='change-city-btn' onClick={handleOpen}>
				Change
			</button>
		</div>
	)
}

export default Location

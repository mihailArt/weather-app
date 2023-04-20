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
			<div>{regionNames.of(country || '')}</div>
			<div>{city}</div>
			<div>{time.toLocaleTimeString()}</div>
			<div>
				{lat}, {long}
			</div>
			<button className='change-city-btn' onClick={handleOpen}>
				Change city
			</button>
		</div>
	)
}

export default Location

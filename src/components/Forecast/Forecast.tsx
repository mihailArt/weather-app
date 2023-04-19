import './Forecast.css'

const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
}

const Forecast = (props: any) => {
	return (
		props &&
		props.values && (
			<div className='forecast'>
				Forecast
				{props.values.map((day: any, i: any) => {
					return (
						<div key={i} className='forecast-day'>
							<div>
								Date: {new Date(day.datetime).toLocaleDateString('ru', options)}
							</div>
							<div>Conditions: {day.conditions}</div>
							<div>Temp day: {day.maxt}</div>
							<div>Temp night: {day.mint}</div>
							<div>
								Wind: {day.wdir}, {day.wspd}
							</div>
						</div>
					)
				})}
			</div>
		)
	)
}

export default Forecast

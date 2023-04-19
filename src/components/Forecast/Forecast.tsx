import './Forecast.css'

const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
}

const Forecast = (props: any) => {
	return (
		<div className='forecast'>
			Forecast
			{props.values.map((day: any) => {
				return (
					<>
						<div>
							Date: {new Date(day.datetime).toLocaleDateString('ru', options)}
						</div>
						<div>Conditions: {day.conditions}</div>
						<div>Temp day: {day.maxt}</div>
						<div>Temp night: {day.mint}</div>
						<div>
							WSind: {day.wdir}, {day.wspd}
						</div>
					</>
				)
			})}
		</div>
	)
}

export default Forecast

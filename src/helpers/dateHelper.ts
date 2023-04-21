const options: Intl.DateTimeFormatOptions = {
	weekday: 'long',
	month: 'long',
	day: 'numeric',
}

function getDate(dt: number) {
	return new Date(dt).toLocaleDateString('en-us', options)
}

export default getDate

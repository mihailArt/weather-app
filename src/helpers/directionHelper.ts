function getCardinalDirection(angle: number) {
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

export default getCardinalDirection

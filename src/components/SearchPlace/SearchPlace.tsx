import ReactDOM from 'react-dom'

const SearchPlace = ({
	isOpen,
	onClose,
	autocompleteErr,
	handleCityChange,
	city,
	autocompleteCities,
	handleOnClick,
}: any) => {
	return ReactDOM.createPortal(
		isOpen && (
			<div className='modal-root'>
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
						<button
							onClick={() => {
								handleOnClick()
								onClose()
							}}
						>
							Submit
						</button>
						<button onClick={() => onClose()}>close</button>
					</div>
				</div>
			</div>
		),
		document.getElementById('portal-root')!
	)
}

export default SearchPlace

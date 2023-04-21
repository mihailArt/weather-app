import ReactDOM from 'react-dom'
import './SearchPlace.css'

const SearchPlace = ({
	isOpen,
	onClose,
	handleCityChange,
	city,
	autocompleteCities,
	handleOnClick,
}: any) => {
	return ReactDOM.createPortal(
		isOpen && (
			<div className='modal-root'>
				<div className='form-container'>
					<div className='form-inputs'>
						<input
							className='change-city-input'
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
							{autocompleteCities.map((city: string, i: number) => (
								<option key={i}>{city}</option>
							))}
						</datalist>
						<button
							className='submit-city-btn'
							onClick={() => {
								handleOnClick()
								onClose()
							}}
						>
							Submit
						</button>
						<button className='close-btn' onClick={() => onClose()}>
							Close
						</button>
					</div>
				</div>
			</div>
		),
		document.getElementById('portal-root')!
	)
}

export default SearchPlace

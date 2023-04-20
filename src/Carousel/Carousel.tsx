import { useEffect, useState, Children, cloneElement } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import './Carousel.css'

const PAGE_WIDTH = 225
const COUNT_OF_PAGES = 5

const Carousel = ({ children }: any) => {
	const [pages, setPages] = useState([])
	const [offset, setOffset] = useState(0)

	const handleLeftArrowClick = () => {
		setOffset(currentOffset => {
			const newOffset = currentOffset + PAGE_WIDTH
			return Math.min(newOffset, 0)
		})
	}
	const handleRightArrowClick = () => {
		setOffset(currentOffset => {
			const newOffset = currentOffset - PAGE_WIDTH
			const maxOffset = -(PAGE_WIDTH * (pages.length - 1 - COUNT_OF_PAGES))
			return Math.max(newOffset, maxOffset)
		})
	}

	useEffect(() => {
		setPages(
			Children.map(children, child => {
				return cloneElement(child, {
					style: {
						minWidth: `${PAGE_WIDTH}px`,
						maxWidth: `${PAGE_WIDTH}px`,
						height: '100%',
					},
				})
			})
		)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='carousel'>
			<FaChevronLeft className='arrow' onClick={handleLeftArrowClick} />
			<div className='main-container'>
				<div className='window'>
					<div
						className='all-pages-container'
						style={{
							transform: `translateX(${offset}px)`,
						}}
					>
						{pages}
					</div>
				</div>
			</div>
			<FaChevronRight className='arrow' onClick={handleRightArrowClick} />
		</div>
	)
}

export default Carousel

import React from 'react'
import { useQualities } from '../../hooks/useQualities'
import { Loading } from '../common/Loading'
import PropTypes from 'prop-types'
export function Qualities({ userQualities, backgroundColor = 'light' }) {
	const { isLoading, getQualities } = useQualities()

	return (
		<>
			{!isLoading ? (
				<div className='d-flex flex-wrap gap-2'>
					{getQualities(userQualities).map((quality) => {
						return (
							<span
								className={
									backgroundColor === 'dark'
										? 'badge border border-2 text-light' + ' border-' + quality.color
										: 'badge text-light' + ' bg-' + quality.color
								}
								key={quality._id}>
								{quality.name}
							</span>
						)
					})}
				</div>
			) : (
				<Loading />
			)}
		</>
	)
}

Qualities.propTypes = {
	userQualities: PropTypes.array.isRequired,
	backgroundColor: PropTypes.string
}

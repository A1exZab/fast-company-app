import React, { useEffect } from 'react'
import { Loading } from '../common/Loading'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
	getQualitiesByIds,
	getQualitiesLoadingStatus,
	loadQualitiesList
} from '../../store/qualities'
export function Qualities({ userQualities, backgroundColor = 'light' }) {
	const qualitiesList = useSelector(getQualitiesByIds(userQualities))
	const isLoading = useSelector(getQualitiesLoadingStatus())
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadQualitiesList())
	}, [])

	return (
		<>
			{!isLoading ? (
				<div className='d-flex flex-wrap gap-2'>
					{qualitiesList.map((quality) => {
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

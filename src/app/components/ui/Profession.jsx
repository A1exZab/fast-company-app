import React, { useEffect } from 'react'
import { Loading } from '../common/Loading'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
	getProfession,
	getProfessionsLoadingStatus,
	loadProfessionsList
} from '../../store/professions'

export function Profession({ id }) {
	const profession = useSelector(getProfession(id))
	const professionsLoadingStatus = useSelector(getProfessionsLoadingStatus())
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadProfessionsList())
	}, [])

	return (
		<>
			{!professionsLoadingStatus ? (
				<p className='text-secondary mb-1'>{profession.name}</p>
			) : (
				<Loading />
			)}
		</>
	)
}

Profession.propTypes = {
	id: PropTypes.string
}

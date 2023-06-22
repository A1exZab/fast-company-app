import React from 'react'
import { useProfessions } from '../../hooks/useProfession'
import { Loading } from '../common/Loading'
import PropTypes from 'prop-types'

export function Profession({ id }) {
	const { isLoading, getProfession } = useProfessions()
	const profession = getProfession(id)
	return <>{!isLoading ? <p className='text-secondary mb-1'>{profession.name}</p> : <Loading />}</>
}

Profession.propTypes = {
	id: PropTypes.string
}

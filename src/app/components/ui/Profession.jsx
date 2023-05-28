import React from 'react'
import { useProfessions } from '../../hooks/useProfession'
import { Loading } from '../common/Loading'
import PropTypes from 'prop-types'

export function Profession({ id }) {
	const { isLoading, getProfession } = useProfessions()
	const prof = getProfession(id)
	return <>{!isLoading ? <p>{prof.name}</p> : <Loading />}</>
}

Profession.propTypes = {
	id: PropTypes.string
}

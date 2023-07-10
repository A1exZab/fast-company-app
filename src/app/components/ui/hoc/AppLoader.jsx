import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
	getDataStatus,
	getIsLoggedIn,
	getUsersLoadingStatus,
	loadUsersList
} from '../../../store/users'
import { Loading } from '../../common/Loading'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

export function AppLoader({ children }) {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(getIsLoggedIn())
	const usersStatusLoading = useSelector(getUsersLoadingStatus())
	useEffect(() => {
		dispatch(loadQualitiesList())
		dispatch(loadProfessionsList())
		if (isLoggedIn) {
			dispatch(loadUsersList())
		}
	}, [isLoggedIn])
	if (usersStatusLoading) return <Loading />
	return children
}

AppLoader.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

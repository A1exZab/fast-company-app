import React, { useEffect } from 'react'
import { Loading } from '../components/common/Loading'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

export function Logout() {
	const dispatch = useDispatch()
	useEffect(() => dispatch(logOut()), [])
	return <Loading />
}

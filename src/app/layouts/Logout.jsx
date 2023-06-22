import React, { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '../components/common/Loading'

export function Logout() {
	const { logOut } = useAuth()
	useEffect(() => logOut(), [])
	return <Loading />
}

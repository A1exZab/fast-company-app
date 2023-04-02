import React from 'react'
import { useParams } from 'react-router-dom'
import { UserPage, UsersList } from '../components'

export function Users() {
	const params = useParams()
	const { userId } = params
	return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>
}

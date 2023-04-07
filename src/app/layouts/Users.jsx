import React from 'react'
import { useParams } from 'react-router-dom'

import { UserPage } from '../components/Page/UserPage'
import { UsersListPage } from '../components/Page/UsersListPage'

export function Users() {
	const params = useParams()
	const { userId } = params
	return <>{userId ? <UserPage userId={userId} /> : <UsersListPage />}</>
}

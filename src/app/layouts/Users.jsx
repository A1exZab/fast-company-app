import React from 'react'
import { useParams } from 'react-router-dom'

import { UserPage } from '../components/Page/UserPage'
import { UsersListPage } from '../components/Page/UsersListPage'
import { EditUserPage } from '../components/Page/EditUserPage'
import { UserProvider } from '../hooks/useUsers'

export function Users() {
	const params = useParams()
	const { userId, edit } = params
	return (
		<>
			<UserProvider>
				{userId ? (
					edit ? (
						<EditUserPage userId={userId} />
					) : (
						<UserPage userId={userId} />
					)
				) : (
					<UsersListPage />
				)}
			</UserProvider>
		</>
	)
}

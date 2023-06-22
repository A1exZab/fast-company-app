import React from 'react'
import { useParams } from 'react-router-dom'

import { UserPage } from '../components/Page/UserPage'
import { UsersListPage } from '../components/Page/UsersListPage'
import { EditUserPage } from '../components/Page/EditUserPage'
import { UserProvider } from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'
import { Redirect } from 'react-router-dom'

export function Users() {
	const params = useParams()
	const { userId, edit } = params
	const { currentUser } = useAuth()
	return (
		<>
			<UserProvider>
				{userId ? (
					edit ? (
						userId === currentUser._id ? (
							<EditUserPage />
						) : (
							<Redirect to={`/users/${currentUser._id}/edit`} />
						)
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

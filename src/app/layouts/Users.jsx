import React from 'react'
import { useParams } from 'react-router-dom'

import { UserPage } from '../components/Page/UserPage'
import { UsersListPage } from '../components/Page/UsersListPage'
import { EditUserPage } from '../components/Page/EditUserPage'
import { UsersLoader } from '../components/ui/hoc/usersLoader'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

export function Users() {
	const params = useParams()
	const { userId, edit } = params
	const currentUserId = useSelector(getCurrentUserId())

	return (
		<>
			<UsersLoader>
				{userId ? (
					edit ? (
						userId === currentUserId ? (
							<EditUserPage />
						) : (
							<Redirect to={`/users/${currentUserId}/edit`} />
						)
					) : (
						<UserPage userId={userId} />
					)
				) : (
					<UsersListPage />
				)}
			</UsersLoader>
		</>
	)
}

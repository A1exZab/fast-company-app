import React from 'react'
import { User } from '../components'

export function Users({ users, onClickBookmark, onClickDeleteButton }) {
	return (
		<>
			{users.map((user) => {
				return (
					<User
						key={user._id}
						onClickBookmark={onClickBookmark}
						onClickDeleteButton={onClickDeleteButton}
						{...user}
					/>
				)
			})}
		</>
	)
}

import React from 'react'
import { UserCard } from '../../ui/UserCard'
import { QualitiesCard } from '../../ui/QualitiesCard'
import { MeetingsCard } from '../../ui/MeetingsCard'
import { Comments } from '../../ui/Comments'

import PropTypes from 'prop-types'

import { Loading } from '../../common/Loading'
import { useSelector } from 'react-redux'
import { getUserById } from '../../../store/users'
export function UserPage({ userId }) {
	const user = useSelector(getUserById(userId))

	return (
		<>
			{user ? (
				<div className='container mt-4 mb-4'>
					<div className='row gutters-sm'>
						<div className='col-md-4 mb-3'>
							<UserCard user={user} />
							<QualitiesCard qualities={user.qualities} />
							<MeetingsCard value={user.completedMeetings} />
						</div>
						<div className='col-md-8'>
							<Comments />
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	)
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

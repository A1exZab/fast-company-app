import React from 'react'
import { UserCard } from '../../ui/UserCard'
import { QualitiesCard } from '../../ui/QualitiesCard'
import { MeetingsCard } from '../../ui/MeetingsCard'
import { Comments } from '../../ui/Comments'

import PropTypes from 'prop-types'

import { Loading } from '../../common/Loading'
import { CommentsProvider } from '../../../hooks/useComments'
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
							<CommentsProvider>
								<Comments />
							</CommentsProvider>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	)

	{
		/* (<>
		 	{user ? (
				<div className='d-flex flex-column gap-3 p-3'>
					<div className='fs-1 fw-bold'>{user.name}</div>
					<div className='fs-4 fw-semibold'>Профессия: {user.profession.name}</div>
					<div className='d-flex gap-2'>
						<span>Качества:</span>
						<Qualities qualities={user.qualities} />
					</div>
					<div>Количество встреч: {user.completedMeetings}</div>
					<div>
						Оценка: <span className='fw-semibold'>{user.rate}/5</span>
					</div>
					<button
						className='btn btn-primary'
						style={{ width: '200px' }}
						onClick={() => history.push('/users')}>
						Все пользователи
					</button>
					<button
						className='btn btn-danger'
						style={{ width: '200px' }}
						onClick={() => history.push(`/users/${userId}/edit`)}>
						Редактировать
					</button>
				</div>
			) : (
				<div>
					<Loading />
				</div>
			)}
		</>
	) */
	}
}

UserPage.propTypes = {
	userId: PropTypes.string.isRequired
}

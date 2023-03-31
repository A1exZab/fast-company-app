import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import API from '../API'

import { Qualities, Loading } from '../components'

export function User() {
	const [user, setUser] = useState()

	const { userId } = useParams()
	const history = useHistory()

	useEffect(() => {
		API.users.getById(userId).then((data) => setUser(data))
	}, [])

	return (
		<>
			{user ? (
				<div className='w-50 d-flex flex-column gap-3 p-3'>
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
					<Button style={{ width: '200px' }} onClick={() => history.push('/users')}>
						Все пользователи
					</Button>
				</div>
			) : (
				<div>
					<Loading />
				</div>
			)}
		</>
	)
}

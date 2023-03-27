import React from 'react'
import Table from 'react-bootstrap/Table'

import { Users } from '../components'
import { SearchStatus } from '../components'

import PropTypes from 'prop-types'

export function UsersTable({ users, usersAmount, onClickBookmark, onClickDeleteButton }) {
	return (
		<div className='d-flex gap-3 flex-grow-1 flex-column  '>
			<SearchStatus usersAmount={usersAmount} />
			<Table variant='dark'>
				<thead>
					<tr>
						<th>Имя</th>
						<th>Качества</th>
						<th>Профессия</th>
						<th className='text-center'>Встретился, раз</th>
						<th className='text-center'>Оценка</th>
						<th className='text-center'>Избранное</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<Users
						users={users}
						onClickBookmark={onClickBookmark}
						onClickDeleteButton={onClickDeleteButton}
					/>
				</tbody>
			</Table>
		</div>
	)
}

UsersTable.propTypes = {
	users: PropTypes.array.isRequired
}

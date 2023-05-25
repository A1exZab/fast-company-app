import React from 'react'

import { Bookmark } from '../common/Bookmark'
import { Qualities } from './Qualities'
import { Link } from 'react-router-dom'
import { Table } from '../common/Table'

import PropTypes from 'prop-types'

export function UsersTable({ users, onClickBookmark, onClickDeleteButton, selectedSort, onSort }) {
	const columns = {
		name: {
			path: 'name',
			name: 'Имя',
			component: (user) => (
				<Link className='text-decoration-none' to={`/users/${user._id}`}>
					{user.name}
				</Link>
			)
		},
		qualities: {
			name: 'Качества',
			component: (user) => <Qualities qualities={user.qualities} backgroundColor='dark' />
		},
		professions: { path: 'profession.name', name: 'Профессия' },
		completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
		rate: { path: 'rate', name: 'Оценка' },
		bookmark: {
			path: 'bookmark',
			name: 'Избранное',
			component: (user) => (
				<Bookmark status={user.bookmark} id={user._id} onClickBookmark={onClickBookmark} />
			)
		},
		delete: {
			component: (user) => (
				<button className='btn btn-danger' onClick={() => onClickDeleteButton(user._id)}>
					Удалить
				</button>
			)
		}
	}

	return (
		<Table
			color={'table-dark'}
			onSort={onSort}
			selectedSort={selectedSort}
			columns={columns}
			data={users}
		/>
	)
}

UsersTable.propTypes = {
	users: PropTypes.array.isRequired,
	onSort: PropTypes.func,
	selectedSort: PropTypes.object.isRequired,
	onClickDeleteButton: PropTypes.func.isRequired
}

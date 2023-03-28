import { useState, useEffect } from 'react'

import { UsersTable } from '.'
import { UsersPagination } from '.'
import { GroupList } from '.'
import { SearchStatus } from '.'

import Button from 'react-bootstrap/Button'
import _ from 'lodash'

import { paginate } from '../utils/paginate'
import { dataConvert } from '../utils/dataConvert'

import API from '../API'

export function Users() {
	const [users, setUsers] = useState()

	useEffect(() => {
		API.users.fetchAll().then((data) => setUsers(dataConvert(data)))
	}, [])

	const [professions, setProfessions] = useState()

	useEffect(() => {
		API.professions.fetchAll().then((data) => setProfessions(dataConvert(data)))
	}, [])

	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

	const pageSize = 8

	const filteredUsers = selectedProf
		? users.filter((user) => user.profession._id === selectedProf._id)
		: users

	const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

	const userCrop = filteredUsers && paginate(sortedUsers, currentPage, pageSize)

	const handleDeleteButton = (id) => {
		setUsers(users.filter((user) => user._id !== id))
	}

	const handleBookmark = (id) => {
		const updateUsers = users.map((user) => {
			return user._id === id ? { ...user, bookmark: !user.bookmark } : user
		})
		setUsers(updateUsers)
	}

	const handlePageChange = (pageIndex) => {
		setCurrentPage(pageIndex)
	}

	const handleProfessionSelect = (item) => {
		setSelectedProf(item)
	}

	const clearFilter = () => {
		setSelectedProf(undefined)
	}

	const handleSort = (item) => {
		setSortBy(item)
	}

	return (
		<div className='wrapper bg-dark'>
			{users ? (
				<>
					<div className='d-flex m-3 gap-3 flex-grow-1 align-items-start'>
						{professions && (
							<div className='d-flex flex-column gap-2'>
								<GroupList
									items={professions}
									selectedItem={selectedProf}
									onItemSelect={handleProfessionSelect}
								/>
								<Button variant='secondary' onClick={() => clearFilter()}>
									Очистить
								</Button>
							</div>
						)}
						<div className='d-flex gap-3 flex-grow-1 flex-column'>
							<SearchStatus usersAmount={filteredUsers.length} />
							<UsersTable
								users={userCrop}
								onClickBookmark={handleBookmark}
								onClickDeleteButton={handleDeleteButton}
								onSort={handleSort}
								selectedSort={sortBy}
							/>
						</div>
					</div>

					<UsersPagination
						itemsAmount={filteredUsers.length}
						pageSize={pageSize}
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</>
			) : (
				<div className='d-flex flex-grow-1'></div>
			)}
		</div>
	)
}

import { useState, useEffect } from 'react'

import { UsersTable } from '.'
import { UsersPagination } from '.'
import { GroupList } from '.'

import Button from 'react-bootstrap/Button'

import { paginate } from '../utils/paginate'
import { dataConvert } from '../utils/dataConvert'

import API from '../API'

function App() {
	const [users, setUsers] = useState()
	const [professions, setProfessions] = useState()

	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()

	const pageSize = 4

	const filteredUsers = selectedProf
		? users.filter((user) => user.profession.name === selectedProf.name)
		: users

	const userCrop = filteredUsers && paginate(filteredUsers, currentPage, pageSize)

	useEffect(() => {
		API.users.fetchAll().then((data) => setUsers(dataConvert(data)))
	}, [])

	useEffect(() => {
		API.professions.fetchAll().then((data) => setProfessions(dataConvert(data)))
	}, [])

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf])

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

						<UsersTable
							users={userCrop}
							usersAmount={filteredUsers.length}
							onClickBookmark={handleBookmark}
							onClickDeleteButton={handleDeleteButton}
						/>
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

export default App

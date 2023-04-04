import { useState, useEffect } from 'react'

import { UsersTable } from '.'
import { UsersPagination } from '.'
import { GroupList } from '.'
import { SearchStatus } from '.'
import { Loading } from '.'

import _ from 'lodash'

import { paginate } from '../utils/paginate'
import { dataConvert } from '../utils/dataConvert'

import API from '../API'

export function UsersList() {
	const [users, setUsers] = useState()
	const [select, setSelect] = useState()
	const [inputValue, setInputValue] = useState('')

	const handleInputChange = (e) => {
		const { value } = e.target
		if (selectedProf) {
			setSelectedProf(undefined)
		}
		setSelect('search')
		setInputValue(value)
	}

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

	const searchedUsers = inputValue
		? users.filter((user) => user.name.toLowerCase().includes(inputValue.toLowerCase()))
		: users

	const selectedUsers = () => {
		if (users) {
			switch (select) {
				case 'profession':
					return filteredUsers
				case 'search':
					return searchedUsers
				default:
					return users
			}
		}
	}

	const usersToShow = selectedUsers()

	const sortedUsers = _.orderBy(usersToShow, [sortBy.path], [sortBy.order])

	const userCrop = usersToShow && paginate(sortedUsers, currentPage, pageSize)

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
		if (inputValue) {
			setInputValue('')
		}
		setSelect('profession')
		setSelectedProf(item)
	}

	const clearFilter = () => {
		setSelectedProf(undefined)
	}

	const handleSort = (item) => {
		setSortBy(item)
	}

	return users ? (
		<div className='d-flex h-100 flex-column '>
			<div className='d-flex m-3 gap-3 flex-grow-1 '>
				{professions && (
					<div className='d-flex flex-column gap-2'>
						<GroupList
							items={professions}
							selectedItem={selectedProf}
							onItemSelect={handleProfessionSelect}
						/>
						<button className='btn btn-secondary' onClick={() => clearFilter()}>
							Очистить
						</button>
					</div>
				)}
				<div className='d-flex w-100 gap-3 flex-grow-1 flex-column'>
					<SearchStatus usersAmount={usersToShow.length} />
					<div className='container-fluid'>
						<div className='row justify-content-start'>
							<div className='col-md-6 p-0'>
								<input
									className='form-control'
									type='text'
									placeholder='Поиск...'
									value={inputValue}
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

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
				itemsAmount={usersToShow.length}
				pageSize={pageSize}
				currentPage={currentPage}
				onPageChange={handlePageChange}
			/>
		</div>
	) : (
		<Loading />
	)
}

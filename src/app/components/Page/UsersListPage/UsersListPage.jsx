import { useState, useEffect } from 'react'

import { Pagination } from '../../common/Pagination'
import { GroupList } from '../../common/GroupList'
import { Loading } from '../../common/Loading'
import { UsersTable } from '../../ui/UsersTable'
import { SearchStatus } from '../../ui/SearchStatus'

import _ from 'lodash'

import { paginate } from '../../../utils/paginate'
import { dataConvert } from '../../../utils/dataConvert'

import API from '../../../API'

export function UsersListPage() {
	const [users, setUsers] = useState()
	const [searchInput, setSearchInput] = useState('')

	const handleInputChange = (e) => {
		const { value } = e.target
		setSelectedProf(undefined)
		setSearchInput(value)
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
	}, [selectedProf, searchInput])

	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

	const pageSize = 5

	const filteredUsers = searchInput
		? users.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
		: selectedProf
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
		if (searchInput !== '') setSearchInput('')
		setSelectedProf(item)
	}

	const clearFilter = () => {
		setSelectedProf(undefined)
	}

	const handleSort = (item) => {
		setSortBy(item)
	}

	return users ? (
		<div className='d-flex h-100 m-3 gap-3 '>
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

			<div className='d-flex w-100 flex-column justify-content-between'>
				<div className='d-flex flex-column gap-3'>
					<SearchStatus usersAmount={filteredUsers.length} />
					<div className='d-flex mb-3'>
						<input
							className='form-control'
							name='search'
							type='text'
							placeholder='Поиск...'
							value={searchInput}
							onChange={handleInputChange}
						/>
					</div>
					<UsersTable
						users={userCrop}
						onClickBookmark={handleBookmark}
						onClickDeleteButton={handleDeleteButton}
						onSort={handleSort}
						selectedSort={sortBy}
					/>
				</div>

				<Pagination
					itemsAmount={filteredUsers.length}
					pageSize={pageSize}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	) : (
		<Loading />
	)
}

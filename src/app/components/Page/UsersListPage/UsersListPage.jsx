import { useState, useEffect } from 'react'

import { Pagination } from '../../common/Pagination'
import { GroupList } from '../../common/GroupList'
import { Loading } from '../../common/Loading'
import { UsersTable } from '../../ui/UsersTable'
import { SearchStatus } from '../../ui/SearchStatus'

import _ from 'lodash'

import { paginate } from '../../../utils/paginate'

import { useSelector } from 'react-redux'
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions'
import { getCurrentUserId, getUsersList } from '../../../store/users'

export function UsersListPage() {
	const users = useSelector(getUsersList())
	const [searchInput, setSearchInput] = useState('')
	const currentUserId = useSelector(getCurrentUserId())

	const handleInputChange = (e) => {
		const { value } = e.target
		setSelectedProf(undefined)
		setSearchInput(value)
	}

	const professions = useSelector(getProfessions())
	const professionsLoadingStatus = useSelector(getProfessionsLoadingStatus())

	const [currentPage, setCurrentPage] = useState(1)
	const [selectedProf, setSelectedProf] = useState()

	useEffect(() => {
		setCurrentPage(1)
	}, [selectedProf, searchInput])

	const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

	const pageSize = 5

	function filterUsers(data) {
		const filteredUsers = searchInput
			? data.filter((user) => user.name.toLowerCase().includes(searchInput.toLowerCase()))
			: selectedProf
			? data.filter((user) => user.profession === selectedProf._id)
			: data

		return filteredUsers.filter((user) => user._id !== currentUserId._id)
	}

	const filteredUsers = filterUsers(users)

	const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order])

	const userCrop = filteredUsers && paginate(sortedUsers, currentPage, pageSize)

	const handleBookmark = (id) => {
		const updateUsers = users.map((user) => {
			return user._id === id ? { ...user, bookmark: !user.bookmark } : user
		})
		// setUsers(updateUsers)
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
			{!professionsLoadingStatus && (
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

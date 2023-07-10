import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getCurrentUserData } from '../../../store/users'
import { Loading } from '../../common/Loading'
import { useSelector } from 'react-redux'

export function NavProfile() {
	const currentUser = useSelector(getCurrentUserData())
	const [isOpen, setOpen] = useState(false)
	const toggleMenu = () => {
		setOpen((prev) => !prev)
	}
	if (!currentUser) {
		return <Loading />
	}
	return (
		<div className='dropdown' onClick={toggleMenu}>
			<div
				className='nav-link dropdown-toggle d-flex align-items-center'
				style={{
					'--bs-nav-link-hover-color': 'var(--bs-primary)',
					cursor: 'pointer',
					userSelect: 'none'
				}}>
				<div className='me-2'>{currentUser.name}</div>
				<img
					src={currentUser.image}
					alt='avatar'
					height='30'
					className='img-responsive rounded-circle'
				/>
			</div>

			<ul className={'w-100 dropdown-menu position-absolute' + (isOpen ? ' show' : '')}>
				<Link className='dropdown-item' to={`/users/${currentUser._id}`}>
					Профиль
				</Link>
				<Link className='dropdown-item' to='/logout'>
					Выйти
				</Link>
			</ul>
		</div>
	)
}

//https://getbootstrap.com/docs/5.2/components/dropdowns/#overview

import React from 'react'
// import { Link } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { NavItem } from './NavItem'
import { NavProfile } from './NavProfile'
export function NavBar() {
	const { currentUser } = useAuth()
	return (
		<nav className='navbar navbar-expand-lg bg-light fw-semibold px-3'>
			<ul className='navbar-nav flex-grow-1'>
				<NavItem heading='Главная' to='/' />
				{currentUser && <NavItem heading='Пользователи' to='/users' />}
			</ul>
			<div className='navbar-nav'>
				{currentUser ? <NavProfile /> : <NavItem heading='Авторизация' to='/login' />}
			</div>
		</nav>
	)
}

import React from 'react'
import { NavItem } from './NavItem'
import { NavProfile } from './NavProfile'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../../store/users'
export function NavBar() {
	const isLoggedIn = useSelector(getIsLoggedIn())
	return (
		<nav className='navbar navbar-expand-lg bg-light fw-semibold px-3'>
			<ul className='navbar-nav flex-grow-1'>
				<NavItem heading='Главная' to='/' />
				{isLoggedIn && <NavItem heading='Пользователи' to='/users' />}
			</ul>
			<div className='navbar-nav'>
				{isLoggedIn ? <NavProfile /> : <NavItem heading='Авторизация' to='/login' />}
			</div>
		</nav>
	)
}

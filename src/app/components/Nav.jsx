import React from 'react'
import { Link } from 'react-router-dom'

export function Nav() {
	return (
		<nav className='navbar navbar-expand-lg bg-light  fw-semibold'>
			<ul className='navbar-nav '>
				<li className='nav-item '>
					<Link className='nav-link ' to='/'>
						Главная
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link ' to='/login'>
						Авторизация
					</Link>
				</li>
				<li className='nav-item'>
					<Link className='nav-link ' to='/users'>
						Пользователи
					</Link>
				</li>
			</ul>
		</nav>
	)
}

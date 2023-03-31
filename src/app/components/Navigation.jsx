import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'

export function Navigation() {
	return (
		<Nav className='fw-semibold'>
			<Nav.Item>
				<Nav.Link as={Link} to='/'>
					Главная
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/login'>
					Авторизация
				</Nav.Link>
			</Nav.Item>
			<Nav.Item>
				<Nav.Link as={Link} to='/users'>
					Пользователи
				</Nav.Link>
			</Nav.Item>
		</Nav>
	)
}

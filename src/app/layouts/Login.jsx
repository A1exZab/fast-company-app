import React from 'react'
import { LoginForm } from '../components/ui/LoginForm'
import { RegisterForm } from '../components/ui/RegisterForm'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export function Login() {
	const { type } = useParams()
	const [formType, setFormType] = useState(type === 'register' ? type : 'login')
	const toggleFormType = () => {
		setFormType((prevState) => (prevState === 'register' ? 'login' : 'register'))
	}

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					{formType === 'register' ? (
						<>
							<h3 className='mb-4'>Регистрация</h3>
							<RegisterForm />
							<p className='text-white-50 mt-4 fs-6'>
								Уже зарегистрированы?{' '}
								<Link onClick={toggleFormType} className='text-decoration-none' to={`/login`}>
									Авторизация
								</Link>
								{/* <a className='text-decoration-underline' role='button' onClick={toggleFormType}>
									Авторизация
								</a> */}
							</p>
						</>
					) : (
						<>
							<h3 className='mb-4'>Авторизация</h3>
							<LoginForm />
							<p className='text-white-50 mt-4 fs-6'>
								Еще не зарегистрированы?{' '}
								<Link
									onClick={toggleFormType}
									className='text-decoration-none'
									to={`/login/register`}>
									Регистрация
								</Link>
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	)
}

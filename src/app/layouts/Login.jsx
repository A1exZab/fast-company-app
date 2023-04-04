import React from 'react'
import { useState, useEffect } from 'react'
import { TextField } from '../components'
import { validator } from '../utils/validator'

import Button from 'react-bootstrap/Button'

export function Login() {
	const [data, setData] = useState({ email: '', password: '' })
	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		const { name, value } = e.target
		setData((prevState) => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		console.log(data)
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Электронная почта обязательна для заполнения' },
			isEmail: { message: 'Проверьте корректность введенных данных' }
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения' },
			isCapitalSymbol: { message: 'Пароль должен содержать хотя бы одну заглавную букву' },
			isContainDigit: { message: 'Пароль должен содержать хотя бы одно число' },
			min: { message: 'Пароль должен состоять минимум из 8 символов', value: 8 }
		}
	}

	useEffect(() => {
		validate()
	}, [data])

	const validate = () => {
		const errors = validator(data, validatorConfig)

		setErrors(errors)

		return Object.keys(errors).length === 0
	}

	const isValid = Object.keys(errors).length === 0

	return (
		<div className='container mt-5'>
			<div className='row'>
				<div className='col-md-6 offset-md-3 shadow p-4'>
					<h3 className='mb-4'>Авторизация</h3>
					<form className='' onSubmit={handleSubmit}>
						<TextField
							label='Электронаня почта'
							name='email'
							value={data.email}
							onChange={handleChange}
							placeholder='Введите email'
							error={errors.email}
						/>
						<TextField
							label='Пароль'
							type='password'
							name='password'
							value={data.password}
							onChange={handleChange}
							placeholder='Введите пароль'
							error={errors.password}
						/>
						<Button className='w-100' disabled={!isValid}>
							Отправить
						</Button>
					</form>
				</div>
			</div>
		</div>
	)
}

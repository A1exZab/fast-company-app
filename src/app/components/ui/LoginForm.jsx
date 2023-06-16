import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/Form/TextField'
import { CheckBoxField } from '../common/Form/CheckBoxField'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

export function LoginForm() {
	const history = useHistory()
	const [data, setData] = useState({ email: '', password: '', stayOn: false })
	const [errors, setErrors] = useState({})
	const [enterError, setEnterError] = useState(null)

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
		setEnterError(null)
	}

	const { signIn } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return

		try {
			await signIn(data)
			history.push('/')
		} catch (error) {
			setEnterError(error.message)
		}
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Электронная почта обязательна для заполнения' }
		},
		password: {
			isRequired: { message: 'Пароль обязателен для заполнения' }
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

			<CheckBoxField value={data.stayOn} onChange={handleChange} name='stayOn'>
				Оставаться в системе
			</CheckBoxField>
			{enterError && <p className='text-danger'>{enterError}</p>}
			<button className='btn btn-primary w-100' disabled={!isValid || enterError}>
				Отправить
			</button>
		</form>
	)
}

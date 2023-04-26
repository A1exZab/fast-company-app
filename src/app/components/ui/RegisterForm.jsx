import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/Form/TextField'
import API from '../../API'
import { dataConvert } from '../../utils/dataConvert'
import { SelectField } from '../common/Form/SelectField'
import { RadioField } from '../common/Form/RadioField'
import { MultiSelectField } from '../common/Form/MultiSelectField'
import { CheckBoxField } from '../common/Form/CheckBoxField'

export function RegisterForm() {
	const [data, setData] = useState({
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		license: false
	})
	const [errors, setErrors] = useState({})
	const [professions, setProfessions] = useState()
	const [qualities, setQualities] = useState({})

	useEffect(() => {
		API.professions.fetchAll().then((data) => setProfessions(data))
		API.qualities.fetchAll().then((data) => setQualities(data))
	}, [])

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
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
		},
		profession: {
			isRequired: {
				message: 'Выберите вашу профессию'
			}
		},
		license: {
			isRequired: {
				message: 'Необходимо подтвердить лицензионное соглашение'
			}
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
			<SelectField
				name='profession'
				label='Выберите профессию'
				value={data.profession}
				onChange={handleChange}
				defaultOption='Выбрать...'
				options={professions && dataConvert(professions)}
				error={errors.profession}
			/>
			<RadioField
				label='Выберите ваш пол'
				options={[
					{ name: 'Мужской', value: 'male' },
					{ name: 'Женский', value: 'female' }
				]}
				value={data.sex}
				name='sex'
				onChange={handleChange}
			/>

			<MultiSelectField
				options={
					qualities &&
					dataConvert(qualities).map((quality) => ({ value: quality._id, label: quality.name }))
				}
				onChange={handleChange}
				name='qualities'
				label='Выберите ваши качества'
			/>

			<CheckBoxField
				value={data.license}
				onChange={handleChange}
				name='license'
				error={errors.license}>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>

			<button className='btn btn-primary w-100' disabled={!isValid}>
				Отправить
			</button>
		</form>
	)
}

import React, { useState, useEffect } from 'react'
import { validator } from '../../utils/validator'
import { TextField } from '../common/Form/TextField'
import { dataConvert } from '../../utils/dataConvert'
import { SelectField } from '../common/Form/SelectField'
import { RadioField } from '../common/Form/RadioField'
import { MultiSelectField } from '../common/Form/MultiSelectField'
import { CheckBoxField } from '../common/Form/CheckBoxField'
import { useDispatch, useSelector } from 'react-redux'
import { getQualities, getQualitiesLoadingStatus } from '../../store/qualities'
import { getProfessions, getProfessionsLoadingStatus } from '../../store/professions'
import { getAuthError, signUp } from '../../store/users'

export function RegisterForm() {
	const registerError = useSelector(getAuthError())
	const dispatch = useDispatch()
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		profession: '',
		sex: 'male',
		qualities: [],
		license: false
	})

	const qualities = useSelector(getQualities())
	const qualitiesLoadingStatus = useSelector(getQualitiesLoadingStatus())

	const professions = useSelector(getProfessions())
	const professionsLoadingStatus = useSelector(getProfessionsLoadingStatus())
	const [errors, setErrors] = useState({})

	const professionsList = !professionsLoadingStatus
		? dataConvert(professions).map((option) => ({
				value: option._id,
				label: option.name
		  }))
		: []

	const qualitiesList = !qualitiesLoadingStatus
		? dataConvert(qualities).map((item) => ({
				label: item.name,
				value: item._id,
				color: item.color
		  }))
		: []

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		const newData = {
			...data,
			qualities: data.qualities.map((q) => q.value)
		}
		dispatch(signUp(newData))
	}

	const validatorConfig = {
		email: {
			isRequired: { message: 'Электронная почта обязательна для заполнения' },
			isEmail: { message: 'Проверьте корректность введенных данных' }
		},
		name: {
			isRequired: { message: 'Имя обязательно для заполнения' },
			min: { message: 'Имя должно состоять минимум из 3 символов', value: 3 }
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
				label='Электронная почта'
				name='email'
				value={data.email}
				onChange={handleChange}
				placeholder='Введите email'
				error={errors.email}
			/>
			<TextField
				label='Имя'
				name='name'
				value={data.name}
				onChange={handleChange}
				placeholder='Введите имя'
				error={errors.name}
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
				options={professionsList}
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
				options={qualitiesList}
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
			{registerError && <p className='text-danger'>{registerError}</p>}

			<button className='btn btn-primary w-100' disabled={!isValid}>
				Отправить
			</button>
		</form>
	)
}

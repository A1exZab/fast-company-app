import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import API from '../../../API'
import { TextField } from '../../common/Form/TextField'
import { SelectField } from '../../common/Form/SelectField'
import { RadioField } from '../../common/Form/RadioField'
import { MultiSelectField } from '../../common/Form/MultiSelectField'
import { BackButton } from '../../common/BackButton'
import { Loading } from '../../common/Loading'

import { validator } from '../../../utils/validator'
import { dataConvert } from '../../../utils/dataConvert'
import { qualitiesTransform } from '../../../utils/qualitiesTransform'

export function EditUserPage({ userId }) {
	const [isLoaded, setIsLoaded] = useState(false)
	const [user, setUser] = useState()
	const history = useHistory()

	useEffect(() => {
		API.users.getById(userId).then((data) => setUser(data))
	}, [])

	const [data, setData] = useState({
		name: '',
		email: '',
		profession: '',
		sex: 'male',
		qualities: []
	})

	const [errors, setErrors] = useState({})
	const [professions, setProfessions] = useState()
	const [qualities, setQualities] = useState({})

	const getProfessionById = (id) => {
		for (const prof of professions) {
			if (prof.value === id) {
				return { _id: prof.value, name: prof.label }
			}
		}
	}

	const getQualities = (elements) => {
		const qualitiesArray = []
		for (const elem of elements) {
			for (const quality of qualities) {
				if (elem.value === quality.value) {
					qualitiesArray.push({
						_id: quality.value,
						name: quality.label,
						color: quality.color
					})
				}
			}
		}
		return qualitiesArray
	}

	useEffect(() => {
		Promise.all([
			API.users.getById(userId).then((user) =>
				setData((prev) => ({
					...prev,
					...user,
					profession: user.profession._id,
					qualities: qualitiesTransform(user.qualities)
				}))
			),
			API.professions.fetchAll().then((data) => {
				const professionsList = data.map((prof) => ({
					label: prof.name,
					value: prof._id
				}))
				setProfessions(professionsList)
			}),
			API.qualities.fetchAll().then((data) => {
				const qualitiesList = qualitiesTransform(data)
				setQualities(qualitiesList)
			})
		]).finally(() => setIsLoaded(true))
	}, [])

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return
		API.users
			.update(userId, {
				...data,
				profession: getProfessionById(data.profession),
				qualities: getQualities(data.qualities)
			})
			.then(() => history.goBack())
	}

	const validatorConfig = {
		name: {
			isRequired: { message: 'Имя обязательно для заполнения' }
		},
		email: {
			isRequired: { message: 'Электронная почта обязательна для заполнения' },
			isEmail: { message: 'Проверьте корректность введенных данных' }
		},
		qualities: {
			isRequired: { message: 'Должно быть указано хотя бы одно качество' }
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
		<>
			{isLoaded ? (
				<div className='container mt-5'>
					<div className='row'>
						<div className='col-md-6 offset-md-3 shadow p-4'>
							<form className='' onSubmit={handleSubmit}>
								<TextField
									label='Имя'
									type='text'
									name='name'
									value={data.name}
									onChange={handleChange}
									placeholder='Введите имя'
									error={errors.name}
								/>
								<TextField
									label='Электронная почта'
									type='text'
									name='email'
									value={data.email}
									onChange={handleChange}
									placeholder='Введите электронную почту'
									error={errors.email}
								/>
								<SelectField
									name='profession'
									label='Выберите профессию'
									value={data.profession}
									onChange={handleChange}
									defaultOption='Выбрать...'
									options={dataConvert(professions)}
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
									options={qualities}
									defaultValue={data.qualities}
									onChange={handleChange}
									name='qualities'
									label='Выберите ваши качества'
									error={errors.qualities}
								/>

								<button className='mb-3 btn btn-primary w-100' disabled={!isValid}>
									Подтвердить
								</button>
								<BackButton />
							</form>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	)
}

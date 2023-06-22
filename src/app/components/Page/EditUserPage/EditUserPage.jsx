import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { TextField } from '../../common/Form/TextField'
import { SelectField } from '../../common/Form/SelectField'
import { RadioField } from '../../common/Form/RadioField'
import { MultiSelectField } from '../../common/Form/MultiSelectField'
import { BackButton } from '../../common/BackButton'
import { Loading } from '../../common/Loading'

import { validator } from '../../../utils/validator'
import { dataConvert } from '../../../utils/dataConvert'
import { qualitiesTransform } from '../../../utils/qualitiesTransform'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

export function EditUserPage() {
	const history = useHistory()
	const [isLoading, setLoading] = useState(true)
	const [data, setData] = useState()
	const [errors, setErrors] = useState({})
	const { currentUser, updateUserData } = useAuth()

	const { professions, isLoading: professionsLoading } = useProfessions()
	const { qualities, isLoading: qualitiesLoading } = useQualities()

	const professionsList = professions.map((prof) => ({
		label: prof.name,
		value: prof._id
	}))
	const qualitiesList = qualities.map((q) => ({
		label: q.name,
		value: q._id
	}))

	// const getUserProfession = (profId) => {
	// 	for (const profession of professionsList) {
	// 		if (profession.value === profId) {
	// 			return { _id: prof.value, name: prof.label }
	// 		}
	// 	}
	// }

	const getUserQualities = (qualitiesIds) => {
		const qualitiesArray = []
		for (const qualityId of qualitiesIds) {
			for (const quality of qualitiesList) {
				if (quality.value === qualityId) {
					qualitiesArray.push(quality)
				}
			}
		}
		return qualitiesArray
	}

	useEffect(() => {
		if (!professionsLoading && !qualitiesLoading && currentUser && !data) {
			setData({
				...currentUser,
				qualities: getUserQualities(currentUser.qualities)
			})
		}
	}, [professionsLoading, qualitiesLoading, currentUser, data])

	useEffect(() => {
		if (data && isLoading) {
			setLoading(false)
		}
	}, [data])

	const handleChange = (target) => {
		setData((prevState) => ({ ...prevState, [target.name]: target.value }))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const isValid = validate()
		if (!isValid) return

		await updateUserData({ ...data, qualities: data.qualities.map((q) => q.value) })

		history.push(`/users/${currentUser._id}`)
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
			{!isLoading ? (
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
									options={professionsList}
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

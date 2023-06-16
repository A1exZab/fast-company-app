import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create({
	baseURL: 'https://identitytoolkit.googleapis.com/v1/',
	params: {
		key: import.meta.env.VITE_REACT_APP_FIREBASE_KEY
	}
})

const AuthContext = React.createContext()

export const useAuth = () => {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setUser] = useState({})
	const [error, setError] = useState(null)

	async function signUp({ email, password, ...rest }) {
		try {
			const { data } = await httpAuth.post('accounts:signUp', {
				email,
				password,
				returnSecureToken: true
			})
			setTokens(data)
			await createUser({ _id: data.localId, ...rest })
			console.log(data)
		} catch (error) {
			errorCatcher(error)
			const { code, message } = error.response.data.error
			if (code === 400) {
				if (message === 'EMAIL_EXISTS') {
					const errorObject = {
						email: 'Пользователь с таким Email уже существует'
					}
					throw errorObject
				}
			}
		}
	}

	async function signIn({ email, password }) {
		try {
			const { data } = await httpAuth.post('accounts:signInWithPassword', {
				email,
				password,
				returnSecureToken: true
			})
			setTokens(data)
			console.log(data)
		} catch (error) {
			errorCatcher(error)
			const { code, message } = error.response.data.error
			console.log(message)

			if (code === 400) {
				switch (message) {
					case 'EMAIL_NOT_FOUND':
					case 'INVALID_PASSWORD':
						throw new Error('Email или пароль введены некорректно')
					default:
						throw new Error('Слишком много попыток входа, попробуйте позднее')
				}
			}
		}
	}

	async function createUser(data) {
		try {
			const { content } = await userService.create(data)
			setUser(content)
		} catch (error) {
			errorCatcher(error)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data
		toast.error(message)
		setError(message)
	}

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	return (
		<AuthContext.Provider value={{ signUp, signIn, currentUser }}>{children}</AuthContext.Provider>
	)
}

AuthProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import professionService from '../services/professions.service'
import { toast } from 'react-toastify'

const ProfessionContext = React.createContext()

export const useProfessions = () => {
	return useContext(ProfessionContext)
}

export function ProfessionProvider({ children }) {
	const [isLoading, setLoading] = useState(true)
	const [professions, setProfessions] = useState([])
	const [error, setError] = useState(null)
	useEffect(() => {
		getProfessionsList()
	}, [])

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	async function getProfessionsList() {
		try {
			const { content } = await professionService.get()
			setProfessions(content)
			setLoading(false)
		} catch (error) {
			errorCatcher(error)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data
		toast.error(message)
		setError(message)
	}

	function getProfession(id) {
		return professions.find((p) => p._id === id)
	}

	return (
		<ProfessionContext.Provider value={{ professions, isLoading, getProfession }}>
			{children}
		</ProfessionContext.Provider>
	)
}

ProfessionProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

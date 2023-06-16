import React, { useContext, useEffect, useState } from 'react'
import qualityService from '../services/quality.service'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const QualityContext = React.createContext()

export const useQualities = () => {
	return useContext(QualityContext)
}

export function QualityProvider({ children }) {
	const [isLoading, setLoading] = useState(true)
	const [qualities, setQualities] = useState([])
	const [error, setError] = useState(null)

	useEffect(() => {
		getQualitiesList()
	}, [])

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	async function getQualitiesList() {
		try {
			const { content } = await qualityService.get()
			setQualities(content)
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

	function getQualities(userQualities) {
		return qualities.filter((q) => userQualities.includes(q._id))
	}

	return (
		<QualityContext.Provider value={{ qualities, isLoading, getQualities }}>
			{children}
		</QualityContext.Provider>
	)
}

QualityProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

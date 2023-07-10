import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/professions.service'

const professionsSlice = createSlice({
	name: 'professions',
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null
	},
	reducers: {
		professionsRequested: (state) => {
			state.isLoading = true
		},
		professionsReceived: (state, action) => {
			state.entities = action.payload
			state.isLoading = false
			state.lastFetch = Date.now()
		},
		professionsRequestFailed: (state, action) => {
			state.error = action.payload
			state.isLoading = false
		}
	}
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professionsReceived, professionsRequestFailed } = actions

function isOutdated(date) {
	if (Date.now() - date > 10 * 60 * 1000) {
		return true
	}

	return false
}

export const loadProfessionsList = () => async (dispatch, getState) => {
	const { lastFetch } = getState().qualities
	if (isOutdated(lastFetch)) {
		dispatch(professionsRequested())
		try {
			const { content } = await professionService.get()
			dispatch(professionsReceived(content))
		} catch (error) {
			dispatch(professionsRequestFailed(error.message))
		}
	}
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) => state.professions.isLoading
export const getProfession = (id) => (state) => {
	return state.professions.entities.find((p) => p._id === id)
}

export default professionsReducer
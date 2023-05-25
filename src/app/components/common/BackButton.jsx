import React from 'react'
import { useHistory } from 'react-router-dom'

export function BackButton() {
	const history = useHistory()
	return (
		<button
			className='btn btn-secondary w-100'
			onClick={(e) => {
				e.preventDefault()
				history.goBack()
			}}>
			<i className='bi bi-caret-left'></i>
			Назад
		</button>
	)
}

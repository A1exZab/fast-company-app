import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'

import { nanoid } from 'nanoid'
import commentService from '../services/comment.service'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'

const CommentsContext = React.createContext()

export const useComments = () => {
	return useContext(CommentsContext)
}

export const CommentsProvider = ({ children }) => {
	const currentUserId = useSelector(getCurrentUserId())
	const { userId } = useParams()
	const [isLoading, setLoading] = useState(true)
	const [comments, setComments] = useState([])
	const [error, setError] = useState(null)

	async function createComment(data) {
		const comment = {
			...data,
			pageId: userId,
			createdAt: Date.now(),
			userId: currentUserId,
			_id: nanoid()
		}
		try {
			const { content } = await commentService.createComment(comment)
			setComments((prev) => [...prev, content])
		} catch (error) {
			errorCatcher(error)
		}
	}

	useEffect(() => {
		getComments()
	}, [userId])

	useEffect(() => {
		if (error !== null) {
			toast.error(error)
			setError(null)
		}
	}, [error])

	async function getComments() {
		try {
			const { content } = await commentService.getComments(userId)
			setComments(content)
		} catch (error) {
			errorCatcher(error)
		} finally {
			setLoading(false)
		}
	}

	async function removeComment(commentId) {
		try {
			const { content } = await commentService.removeComment(commentId)
			if (content === null) {
				setComments((prev) => prev.filter((comment) => comment._id !== commentId))
			}
		} catch (error) {
			errorCatcher(error)
		}
	}

	function errorCatcher(error) {
		const { message } = error.response.data
		toast.error(message)
		setError(message)
	}
	return (
		<CommentsContext.Provider value={{ comments, createComment, removeComment, isLoading }}>
			{children}
		</CommentsContext.Provider>
	)
}

CommentsProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

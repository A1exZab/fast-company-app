import { orderBy } from 'lodash'
import { AddCommentForm } from '../common/Comments/AddCommentForm'
import { CommentsList } from '../common/Comments/CommentsList'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	createComment,
	getcomments,
	getcommentsLoadingStatus,
	loadcommentsList,
	removeComment
} from '../../store/comments'
import { Loading } from '../common/Loading'
import { useParams } from 'react-router-dom'

export function Comments() {
	const { userId } = useParams()
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadcommentsList(userId))
	}, [userId])
	const isLoading = useSelector(getcommentsLoadingStatus())

	const comments = useSelector(getcomments())

	const handleSubmit = (data) => {
		dispatch(createComment({ ...data, pageId: userId }))
		createComment(data)
	}

	const handleRemoveComment = (id) => {
		dispatch(removeComment(id))
	}

	const sortedComments = orderBy(comments, ['created_at'], ['desc'])

	return (
		<>
			<div className='card mb-2 text-dark'>
				<div className='card-body'>
					<AddCommentForm onSubmit={handleSubmit} />
				</div>
				{sortedComments.length > 0 && (
					<div className='card mb-3'>
						<div className='card-body'>
							<h2>Комментарии</h2>
							<hr />
							{!isLoading ? (
								<CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
							) : (
								<Loading />
							)}
						</div>
					</div>
				)}
			</div>
		</>
	)
}

import { orderBy } from 'lodash'
import { AddCommentForm } from '../common/Comments/AddCommentForm'
import { CommentsList } from '../common/Comments/CommentsList'
import { useComments } from '../../hooks/useComments'

export function Comments() {
	const { createComment, removeComment, comments } = useComments()

	const handleSubmit = (data) => {
		createComment(data)
	}

	const handleRemoveComment = (id) => {
		removeComment(id)
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
							<CommentsList comments={sortedComments} onRemove={handleRemoveComment} />
						</div>
					</div>
				)}
			</div>
		</>
	)
}

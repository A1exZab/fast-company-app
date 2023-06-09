import React from 'react'
import { Comment } from './Comment'
import PropTypes from 'prop-types'

export function CommentsList({ comments, onRemove }) {
	return comments.map((comment) => <Comment key={comment._id} {...comment} onRemove={onRemove} />)
}

CommentsList.propTypes = {
	comments: PropTypes.array,
	onRemove: PropTypes.func
}

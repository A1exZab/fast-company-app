import React from 'react'
import PropTypes from 'prop-types'

export function Bookmark({ onClickBookmark, id, status }) {
	return (
		<i
			onClick={() => onClickBookmark(id)}
			className={'bi bi-bookmark' + (status ? '-star-fill' : '-plus')}
			style={{ fontSize: '2rem', color: 'white', cursor: 'pointer' }}></i>
	)
}

Bookmark.propTypes = {
	onClickBookmark: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	status: PropTypes.bool.isRequired
}

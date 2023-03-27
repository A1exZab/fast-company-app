import React from 'react'
import added from '/img/bookmark-added.svg'
import plus from '/img/bookmark-plus.svg'
import PropTypes from 'prop-types'

export function Bookmark({ onClickBookmark, id, bookmark }) {
	return (
		<img
			role='button'
			onClick={() => onClickBookmark(id)}
			src={bookmark ? added : plus}
			alt='bookmark'
		/>
	)
}

Bookmark.propTypes = {
	onClickBookmark: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	bookmark: PropTypes.bool.isRequired
}

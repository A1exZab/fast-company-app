import React from 'react'
import Badge from 'react-bootstrap/Badge'
import PropTypes from 'prop-types'

export function Qualities({ qualities }) {
	return (
		<div className='d-flex flex-wrap gap-2'>
			{qualities.map((quality) => {
				return (
					<Badge key={quality._id} bg={quality.color}>
						{quality.name}
					</Badge>
				)
			})}
		</div>
	)
}

Qualities.propTypes = {
	qualities: PropTypes.array.isRequired
}

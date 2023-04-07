import React from 'react'
import PropTypes from 'prop-types'

export function Qualities({ qualities }) {
	return (
		<div className='d-flex flex-wrap gap-2'>
			{qualities.map((quality) => {
				return (
					<span
						className={'badge border border-2 text-light' + ' border-' + quality.color}
						key={quality._id}>
						{quality.name}
					</span>
				)
			})}
		</div>
	)
}

Qualities.propTypes = {
	qualities: PropTypes.array.isRequired
}

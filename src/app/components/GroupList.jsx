import React from 'react'
import PropTypes from 'prop-types'

export function GroupList({ items, valueProperty, contentProperty, selectedItem, onItemSelect }) {
	return (
		<ul className='list-group'>
			{items.map((item) => {
				const active = item === selectedItem
				return (
					<li
						className={'list-group-item' + (active ? ' active' : '')}
						role='button'
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}>
						{item[contentProperty]}
					</li>
				)
			})}
		</ul>
	)
}

GroupList.defaultProps = {
	valueProperty: '_id',
	contentProperty: 'name'
}

GroupList.propTypes = {
	items: PropTypes.arrayOf(PropTypes.object).isRequired,
	valueProperty: PropTypes.string.isRequired,
	contentProperty: PropTypes.string.isRequired,
	onItemSelect: PropTypes.func,
	selectedItem: PropTypes.object
}

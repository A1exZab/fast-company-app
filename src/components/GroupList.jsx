import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import PropTypes from 'prop-types'

export function GroupList({ items, valueProperty, contentProperty, selectedItem, onItemSelect }) {
	return (
		<ListGroup className=''>
			{items.map((item) => {
				const active = item === selectedItem
				return (
					<ListGroup.Item
						role='button'
						active={active}
						key={item[valueProperty]}
						onClick={() => onItemSelect(item)}>
						{item[contentProperty]}
					</ListGroup.Item>
				)
			})}
		</ListGroup>
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

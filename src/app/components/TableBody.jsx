import React from 'react'

import _ from 'lodash'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

export function TableBody({ data, columns }) {
	const renderContent = (item, column) => {
		if (columns[column].component) {
			const component = columns[column].component
			if (typeof component === 'function') {
				return component(item)
			}
			return component
		}
		return _.get(item, columns[column].path)
	}

	return (
		<tbody>
			{data.map((item) => (
				<tr key={item._id}>
					{Object.keys(columns).map((column) => (
						<td className={'text-center align-middle'} key={column}>
							{columns[column].path === 'name' ? (
								<Link to={`users/${item._id}`} className='text-decoration-none'>
									{renderContent(item, column)}
								</Link>
							) : (
								renderContent(item, column)
							)}
						</td>
					))}
				</tr>
			))}
		</tbody>
	)
}

TableBody.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.object.isRequired
}

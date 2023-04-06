import React from 'react'
import PropTypes from 'prop-types'

import { TableHeader, TableBody } from '../components'

export function Table({ color, onSort, selectedSort, columns, data, children }) {
	return (
		<table className={'table ' + color}>
			{children || (
				<>
					<TableHeader {...{ onSort, selectedSort, columns }} />
					<TableBody {...{ data, columns }} />
				</>
			)}
		</table>
	)
}

Table.propTypes = {
	color: PropTypes.string,
	onSort: PropTypes.func,
	selectedSort: PropTypes.object,
	columns: PropTypes.object,
	data: PropTypes.array,
	children: PropTypes.array
}

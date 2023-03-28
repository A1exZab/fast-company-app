import React from 'react'
import Table from 'react-bootstrap/Table'
import PropTypes from 'prop-types'

import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'

export function CustomTable({ color, onSort, selectedSort, columns, data, children }) {
	return (
		<Table variant={color}>
			{children || (
				<>
					<TableHeader {...{ onSort, selectedSort, columns }} />
					<TableBody {...{ data, columns }} />
				</>
			)}
		</Table>
	)
}

CustomTable.propTypes = {
	color: PropTypes.string,
	onSort: PropTypes.func,
	selectedSort: PropTypes.object,
	columns: PropTypes.object,
	data: PropTypes.array,
	children: PropTypes.array
}

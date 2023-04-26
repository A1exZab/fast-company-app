import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export function MultiSelectField({ options, onChange, name, label }) {
	const handleChange = (value) => {
		onChange({ name: name, value })
	}

	return (
		<div className='mb-4'>
			<label className='form-label'>{label}</label>
			<div className='text-dark'>
				<Select
					placeholder='Выбрать...'
					isMulti
					options={options}
					className='basic-multi-select'
					classNamePrefix='select'
					onChange={handleChange}
					name={name}
				/>
			</div>
		</div>
	)
}

MultiSelectField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func
}

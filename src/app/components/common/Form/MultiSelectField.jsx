import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

export function MultiSelectField({ options, onChange, name, label, defaultValue, error }) {
	const handleChange = (value) => {
		onChange({ name: name, value })
	}

	const getInputClasses = () => {
		return 'text-dark' + (error ? ' is-invalid' : '')
	}

	return (
		<div className='mb-4'>
			<label className='form-label'>{label}</label>
			<div className={getInputClasses()}>
				<Select
					closeMenuOnSelect={false}
					defaultValue={defaultValue}
					placeholder='Выбрать...'
					isMulti
					options={options}
					className='basic-multi-select'
					classNamePrefix='select'
					onChange={handleChange}
					name={name}
				/>
			</div>
			{error && <div className='invalid-feedback'>{error}</div>}
		</div>
	)
}

MultiSelectField.propTypes = {
	name: PropTypes.string,
	label: PropTypes.string,
	options: PropTypes.array,
	onChange: PropTypes.func,
	defaultValue: PropTypes.array,
	error: PropTypes.string
}

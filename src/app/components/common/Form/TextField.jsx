import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

export function TextField({ label, type, name, value, onChange, placeholder, error }) {
	const [showPassword, setShowPassword] = useState()
	const getInputClasses = () => {
		return 'form-control' + (error ? ' is-invalid' : '')
	}
	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState)
	}
	return (
		<div className='mb-4'>
			<label htmlFor={name}>{label}</label>
			<div className='input-group has-validation'>
				<input
					className={getInputClasses()}
					type={showPassword ? 'text' : type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
				/>
				{type === 'password' && (
					<button className='btn btn-outline-secondary ' type='button' onClick={toggleShowPassword}>
						<i className={'bi bi-eye' + (showPassword ? '-slash' : '')} />
					</button>
				)}
				{error && <div className='invalid-feedback'>{error}</div>}
			</div>
		</div>
	)
}

TextField.defaultProps = {
	type: 'text'
}

TextField.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	error: PropTypes.string
}

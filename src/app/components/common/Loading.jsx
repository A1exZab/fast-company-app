import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export function Loading({ color = 'white', size = 'md' }) {
	const fontSize = `fs-${size === 'sm' ? '5' : size === 'lg' ? '1' : '3'}`
	return (
		<div className='d-flex m-3 align-items-end gap-1'>
			<div className={fontSize + ' fw-semibold'}>Загрузка</div>
			<ThreeDots
				height='20'
				width='25'
				radius='9'
				color={color}
				ariaLabel='three-dots-loading'
				visible={true}
			/>
		</div>
	)
}

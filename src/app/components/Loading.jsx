import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

export function Loading() {
	return (
		<div className='d-flex m-3 align-items-end gap-1'>
			<div className='fs-3 fw-semibold'>Загрузка</div>
			<ThreeDots
				height='20'
				width='25'
				radius='9'
				color='white'
				ariaLabel='three-dots-loading'
				visible={true}
			/>
		</div>
	)
}

import React from 'react'

export function MeetingsCard({ value }) {
	return (
		<div className='card mb-3 text-dark'>
			<div className='card-body d-flex flex-column justify-content-center text-center'>
				<h5 className='card-title'>
					<span>Завершено встреч</span>
				</h5>
				<h1 className='display-1'>{value}</h1>
			</div>
		</div>
	)
}

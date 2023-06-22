import React from 'react'
import { Qualities } from './Qualities'

export function QualitiesCard({ qualities }) {
	return (
		<div className='card mb-3'>
			<div className='card-body d-flex flex-column justify-content-center text-center'>
				<h5 className='card-title text-dark'>
					<span>Качества</span>
				</h5>
				<div className='d-flex justify-content-center'>
					<Qualities userQualities={qualities} />
				</div>
			</div>
		</div>
	)
}

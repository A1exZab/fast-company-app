import React from 'react'
import Button from 'react-bootstrap/Button'
import { Qualities } from '../components'
import { Bookmark } from '../components'
import PropTypes from 'prop-types'

export function User({
	name,
	qualities,
	profession,
	completedMeetings,
	rate,
	bookmark,
	_id,
	onClickBookmark,
	onClickDeleteButton
}) {
	return (
		<tr>
			<td className='align-middle'>{name}</td>
			<td className='align-middle'>
				<Qualities qualities={qualities} />
			</td>
			<td className='align-middle'>{profession.name}</td>
			<td className='align-middle text-center'>{completedMeetings}</td>
			<td className='align-middle text-center'>{rate}/5</td>
			<td className='align-middle text-center'>
				<Bookmark bookmark={bookmark} id={_id} onClickBookmark={onClickBookmark} />
			</td>
			<td className='align-middle text-center'>
				<Button onClick={() => onClickDeleteButton(_id)} variant='danger'>
					Удалить
				</Button>
			</td>
		</tr>
	)
}

User.propTypes = {
	name: PropTypes.string.isRequired,
	profession: PropTypes.object.isRequired,
	completedMeetings: PropTypes.number.isRequired,
	rate: PropTypes.number.isRequired,
	_id: PropTypes.string.isRequired,
	onClickDeleteButton: PropTypes.func.isRequired
}

import PropTypes from 'prop-types'
import { displayDate } from '../../../utils/displayDate'
import { useUsers } from '../../../hooks/useUsers'
import { useAuth } from '../../../hooks/useAuth'
export function Comment({ content, createdAt, _id: id, userId, onRemove }) {
	const { getUserById } = useUsers()
	const user = getUserById(userId)
	const { currentUser } = useAuth()

	return (
		<div className='bg-light card-body mb-3'>
			<div className='row'>
				<div className='col'>
					<div className='d-flex flex-start'>
						<img src={user.image} alt='avatar' className='rounded-circle' width='65' height='65' />
						<div className='flex-grow-1 flex-shrink-1'>
							<div className='mb-4'>
								<div className='d-flex justify-content-between align-items-center'>
									<p className='mb-1'>
										{user && user.name} <span className='small'>- {displayDate(createdAt)}</span>
									</p>
									{currentUser._id === userId && (
										<button
											className='btn-btn-sm text-danger d-flex align-items-center border-0 bg-transparent'
											onClick={() => onRemove(id)}>
											<i className='bi bi-x-square'></i>
										</button>
									)}
								</div>
								<p className='small mb-0'>{content}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Comment.propTypes = {
	content: PropTypes.string,
	edited_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	userId: PropTypes.string,
	onRemove: PropTypes.func,
	_id: PropTypes.string
}

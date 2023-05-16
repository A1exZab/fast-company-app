import { dataConvert } from './dataConvert'

export function qualitiesTransform(data) {
	return dataConvert(data).map((item) => ({ label: item.name, value: item._id, color: item.color }))
}

export function dataConvert(data) {
	try {
		if (Array.isArray(data)) {
			return data
		} else if (typeof data === 'object' && data !== null) {
			return Object.values(data)
		} else {
			throw new Error('Invalid data')
		}
	} catch (e) {
		alert(e.name + ': ' + e.message)
	}
}

export default function getAvatar() {
	const params = (Math.random() + 1).toString(36).substring(7)

	const avatarUrl = `https://avatars.dicebear.com/api/avataaars/${params}.svg`

	return avatarUrl
}

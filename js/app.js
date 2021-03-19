document.addEventListener('DOMContentLoaded', (e) => {
	fetchData()
})

const fetchData = async () => {
	try {
		const res = await fetch('../data.json')
		const data = await res.json()
		console.log(data)

	} catch (error) {
			console.log(error)
	}
}
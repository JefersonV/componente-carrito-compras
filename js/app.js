const items = document.querySelector('#items')
const templateCard = document.querySelector('#template-card').content
/* console.log(templateCard) */
const fragment = document.createDocumentFragment()

document.addEventListener('DOMContentLoaded', (e) => {
	fetchData()
})

items.addEventListener('click', e => {
	agregarAlCarrito(e)
})

const fetchData = async () => {
	try {
		const res = await fetch('../data.json')
		const data = await res.json()
		pintarCards(data)
	} catch (error) {
			console.log(error)
	}
}

let pintarCards = (data) => {
	console.log(data)
	/* recorremos la data */
	data.forEach(producto => {
		templateCard.querySelector('.card-title').textContent = producto.title
		templateCard.querySelector('.card-text').textContent = producto.precio
		templateCard.querySelector('.card-img-top').setAttribute('src', producto.thumbnailUrl)
		templateCard.querySelector('.card-img-top').setAttribute('alt', producto.title)
		templateCard.querySelector('.btn-dark').dataset.id = producto.id
/* 		console.log(templateCard.querySelector('.btn-dark').getAttribute('data-id')) */
		
		const clone = templateCard.cloneNode(true)

		fragment.appendChild(clone)
	})
	items.appendChild(fragment)
}

const agregarAlCarrito = (e) => {
	console.log(e.target)
}
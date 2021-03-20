const cards = document.querySelector('#cards')
const itemCarrito = document.querySelector('#items')
const footer = document.querySelector('#footer')
const templateCard = document.querySelector('#template-card').content
const templateCarrito = document.querySelector('#template-carrito').content
const templateFooter = document.querySelector('#template-footer').content
// console.log(templateCarrito)
// console.log(templateFooter) 
/* console.log(templateCard) */
const fragment = document.createDocumentFragment()
let carrito = { }

document.addEventListener('DOMContentLoaded', (e) => {
	fetchData()
	/* local storage */
	if (localStorage.getItem('carrito')) {
		carrito = JSON.parse(localStorage.getItem('carrito'))
		pintarCarrito()
	}

})

itemCarrito.addEventListener('click', e => {
	btnAccion(e)
})

cards.addEventListener('click', e => {
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
	cards.appendChild(fragment)
}

const agregarAlCarrito = (e) => {
	// console.log(e.target)
	// console.log(e.target.classList.contains('bnt-dark'))
	if(e.target.classList.contains('btn-dark')) {
		setCarrito(e.target.parentElement)
	}
	e.stopPropagation()
}

const setCarrito = (objeto) => {
	// console.log(objeto)
	const producto = {
		id: objeto.querySelector('.btn-dark').dataset.id,
		title: objeto.querySelector('.card-title').textContent,
		precio: objeto.querySelector('.card-text').textContent,
		cantidad: 1,
	}
	
	if (carrito.hasOwnProperty(producto.id)) {
		producto.cantidad = carrito[producto.id].cantidad + 1
	}

	carrito[producto.id] = { ... producto }
	pintarCarrito()
}

const pintarCarrito = () => {

	// limpia cada vez que damos click
	itemCarrito.innerHTML = ''

	Object.values(carrito).forEach(producto => {
		templateCarrito.querySelector('th').textContent = producto.id
		templateCarrito.querySelectorAll('td')[0].textContent = producto.title
		templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
		templateCarrito.querySelector('.btn-info').dataset.id = producto.id
		templateCarrito.querySelector('.btn-danger').dataset.id = producto.id
		templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio
		  
		const clone = templateCarrito.cloneNode(true)
		fragment.appendChild(clone)
	})
	itemCarrito.appendChild(fragment)

	pintarFooter()
	/*local storage  */
	localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
	footer.innerHTML = ''
	if (Object.keys (carrito).length === 0) {
		footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
		`
		return;
	}

	const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
	const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
	// console.log(nCantidad)
	// console.log(nPrecio)
	templateFooter.querySelectorAll('td')[0].textContent = nCantidad
	templateFooter.querySelector('span').textContent = nPrecio

	const clone = templateFooter.cloneNode(true)
	fragment.appendChild(clone)
	footer.appendChild(fragment)

	const btnVaciar = document.querySelector('#vaciar-carrito')
	btnVaciar.addEventListener('click', () => {
		carrito = { }
		pintarCarrito()
	})
}


const btnAccion = e => {
	console.log(e.target)
	if (e.target.classList.contains('btn-info')) {
		console.log(carrito[e.target.dataset.id])

		const producto = carrito [e.target.dataset.id]
		producto.cantidad++
		carrito[e.target.dataset.id] = { ... producto }
		pintarCarrito()
	} 
	if (e.target.classList.contains('btn-danger')) {
		const producto = carrito [e.target.dataset.id]
		producto.cantidad--
		if (producto.cantidad === 0) {
			delete carrito[e.target.dataset.id]
		}
		pintarCarrito()
	}

	e.stopPropagation()
}

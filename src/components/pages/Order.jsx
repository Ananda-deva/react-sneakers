import React from "react"
import axios from 'axios'

import Card from "../Card"

function Order() {
	
	const [ order, setOrder ] = React.useState([])
	const [ isLoading, setIsLoading ] = React.useState(true)

	React.useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get('https://64c744830a25021fde923819.mockapi.io/order')
			setOrder(data.reduce((prev, obj) => [...prev, ...obj.items], []))
			setIsLoading(false)
		} catch (error) {
			alert('Ошибка при запросе заказа')
			console.error(error)
		}
	})()
}, [])


	return (
		<>
		<div className='content p-40 '>
		<div className='d-flex align-center justify-between mb-40'>
			<h1>Мои заказы</h1>
		</div>
	</div>
		<div className='sneakers flex-wrap'>
		{(isLoading ? [...Array(8)] : order).map((item, index) => (
				<Card
				key={index}
				loading={isLoading}
				{...item}
				/>
			))}
		</div>
	</>
	)
}

export default Order
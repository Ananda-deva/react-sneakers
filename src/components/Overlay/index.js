import React from "react"
import axios from "axios"

import NewOverlay from "../NewOverlay"
import { useCart } from "../Hooks/useCart"

import styles from './Overlay.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Overlay({ onClickChangeBuy, removeCard, items=[], opened }) {

	const {cartItems,setCartItems, totalPrice } = useCart()

	// const { cartItems, setCartItems } = React.useContext(AppContext)
	const [orderId, setOrderId ] = React.useState(null)
	const [isComplete, setIsComplete ] = React.useState(false)
	const [isLoadding, setIsLoading ] = React.useState(false)
	// const totalPrice = cartItems.reduce((sum, obj) => +obj.price + +sum, 0)

	
	const onClickOrder = async () => {
		try {
			setIsLoading(true)
			const {data} = await axios.post('https://64c744830a25021fde923819.mockapi.io/order', {
				items: cartItems,
			})
		setOrderId(data.id)
		setIsComplete(true)
		setCartItems([])

		for (let i = 0; i < cartItems.length; i++) {
			const item = cartItems[i]
			await axios.delete('https://64bcefc12320b36433c743ab.mockapi.io/cart/' + item.id)
			await delay(1000)
		}

		onClickChangeBuy()

		} catch (error) {
			alert('Ошибка при создании заказа')
		}
		setIsLoading(false)
	}
	
	return (
		<div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
		<div className={`${styles.drawer}`}>
			<div>
			<h2 className='d-flex justify-between mb-15'>Корзина<img onClick={onClickChangeBuy} className='removeDrawer cu-p ' src='img/btn-remove.svg' alt='Remove' /> </h2>

			<div className='all'>
				{cartItems.map((obj) => {
					return (
						<div key={obj.id} className='cartItem d-flex align-center mb-20'>
							<div
								style={{ backgroundImage: `url(img/sneakers/${obj.photo}.jpg`}}
								className='cartItemImg'></div>

							<div className='mr-20 flex'>
								<p className='mb-5'>{obj.name}</p>
								<b>{obj.price}</b>
							</div>
							<img onClick={() => removeCard(obj.id)} className='removeBtn' src='img/btn-remove.svg' alt='Remove' />
						</div>
					)
				})}
			</div>
			</div>
			
			{cartItems.length > 0 ? (
			<div className='items'>
				<ul className='cartTotalBlock'>
					<li>
						<span>Итого:</span>
						<div></div>
						<b>{totalPrice} руб.</b>
					</li>
					<li>
						<span>Налог 13%:</span>
						<div></div>
						<b>{Math.round(totalPrice * 0.13)} руб.</b>
					</li>
				</ul>
				<button disabled={isLoadding} onClick={onClickOrder} className='greenButton'>
					Оформить заказ <img className='arrowRight' src='img/arrow.svg' alt='Arrow'/>
				</button>
			</div>
		) : (
			<NewOverlay
				title={isComplete ? 'Заказ оформлен' : 'Корзина пустая'}
				description={isComplete ? `Ваш заказ №${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы оформить заказ'}
				image={isComplete ? 'img/Offer.png' : 'img/trash.png'}
			/>
		)}
		</div>
	</div>
		)}
		
export default Overlay

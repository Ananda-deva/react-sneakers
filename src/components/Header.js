import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from "./Hooks/useCart"


function Header({ onClickChangeBuy }) {

	const { totalPrice } = useCart()

	return (
		<header className='d-flex justify-between align-center p-40'>
		<Link className='d-flex align-center' to='react-sneakers/'>
			<img width={40} hight={40} src='img/logo.png' alt='Лого' />
			<div>
				<h3 className='text-uppercase'>React Sneakers</h3>
				<p className='opacity-5'>Магазин лучших кросовок</p>
			</div>
		</Link>

		<ul className='d-flex'>
			<li onClick={onClickChangeBuy} className='mr-30 cu-p'>
				<img width={18} hight={18} src='img/chart.svg' alt='Карта' />
				<span>{totalPrice} руб.</span>
			</li>
			<li className='mr-20 cu-p'>
				<Link to='react-sneakers/favorites'>
				<img width={18} hight={18} src='img/heart.svg' alt='Нравится' />
				</Link>
			</li>
			<li className='mr-20 cu-p'>
			<Link to='react-sneakers/order'>
				<img width={18} hight={18} src='img/user.svg' alt='Пользователь' />
			</Link>
			</li>
		</ul>
	</header>
	)
}

export default Header


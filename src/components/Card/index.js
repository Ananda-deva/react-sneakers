import React from 'react'
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss'
import AppContext from '../../context'
// import App from '../../App'

function Card({
	 id,
	 name,
	 price,
	 photo,
	 onAddBuy,
	 onFavorite,
	 favorited = false,
	 loading=false,
 }) {

	const { isItemAdded } = React.useContext(AppContext)
  const [isFavorite, setIsFavorite] = React.useState(favorited);
	const obj = { id, parentId: id, name, photo, price };

	const onClickPlus = () => {
		onAddBuy(obj)
	}

	const onClickFavorit = () => {
		onFavorite(obj)
		setIsFavorite(!isFavorite)
	}

	return (
	<div className={styles.card}>
		{
			loading ?
			<ContentLoader
				speed={2}
				width={155}
				height={195}
				viewBox="0 0 155 195"
				backgroundColor="#d6d6d6"
				foregroundColor="#cbc3c3"
				>
				<rect x="0" y="0" rx="10" ry="10" width="155" height="90" /> 
				<rect x="0" y="100" rx="5" ry="5" width="155" height="15" /> 
				<rect x="0" y="120" rx="5" ry="5" width="100" height="15" /> 
				<rect x="0" y="165" rx="5" ry="5" width="80" height="25" /> 
				<rect x="124
				" y="158" rx="10" ry="10" width="32" height="32" />
			</ContentLoader> :
			<>
				{onFavorite && (<img
				 onClick={onClickFavorit}
				 className={styles.favorite}
				 src={isFavorite ? 'img/like.png' : 'img/nolike.svg' }
				 alt='Unlike'
				/>)}
				<img width={133} hight={113} src={`img/sneakers/${photo}.jpg`} alt='Sneakers' />
				<h5>{name}</h5>
				<div className='d-flex justify-between align-center'>
					<div className='d-flex flex-column'>
						<span>Цена:</span>
						<b>{price} руб.</b>
					</div>
					{onAddBuy && (<img
					 onClick={onClickPlus}
					 src={isItemAdded(id) ? 'img/ok.svg' : 'img/plus.png'}
					 alt='Plus'
					/>)}
				</div>
			</>
		}


	</div>
	)
}




export default Card
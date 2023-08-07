import React from "react"
import Card from "../Card"
import AppContext from "../../context"

function Favorites({ onClickFavorite }) {
	const { isFavorite } = React.useContext(AppContext)
	const state = React.useContext(AppContext)

	console.log(state);

	return (
		<>
		<div className='content p-40 '>
		<div className='d-flex align-center justify-between mb-40'>
			<h1>Мои закладки</h1>
		</div>
	</div>
		<div className='sneakers flex-wrap'>
		{isFavorite.map((obj) => (
				<Card
				key={obj.photo}
				favorited={true}
				onFavorite={onClickFavorite}
				{...obj}
				/>
			))}
		</div>
	</>
	)
}

export default Favorites
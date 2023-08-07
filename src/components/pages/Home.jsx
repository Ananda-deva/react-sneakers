import React from "react"
import Card from "../Card"

function Home({
	 items,
	 searchValue,
	 setSearchValue,
	 onChangeSearchInput,
	 onAddToCart,
	 onClickFavorite,
	 isLoading,
 })	{


	const renderItems = () => {
		const filterItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))

	return (isLoading ? [...Array(15)] : filterItems )
	.map((item, index) => (
			<Card
				key={index}
				onAddBuy={onAddToCart}
				onFavorite={onClickFavorite}
				loading={isLoading}
				{...item}
			/>
		))
 }

	return (
		<>
		<div className='content p-40 '>
		<div className='d-flex align-center justify-between mb-40'>
			<h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
			<div className='search-block d-flex '>
				<img className='search' src='img/search.png' alt ='Search'/>
				{searchValue && (
				<img
				 onClick={() => setSearchValue('')}
				 className='clear cu-p'
				 src='img/btn-remove.svg'
				 alt='Clear'
				/>
				)}
				<input
				 onChange={onChangeSearchInput}
				 value={searchValue}
				 placeholder="Поиск..."
				/>
			</div>
		</div>
	</div>
		<div className='sneakers flex-wrap'>
			{renderItems()}
		</div>
	</>
	)
}

export default Home
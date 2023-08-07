import React from "react";
import axios from "axios";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Overlay from "./components/Overlay";
import AppContext from "./context";

import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import Order from "./components/pages/Order";



function App() {

	const [items, setItems ] = React.useState([])
	const [cartItems, setCartItems ] = React.useState([])
	const [isFavorite, setIsFavorite ] = React.useState([])
	const [searchValue, setSearchValue ] = React.useState('')
	const [openOverlay, setOpenOverlay] = React.useState(false)
	const [isLoading, setIsLoading] = React.useState(true)

	const onChangeSearchInput = (event) => {
		setSearchValue(event.target.value)
	}

	React.useEffect(() => {
		async function fetchData() {
			
			try {
				const [ cartResponse, favotitesResponse, itemsResponse ] = await Promise.all([
					axios.get('https://64bcefc12320b36433c743ab.mockapi.io/cart'),
					axios.get('https://64c744830a25021fde923819.mockapi.io/favorites'),
					axios.get('https://64bcefc12320b36433c743ab.mockapi.io/items'),
				])

			setIsLoading(false)
			
			setCartItems(cartResponse.data)
			setIsFavorite(favotitesResponse.data)
			setItems(itemsResponse.data)

			} catch (error) {
				alert('Ошибка при запросе данных')
				console.error(error);
			}
		}

		fetchData()
	}, [])

	const onAddToCart = async (obj) => {
		const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
		try {
			if (findItem) {
				setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
				await axios.delete(`https://64bcefc12320b36433c743ab.mockapi.io/cart/${findItem.id}`)
			} else {
				setCartItems((res) => [...res, obj])
				const { data } = await axios.post('https://64bcefc12320b36433c743ab.mockapi.io/cart', obj)
				setCartItems((prev) => prev.map(item => {
					if (item.parentId === data.parentId) {
							return {
								...item,
								id: data.id,
							}
						}
					return item
				}))
			}
		} catch (error) {
			alert('Ошибка при добавлении в корзину')
			console.error(error);
		}
	}

	const removeCard = (id) => {
		try {
			axios.delete(`https://64bcefc12320b36433c743ab.mockapi.io/cart/${id}`)
			setCartItems((prev) => prev.filter((item) => item.id !== id))
		} catch (error) {
			alert('Ошибка при удалении из корзины');
      console.error(error);
		}
	}

	const onClickChangeBuy = () => {
		setOpenOverlay(!openOverlay)
		document.body.style.overflow = openOverlay ? "auto" : "hidden";
	}

	React.useEffect(() => {
		// При монтировании компонента добавляем или удаляем стиль для body
		document.body.style.paddingRight = openOverlay ? '15px' : '0';

		// При размонтировании компонента удаляем стиль, чтобы вернуть исходное значение
		return () => {
			document.body.style.paddingRight = '0';
		};
	}, [openOverlay]);

	const onClickFavorite = async (obj) => {
		try {
			if (isFavorite.find((favObj) => Number(favObj.id) === Number(obj.id))) {
				axios.delete(`https://64c744830a25021fde923819.mockapi.io/favorites/${obj.id}`)
				setIsFavorite((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
			} else {
				const { data } = await axios.post('https://64c744830a25021fde923819.mockapi.io/favorites', obj)
				setIsFavorite((prev) => [...prev, data])
			}
		} catch (error) {
			alert('Не удалось добавить в фавориты ')
			console.error(error);
		}
	}


	const isItemAdded = (id) => {
		return cartItems.some((obj) => Number(obj.parentId) === Number(id))
	}

	const isFavoriteAdded = (id) => {
		return isFavorite.some((obj) => Number(obj.id) === Number(id))
	}

  return (
		<AppContext.Provider value={{ items, cartItems, isFavorite, isItemAdded, isFavoriteAdded, setCartItems, onAddToCart, isLoading, onClickChangeBuy }}>
	<div className="wrapper clear">

	<Overlay
		removeCard={removeCard}
		cartItems={cartItems}
		onClickChangeBuy={onClickChangeBuy}
		opened={openOverlay}
	/>

	<Header
		onClickChangeBuy={onClickChangeBuy}
	/>

	<Routes>
		<Route path='' exact element={
				<Home
					items={items}
					cartItems={cartItems}
					searchValue={searchValue}
					setSearchValue={setSearchValue}
					onChangeSearchInput={onChangeSearchInput}
					onAddToCart={onAddToCart}
					onClickFavorite={onClickFavorite}
					isLoading={isLoading}
				/>
		}/>
		<Route path='favorites' exact element={
			<div>
				<Favorites
				 onClickFavorite={onClickFavorite}
				 />
			</div>
		}/>
		<Route path='order' exact element={
			<div>
				<Order
				 onClickFavorite={onClickFavorite}
				 />
			</div>
		}/>
		</Routes>

	</div>
		</AppContext.Provider>
	
  );
}

export default App;

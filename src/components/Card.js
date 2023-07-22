

function Card() {
	return (
	<div className='card'>
		<img width={133} hight={113} src='/img/sneakers/4.jpg' alt='Sneakers' />
		<h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
		<div className='d-flex justify-between align-center'>
			<div className='d-flex flex-column'>
				<span>Цена:</span>
				<b>12 999 руб.</b>
			</div>
				<button className="button">
					<img width={11} hight={11} src='/img/plus.png' alt='Plus' />
				</button>
		</div>
	</div>
	)
}




export default Card
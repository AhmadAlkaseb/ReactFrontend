import { useEffect, useState } from 'react'
import { getAllItemsForSale } from '../services/apiFacade';
import { Link } from 'react-router-dom';

export default function ItemsForSale() {
  const [itemsForSale, setItemsForSale] = useState([]);

  useEffect(() => {
    try {
      getAllItemsForSale()
        .then(data => setItemsForSale(data))
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  return (
    <>
      <h1>Items for sale</h1>
      {itemsForSale.map((item) => (
        <div key={item.id}>
          <img src="/item-for-sale.jpg" alt="Item for sale" />
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <button>
            <Link to={`/item/${item.id}`}>See item</Link>
          </button>
        </div>
      ))}
    </>
  )
}

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '../services/apiFacade';

export default () => {
  let params = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    try {
        getItemById(params.itemid)
            .then(data => setItem(data))
    } catch (error) {
        console.log(error.message)
    }
  }, [])

  return (
    <div>Item: {item.title}</div>
  )
}

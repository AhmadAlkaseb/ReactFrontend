import {useState} from 'react'
import MyItems from './MyItems'
import MyItemsInputForm from './MyItemsInputForm';

const MyItemsPage = () => {
    const [update,setUpdate] = useState(false);
    const [item,setItem] = useState({
        Title: '',
        Description: '',
        Price: '',
        Status: '',
        Fullname: '',
        PhoneNumber: '',
        Address: '',
        Zipcode: ''
    });

  return (
    <>     
        <MyItemsInputForm update={update} setUpdate={setUpdate} item={item} setItem={setItem}/>   
        <MyItems update={update} setUpdate={setUpdate} setItem={setItem}/>
    </>
  )
}

export default MyItemsPage
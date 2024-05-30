import {useState} from 'react'
import MyItems from './MyItems'
import MyItemsInputForm from './MyItemsInputForm';
import styled from 'styled-components';

const PageHeader = styled.h1`
    padding-top: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 100px;
    color: #333;
`;

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
        <PageHeader>My items</PageHeader>
        <MyItemsInputForm update={update} setUpdate={setUpdate} item={item} setItem={setItem}/>   
        <MyItems update={update} setUpdate={setUpdate} setItem={setItem}/>
    </>
  )
}

export default MyItemsPage
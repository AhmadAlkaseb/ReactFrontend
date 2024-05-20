import React from 'react'
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navitage = useNavigate();

    return (
      <>
      <p>Page not found.</p>
      <button onClick={() => navitage(-1)}>Go back</button>
      <button onClick={() => navitage('/')}>Go back to home</button>
      </>
    )
}

export default PageNotFound
import React, { useRef } from 'react';

const UncontrolledForm = () => {

    //HOOK'et useRef giver adgang til DOM-elementet
    const inputRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputRef.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" ref={inputRef} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default UncontrolledForm;
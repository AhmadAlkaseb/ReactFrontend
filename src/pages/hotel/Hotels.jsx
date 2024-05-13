import {useEffect, useState} from "react";
import {LOCAL_API_BASE_URL} from "../../utils/globalVariables.js";

export function Hotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        fetch(`${LOCAL_API_BASE_URL}/hotels`)
            .then(response => response.json())
            .then(data => setHotels(data))
    }, [])

    return (
        <>
            <h1>Hotels</h1>
            {hotels.map((hotel) => (
                <div key={hotel.id}>
                    <p hidden={true}>{hotel.id}</p>
                    <p>Name: {hotel.name}</p>
                    <p>Address: {hotel.name}</p>
                    <hr/>
                </div>
            ))}
        </>
    )
}
import React from 'react';

// En komponent, der modtager 'name' og 'age' som props
const Person = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <div>
                {props.children}
            </div>
        </div>
    );
};

// Brug af Person-komponenten
const App = () => {
    return (
        <div>
            {/* Person-komponenten kaldes med name- og age-props */}
            <Person name="Jörg" age={30}>
                <p>Hej med dig</p>
            </Person>
            <Person name="Thomas" age={25}>
                <p>Hej med dig</p>
            </Person>
        </div>
    );
};

export default App;

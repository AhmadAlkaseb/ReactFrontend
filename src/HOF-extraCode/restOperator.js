
const person = {
    name: "Thomas",
    age: 28,
    gender: "male",
    language: "danish"
}


const{name, age, ...restProps} = person;

console.log(name);
console.log(age);
console.log(restProps);

console.log(restProps.gender)
console.log(restProps.language)


//rest operator opsamler givende data til array
function multiply(multiplier, ...numbers) {
    return numbers.map(number => number * multiplier);
}

const result = multiply(2, 1, 2, 3, 4, 5);
console.log(result);


function welcomeMsg(text, ...names) {
    return names.map(element => text + ', ' + element);
}

const messages = welcomeMsg("Welcome to my APP", "Thomas", "Jörg");
messages.forEach(message => console.log(message))
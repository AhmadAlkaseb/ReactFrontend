// Global scope
var globalVar = "Dette er em global variabel";


function exampleGlobal() {
    console.log(globalVar); // Kan tilgå udenfor funktionen
}

exampleGlobal(); // Output: "Dette er em global variabel"



// Local scope
function exampleLocale() {
    // Local scope variable
    var localVar = "Dette er em lokal variabel";
    console.log(localVar); // Kan kun tilgå inde i funktionen
}

exampleLocale(); // Output: "Dette er em lokal variabel"
console.log(localVar); // localVar is not defined





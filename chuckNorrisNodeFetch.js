const fetch = require('node-fetch');
const categories = ["animal","career","celebrity","dev","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];

let randomIndexCategory = Math.floor(Math.random() * 14);
let category = categories[randomIndexCategory];


fetch(`https://api.chucknorris.io/jokes/search?query=${category}`)
.then(response => response.json())
.then(jsonResponse => {
    jsonResponse.result.forEach(itm => { 
        console.log(itm.value);
    });   
});

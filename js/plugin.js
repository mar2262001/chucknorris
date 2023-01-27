let categories = ["animal","career","celebrity","dev","fashion","food","history","money","movie","music","political","religion","science","sport","travel"];

let findJokersForCategory = function (ulElemet){  
    let randomIndexCategory = Math.floor(Math.random() * 14);
    let category = categories[randomIndexCategory];
    ulElemet.empty()
    $.get(`https://api.chucknorris.io/jokes/search?query=${category}`, (response) => {
        response.result.forEach(itm => { 
            let newLi = $('<li/>', {
                'html' : itm.value,
                'class' : 'list-group-item',
            });
            ulElemet.append(newLi)
        });
    })    
}

$.fn.getRandomJokes = function() {
    findJokersForCategory(this);
};

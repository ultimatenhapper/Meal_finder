console.log("www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata");
const searchURL = "www.themealdb.com/api/json/v1/1/search.php?s=";

const term = document.getElementById('search');
const form = document.getElementById('submit');

function searchTerm(e) {
    e.preventDefault();
    console.log('Term: ', term);
    if (term.value) {
        fetch(`${searchURL}${term}`)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
    }
}

form.addEventListener('submit', searchTerm);

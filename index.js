const searchMealURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const searchMealByIdURL =
  "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
const searchRandomMealURL =
  "https://www.themealdb.com/api/json/v1/1/random.php";

const search = document.getElementById("search");
const submit = document.getElementById("submit");
const random = document.getElementById("random");
const resultsHeading = document.getElementById("results-heading");
const mealsEl = document.getElementById("meals");
const singleMealEl = document.getElementById("single-meal");

function getMealById(mealId) {
  fetch(`${searchMealByIdURL}${mealId}`)
    .then((response) => response.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
    .catch((err) => console.log(err));
}

function getRandomMeal() {
  mealsEl.innerHTML = '';
  resultsHeading.innerHTML = '';

  
  fetch(searchRandomMealURL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
    .catch((err) => console.error(err));
}

function addMealToDOM(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else break;
  }

  singleMealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""} 
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ""} 
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map((ing) => `<li>${ing}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function searchTerm(e) {
  e.preventDefault();
  meals.innerHTML = "";
  const term = search.value;

  console.log("Term to search: ", term);

  if (term.trim()) {
    fetch(`${searchMealURL}${term}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        resultsHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;

        if (data.meals === null) {
          resultsHeading.innerHTML = `<p>There are no search results. Try again!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
                <div class="meal">
                    <img src="${meal.strMealThumb}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                      <h3>${meal.strMeal}</h3>
                    </div>
                </div>
            `
            )
            .join("");
        }

        search.value = "";
      })
      .catch((err) => console.log(err));
  }
}

submit.addEventListener("submit", searchTerm);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealId = mealInfo.getAttribute("data-mealId");
    getMealById(mealId);
  }
});
random.addEventListener("click", getRandomMeal);

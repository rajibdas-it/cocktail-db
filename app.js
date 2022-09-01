const loadCocktail = () => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCocktail(data.drinks));
};

const displayCocktail = (cocktails) => {
  //   console.log(cocktails);
  const showCocktail = document.getElementById("show-cocktail");
  cocktails.forEach((cocktail) => {
    const cocktailDiv = document.createElement("div");
    cocktailDiv.classList.add("col");
    cocktailDiv.innerHTML = `
    <div class="card h-100">
        <img src=${cocktail.strDrinkThumb} class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${cocktail.strDrink}</h5>
            <p class="card-text">
                ${cocktail.strInstructions.slice(0, 30)}...
            </p>
            <a href="#" onclick="itemDetails('${
              cocktail.idDrink
            }')" class="btn btn-dark">See More</a>
        </div>
    </div>
    
    `;
    showCocktail.appendChild(cocktailDiv);
  });
};

const itemDetails = (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  //   console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayItem(data.drinks[0]));
};

const displayItem = (item) => {
  console.log(item);
};

loadCocktail();

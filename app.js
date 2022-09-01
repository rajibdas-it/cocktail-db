const loadCocktail = (searchValue) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`;
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCocktail(data.drinks));
};

const displayCocktail = (cocktails) => {
  //   console.log(cocktails);
  const showCocktail = document.getElementById("show-cocktail");
  showCocktail.innerHTML = "";

  cocktails.forEach((cocktail) => {
    const cocktailDiv = document.createElement("div");
    cocktailDiv.classList.add("col");
    cocktailDiv.innerHTML = `
    <div class="card h-100">
        <img src=${cocktail.strDrinkThumb} class="card-img-top" alt="..." />
        <div class="card-body">
            <h5 class="card-title">${
              cocktail.strDrink.length > 20
                ? cocktail.strDrink.slice(0, 20) + "..."
                : cocktail.strDrink
            }</h5>
            <p class="card-text">
                ${cocktail.strInstructions.slice(0, 30)}...
            </p>
          <button onclick="itemDetails('${
            cocktail.idDrink
          }')" style="background-color: #230312" type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">
              See Details
          </button>
        </div>
    </div>
    
    `;
    showCocktail.appendChild(cocktailDiv);
  });
};

const searchString = () => {
  const searchField = document.getElementById("search-field");
  const searchValue = searchField.value;
  loadCocktail(searchValue);
  searchField.value = "";
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
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = item.strDrink;
  const modalBody = document.getElementById("modal-body");
  const modalFooter = document.getElementById("modal-footer");
  modalBody.innerHTML = `
        <div class="row">
          <div class="col-10 mx-auto w-100">
            <img src=${
              item.strDrinkThumb ? item.strDrinkThumb : "No Image"
            } class="img-fluid rounded" alt="" />
          </div>
          <h1 class="mt-3">${item.strDrink}</h1>
          <p><small>${item.strCategory}</small>,    <small>${
    item.strArea ? item.strArea : "Unknown"
  }</small></p>
          <p class="text-start">${item.strInstructions}</p>
          </div>
  
  `;
  // modalFooter.innerHTML = `
  //   <button
  //       type="button"
  //       class="btn btn-secondary"
  //       data-bs-dismiss="modal"
  //     >
  //       Close
  // </button>
  // <button
  //     href="${
  //       item.strVideo
  //         ? item.strVideo
  //         : alert("No Receipe found with this link.")
  //     }"
  //       style="background-color: #230312"
  //       type="button"
  //       class="btn btn-dark"
  //     >
  //       Show Receipe
  // </button>
};

loadCocktail("a");

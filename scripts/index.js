import {recipes} from "../data/recipes.js";
import { showPlats } from "./factories/plats.js";
import {allFilters} from "./utils/filters.js";
import { normalizeString } from "./utils/nom.js";



/* importation elements des filtres*/
/* la fonction qui affiche les éléments de chaque couleur */ 
function loadFilters(recipes) {
        const { allIngredients, allAppareils, allUstensils } = allFilters(recipes);
        const ingredientsBlock = document.querySelector("#ingredients-list");
        const appareilsBlock = document.querySelector("#appareils-list");
        const ustensilsBlock = document.querySelector("#ustensils-list");
        
      
        allIngredients.forEach((ingredient) => {
          ingredientsBlock.innerHTML += `<li role="option" class="ingredients-option">${ingredient}</li>`;
        });
      
        allAppareils.forEach((appareil) => {
          appareilsBlock.innerHTML += `<li role="option" class="appareils-option">${appareil}</li>`;
        });

        allUstensils.forEach((utensils) => {
          ustensilsBlock.innerHTML += `<li role="option" class="ustensils-option">${utensils}</li>`;
        });
      
};


const searchBar = document.getElementById("chercher");
const recipeSection = document.getElementById("plats");

/*
 1- Algorithme  Barre de recherche principale, recherche de correspondances
  d'abord dans les titres puis dans la description
 */
 function searchBarResults(recipes) {
        searchBar.addEventListener("keyup", function (e) {
          /* Normalisez le texte écrit afin qu'il ne distingue pas les accents ou
          caractères spéciaux */
          const inputValue = normalizeString(e.target.value);
      
          // Si el texto ingresado en la barra de busqueda tiene 3 o mas caracteres
          // se ejecuta la búsqueda primero en los ingredientes y luego en la descripcion
          if (inputValue.length > 2) {
            const matchedRecipes = recipes.filter((recipe) => {
              return (
                // el metodo includes() verifica si el texto del campo de busqueda
                // se encuentra los ingredientes o la descripcion de la receta
                normalizeString(recipe.name).includes(inputValue) ||
                recipe.ingredients.some((i) =>
                  normalizeString(i.ingredient).includes(inputValue)
                ) ||
                normalizeString(recipe.description).includes(inputValue)
              );
            });
      
            // se limpia la seccion de platos para renderizar nuevamente los
            // resultados de la busqueda
            recipeSection.innerHTML = "";
      
            // si no hay resultados de busqueda se muestra una carita triste
            if (matchedRecipes.length === 0) {
              recipeSection.innerHTML = `<div id="nomatch">
              <img src="./medias/sad-face-gray.svg" alt="" />
              <p>Cette recherche n'a renvoyé aucune correspondance.</p>
            </div>`;
            }
            // de lo contrario se muestran los platos que coinciden con la
            // busqueda
            else {
              showPlats(matchedRecipes);
            }
          }
          // si lo que se escribió no tiene al menos 3 caracteres entonces
          // se muestran todos los platos
          else {
            recipeSection.innerHTML = "";
            showPlats(recipes);
          }
        });
      }
      

/* algorithme de filtrage */
const selectedFilter = document.getElementById("selected-filter");

// Listes de filtres de recherche
const ingredientsFilter = [];
const appareilsFilter = [];
const ustensilsFilter = [];


/* 2- Algorithme de sélection d'un des 3 éléments */

/*2-1 : la fonction qui permet de sélectionner un élément au clic ou en le tapant */

function selectionFilter() {
  // desestructuracion de las listas de ingredients, appareils y ustensils
  const { allIngredients, allAppareils, allUstensils } = allFilters(recipes);

  // seleccion de elementos del dom para su modificacion
  const ingredientsBlock = document.querySelector("#ingredients-list");
  const appareilsBlock = document.querySelector("#appareils-list");
  const ustensilsBlock = document.querySelector("#ustensils-list");

  const searchIngredients = document.getElementById("search-ingredients");
  const searchAppareils = document.getElementById("search-appareils");
  const searchUstensils = document.getElementById("search-ustensiles");

  // lors du démarrage de la section des filtres appliqués, elle doit être vide
  selectedFilter.innerHTML = "";

  // événements lors de l'écriture dans l'entrée de sélection de filtres
  searchIngredients.addEventListener("keyup", typeMatchIngredient);
  searchUstensils.addEventListener("keyup", typeMatchUstensils);
  searchAppareils.addEventListener("keyup", typeMatchAppapareil);

  // événements lors d'un clic sur un élément ingredient, appareils o ustensils
  ingredientsBlock.addEventListener("click", ingredientSelection);
  appareilsBlock.addEventListener("click", appareilSelection);
  ustensilsBlock.addEventListener("click", ustensilSelection);

  // Fonctions exécutées dans les événements:
  /* Cette fonction recharge la liste des ingrédients avec ceux qui correspondent
   à ce qui a été écrit par l'utilisateur dans l'entrée  @param {evento click} e */

  function typeMatchIngredient(e) {
    e.preventDefault();
    const inputValue = normalizeString(e.target.value);

    const matchedIngredients = allIngredients.filter((ingredient) => {
      return normalizeString(ingredient).includes(inputValue);
    });
    ingredientsBlock.innerHTML = "";
    matchedIngredients.forEach((ingredient) => {
      ingredientsBlock.innerHTML += `<li role="option" class="ingredients-option">${ingredient}</li>`;
    });
  }

  /**
   * Esta función recarga la lista de ustensils con aquellos que coinciden
   * con lo escrito en el input
   * @param {evento click} e
   */
  function typeMatchUstensils(e) {
    e.preventDefault();
    const inputValue = normalizeString(e.target.value);

    const matchedUstensils = allUstensils.filter((ustensil) => {
      return normalizeString(ustensil).includes(inputValue);
    });
  
    ustensilsBlock.innerHTML = "";
    matchedUstensils.forEach((ustensil) => {
      ustensilsBlock.innerHTML += `<li role="option" class="appareils-option">${ustensil}</li>`;
    });
  }

  /**
   * Esta función recarga la lista de appareils con aquellos que coinciden
   * con lo escrito en el input
   * @param {evento click} e
   */
  function typeMatchAppapareil(e) {
    e.preventDefault();
    const inputValue = normalizeString(e.target.value);

    const matchedAppareils = allAppareils.filter((ingredient) => {
      return normalizeString(ingredient).includes(inputValue);
    });
    appareilsBlock.innerHTML = "";
    matchedAppareils.forEach((appareil) => {
      appareilsBlock.innerHTML += `<li role="option" class="appareils-option">${appareil}</li>`;
    });
  }

  /**
   * Esta función inserta una etiqueta en la sección de filtros y renderiza los
   * resultados del filtro en la sección de platos
   * @param {evento click} e
   */
  function ingredientSelection(e) {
    const ingredient = e.target.innerText;

    if (e.target.classList[0] === "ingredients-option") {
      //si el ingredient seleccionado no está en la lista entonces lo agrega
      if (!ingredientsFilter.includes(ingredient)) {
        ingredientsFilter.push(ingredient);
        // inserta una etiqueta de filtro en el HTML
        selectedFilter.innerHTML += `<div class="ing"><span>${ingredient}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // renderizar las coincidencias nuevamente
        renderAfterFilter();
        closeFilter();
      }
    }
  }

  function appareilSelection(e) {
    const appareils = e.target.innerText;
    if (e.target.classList[0] === "appareils-option") {
      //si el appliance seleccionado no está en la lista entonces lo agrega
      if (!appareilsFilter.includes(appareils)) {
        appareilsFilter.push(appareils);
        // inserta una etiqueta de filtro en el HTML
        selectedFilter.innerHTML += `<div class="app"><span>${appareils}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // renderizar las coincidencias nuevamente
        renderAfterFilter();
        closeFilter();
      }
    }
  }

  function ustensilSelection(e) {
    const ustensil = e.target.innerText;
    if (e.target.classList[0] === "ustensils-option") {
      //si el ustensil seleccionado no está en la lista entonces lo agrega
      if (!ustensilsFilter.includes(ustensil)) {
        ustensilsFilter.push(ustensil);
        // inserta una etiqueta de filtro en el HTML
        selectedFilter.innerHTML += `<div class="ute"><span>${ustensil}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // renderizar las coincidencias nuevamente
        renderAfterFilter();
        closeFilter();
      }
    }
  }
}

/*
 2-2: Rendre les plats en fonction des combinaisons de filtres définies
 */
 function renderAfterFilter() {
  // cada vez que se renderizan resultados de busqueda se limpia la barra
  searchBar.value = "";

  // 3 filtros: ingredients, appareils y ustensils
  let matchedRecipes;
  if (
    ingredientsFilter.length > 0 &&
    appareilsFilter.length > 0 &&
    ustensilsFilter.length > 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return (
        recipe.ingredients.some((i) =>
          ingredientsFilter.includes(i.ingredient)
        ) &&
        appareilsFilter.includes(recipe.appliance) &&
        recipe.ustensils.some((ustensil) => ustensilsFilter.includes(ustensil))
      );
    });
    console.log(matchedRecipes);
  }

  // 2 filtros: Ingredients y appareils
  else if (
    ingredientsFilter.length > 0 &&
    appareilsFilter.length > 0 &&
    ustensilsFilter.length == 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return (
        recipe.ingredients.some((i) =>
          ingredientsFilter.includes(i.ingredient)
        ) && appareilsFilter.includes(recipe.appliance)
      );
    });
    console.log(matchedRecipes);
  }

  // 2 filtros: Ingredients y ustensils
  else if (
    ingredientsFilter.length > 0 &&
    appareilsFilter.length == 0 &&
    ustensilsFilter.length > 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return (
        recipe.ingredients.some((i) =>
          ingredientsFilter.includes(i.ingredient)
        ) &&
        recipe.ustensils.some((ustensil) => ustensilsFilter.includes(ustensil))
      );
    });
    console.log(matchedRecipes);
  }

  // 2 filtros: appareils y ustensils
  else if (
    ingredientsFilter.length == 0 &&
    appareilsFilter.length > 0 &&
    ustensilsFilter.length > 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return (
        appareilsFilter.includes(recipe.appliance) &&
        recipe.ustensils.some((ustensil) => ustensilsFilter.includes(ustensil))
      );
    });
    console.log("coincidencias:", matchedRecipes.length);
  }

  // Solo filtro de ingredientes
  else if (
    ingredientsFilter.length > 0 &&
    appareilsFilter.length == 0 &&
    ustensilsFilter.length == 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return recipe.ingredients.some((i) =>
        ingredientsFilter.includes(i.ingredient)
      );
    });
    console.log("Coincidencias:", matchedRecipes.length);
  }

  // Solo filtro de appareils
  else if (
    ingredientsFilter.length == 0 &&
    appareilsFilter.length > 0 &&
    ustensilsFilter.length == 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return appareilsFilter.includes(recipe.appliance);
    });
    console.log("coincidencias:", matchedRecipes.length);
  }

  // Solo filtro de ustensils
  else if (
    ingredientsFilter.length == 0 &&
    appareilsFilter.length == 0 &&
    ustensilsFilter.length > 0
  ) {
    matchedRecipes = recipes.filter((recipe) => {
      return recipe.ustensils.some((ustensil) =>
        ustensilsFilter.includes(ustensil)
      );
    });
    console.log("coincidencias:", matchedRecipes.length);
  }

  // Si no hay ningun filtro de muestra todos los platos
  // y retorna void
  else {
    showPlats(recipes);
    // if (document.querySelector(".matchs")) {
    //   document.querySelector(".matchs").remove();
    // }
    return;
  }

  // limpia la seccion de platos antes de mostrar los nuevos resulados
  recipeSection.innerHTML = "";

  // Si
  if (matchedRecipes.length > 0) {
    showPlats(matchedRecipes);
    // setTimeout(() => {
    //   matchMessage(matchedRecipes);
    // }, 100);
  }

  // si no hay resultados de la busqueda se muestra una carita triste
  else {
    recipeSection.innerHTML = `<div id="nomatch">
        <img src="./medias/sad-face-gray.svg" alt="" />
        <p>Cette recherche n'a renvoyé aucune correspondance.</p>
      </div>`;
    //document.querySelector(".matchs").remove();
  }
}


/**
 * 2-3: Elimina un filtro aplicado al cerrar la etiqueta seleccionada */
 function closeFilter() {
  // icono (x) al hacer click se cierra el filtro
  const cross = document.querySelectorAll(".fa-circle-xmark");

  // por cada icono se crea el evento click que cierra el filtro
  // y elimina la etiqueta
  cross.forEach((el) =>
    el.addEventListener("click", (event) => {
      const clase = event.target.parentElement.classList[0];
      console.log(clase);

      // segun sea el caso de la clase obtenida al cerrar la
      // etiqueta de filtro se ejecuta alguna de las
      // siguientes acciones
      switch (clase) {
        // caso en el que la etiqueta cerrada era un ingredient
        case "ing":
          const ingredient = event.target.previousSibling.innerText;
          ingredientsFilter.splice(ingredientsFilter.indexOf(ingredient), 1);
          event.target.parentElement.remove();
          renderAfterFilter();
          break;

        // caso en el que la etiqueta cerrada era un appareils
        case "app":
          const appareils = event.target.previousSibling.innerText;
          appareilsFilter.splice(appareilsFilter.indexOf(appareils), 1);
          event.target.parentElement.remove();
          renderAfterFilter();
          break;

        // caso por defecto: si no se cerró un ingredient ni un appareils
        // entonces era un ustensil
        default:
          const ustensil = event.target.previousSibling.innerText;
          ustensilsFilter.splice(appareilsFilter.indexOf(ustensil), 1);
          event.target.parentElement.remove();
          renderAfterFilter();
          break;
      }
    })
  );
}


/* la fonction d'entrée à l'application */
      window.addEventListener("load", (e) => {
        loadFilters(recipes);
        showPlats(recipes);
        searchBarResults(recipes);
        selectionFilter();
        closeFilter()
});    


/*  */

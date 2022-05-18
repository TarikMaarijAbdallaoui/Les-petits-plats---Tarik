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

function selectionFilter() {
  // desestructuracion de las listas de ingredients, appliance y ustensils
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

  // événements lors d'un clic sur un élément ingredient, appliance o ustensils
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
      ustensilsBlock.innerHTML += `<li role="option" class="appliances-option">${ustensil}</li>`;
    });
  }

  /**
   * Esta función recarga la lista de appliances con aquellos que coinciden
   * con lo escrito en el input
   * @param {evento click} e
   */
  function typeMatchAppapareil(e) {
    e.preventDefault();
    const inputValue = normalizeString(e.target.value);

    const matchedAppliance = allAppareils.filter((ingredient) => {
      return normalizeString(ingredient).includes(inputValue);
    });
    appareilsBlock.innerHTML = "";
    matchedAppliance.forEach((appliance) => {
      appareilsBlock.innerHTML += `<li role="option" class="appliances-option">${appliance}</li>`;
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
    const appliance = e.target.innerText;
    if (e.target.classList[0] === "appliances-option") {
      //si el appliance seleccionado no está en la lista entonces lo agrega
      if (!appareilsFilter.includes(appliance)) {
        appareilsFilter.push(appliance);
        // inserta una etiqueta de filtro en el HTML
        selectedFilter.innerHTML += `<div class="app"><span>${appliance}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
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



/* la fonction d'entrée à l'application */
      window.addEventListener("load", (e) => {
        loadFilters(recipes);
        showPlats(recipes);
        searchBarResults(recipes);
        selectionFilter();
});    


/*  */

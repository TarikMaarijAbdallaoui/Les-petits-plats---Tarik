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
      
          // Si le texte saisi dans la barre de recherche comporte 3 caractères ou plus
          // la recherche s'effectue d'abord dans les ingrédients puis dans la description
          if (inputValue.length > 2) {
            const matchedRecipes = recipes.filter((recipe) => {
              return (
                // la méthode includes() vérifie si le texte du champ de recherche contient
                // les ingrédients ou la description de la recette
                normalizeString(recipe.name).includes(inputValue) ||
                recipe.ingredients.some((i) =>
                  normalizeString(i.ingredient).includes(inputValue)
                ) ||
                normalizeString(recipe.description).includes(inputValue)
              );
            });
      
            // la section des plats est vidée pour restituer les résultats de la recherche
            recipeSection.innerHTML = "";
      
            // s'il n'y a pas de résultats de recherche, un visage triste s'affiche
            if (matchedRecipes.length === 0) {
              recipeSection.innerHTML = `<div id="nomatch">
              <img src="./medias/sad-face-gray.svg" alt="" />
              <p>Cette recherche n'a renvoyé aucune correspondance.</p>
            </div>`;
            }
            //sinon les plats qui correspondent à la recherche sont affichés
            else {
              showPlats(matchedRecipes);
            }
          }
          //si ce qui a été écrit n'a pas au moins 3 caractères alors
          // tous les plats sont affichés
          else {
            recipeSection.innerHTML = "";
            showPlats(recipes);
          }
        });
      }
      
const selectedFilter = document.getElementById("selected-filter");

// Listes de filtres de recherche
const ingredientsFilter = [];
const appareilsFilter = [];
const ustensilsFilter = [];


/* 2- Algorithme de sélection d'un des 3 éléments */

/*2-1 : la fonction qui permet de sélectionner un élément au clic ou en le tapant */

function selectionFilter() {
  // déstructuration des listes de ingredients, appareils y ustensils
  const { allIngredients, allAppareils, allUstensils } = allFilters(recipes);

  // sélection d'éléments dom pour les modifier
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
   * Cette fonction recharge la liste des ustensils avec ceux qui correspondent
   à ce qui a été écrit par l'utilisateur dans l'entrée
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
   * Cette fonction recharge la liste dese appareils avec ceux qui correspondent
   à ce qui a été écrit par l'utilisateur dans l'entrée
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
   * Cette fonction insère une étiquette dans la section des filtres et afficher
    les résultats du filtre dans la section des ponts
   * @param {evento click} e
   */
  function ingredientSelection(e) {
    const ingredient = e.target.innerText;

    if (e.target.classList[0] === "ingredients-option") {
      // si l'ingrédient sélectionné n'est pas dans la liste alors elle l'ajoute
      if (!ingredientsFilter.includes(ingredient)) {
        ingredientsFilter.push(ingredient);
        // insérer une balise de filtre dans le HTML
        selectedFilter.innerHTML += `<div class="ing"><span>${ingredient}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // affiche de nouveau les coïncidences 
        renderAfterFilter();
        closeFilter();
      }
    }
  }

  function appareilSelection(e) {
    const appareils = e.target.innerText;
    if (e.target.classList[0] === "appareils-option") {
      //si l'appareil sélectionné n'est pas dans la liste alors elle l'ajoute
      if (!appareilsFilter.includes(appareils)) {
        appareilsFilter.push(appareils);
        // insérer une balise de filtre dans le HTML
        selectedFilter.innerHTML += `<div class="app"><span>${appareils}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // affiche de nouveau les coïncidences
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
        // insérer une balise de filtre dans le HTML
        selectedFilter.innerHTML += `<div class="ute"><span>${ustensil}</span><i class="fa-regular fa-circle-xmark"></i></div>`;
        // affiche de nouveau les coïncidences
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
  // chaque fois que les résultats de la recherche sont rendus, la barre est effacée
  searchBar.value = "";

  // 3 filtres: ingredients, appareils y ustensils
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

  // 2 filtres: Ingredients y appareils
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

  // 2 filtres: Ingredients y ustensils
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

  // 2 filtres: appareils y ustensils
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

  // 1 seul filtre des ingredientes
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

  // 1 seul filtre de appareils
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

  // 1 seul filtre de ustensils
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

  // S'il n'y a pas de filtre, tous les plats sont affichés
  else {
    showPlats(recipes);
    return;
  }

  // vider la section plats avant d'afficher les nouveaux résultats
  recipeSection.innerHTML = "";

  // Si
  if (matchedRecipes.length > 0) {
    showPlats(matchedRecipes);
  }

  // s'il n'y a pas de résultats de recherche, un visage triste s'affiche
  else {
    recipeSection.innerHTML = `<div id="nomatch">
        <img src="./medias/sad-face-gray.svg" alt="" />
        <p>Cette recherche n'a renvoyé aucune correspondance.</p>
      </div>`;
  }
}


/**
 * 2-3: Supprime un filtre appliqué en fermant la balise sélectionnée */
 function closeFilter() {
  // l'icône (x) lorsqu'il est cliqué ferme le filtre
  const cross = document.querySelectorAll(".fa-circle-xmark");

  // pour chaque icône, l'événement de clic est créé qui ferme le filtre
  // et cela supprime la balise
  cross.forEach((el) =>
    el.addEventListener("click", (event) => {
      const clase = event.target.parentElement.classList[0];
      console.log(clase);

      /* selon le cas de la classe obtenue en fermant la balise du filtre
       une des actions suivantes sera exécutée */
      switch (clase) {
        // cas où l'étiquette fermée était un ingrédient
        case "ing":
          const ingredient = event.target.previousSibling.innerText;
          ingredientsFilter.splice(ingredientsFilter.indexOf(ingredient), 1);
          event.target.parentElement.remove();
          renderAfterFilter();
          break;

        // cas où l'étiquette fermée était un appareils
        case "app":
          const appareils = event.target.previousSibling.innerText;
          appareilsFilter.splice(appareilsFilter.indexOf(appareils), 1);
          event.target.parentElement.remove();
          renderAfterFilter();
          break;

        // cas par défaut: si ce qui était fermé n'était pas un ingrédient ni un appareils
        // alors c'était un ustensile
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


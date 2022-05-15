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

/**
  Barre de recherche principale, recherche de correspondances
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
              document.querySelector(".matchs").remove();
            }
            // de lo contrario se muestran los platos que coinciden con la
            // busqueda
            else {
              showPlats(matchedRecipes);
              //matchMessage(matchedRecipes);
            }
          }
          // si lo que se escribió no tiene al menos 3 caracteres entonces
          // se muestran todos los platos
          else {
            //document.querySelector(".matchs").remove();
            recipeSection.innerHTML = "";
            showPlats(recipes);
          }
        });
      }
      
/* la fonction d'entrée à l'application */
      window.addEventListener("load", (e) => {
        loadFilters(recipes);
        showPlats(recipes);
        searchBarResults(recipes);
});    


/*  */

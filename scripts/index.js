import {recipes} from "../data/recipes.js";
import { showPlats } from "./factories/plats.js";
import {allFilters} from "./utils/filters.js";


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
      
      }
      

      window.addEventListener("load", (e) => {
        loadFilters(recipes);
        showPlats(recipes);
});      

/* c´est la fonction qui classifie les éléments du json original selon leur type*/

export const allFilters = (recipes) => {
        let allIngredients = [];
        let allAppareils = [];
        let allUstensils = [];
      
        recipes.forEach((recipe) => {
          allIngredients = [
            ...new Set([
              ...allIngredients,
              ...recipe.ingredients.map((i) => i.ingredient),
            ]),
          ];
         
          allAppareils = [...new Set([...allAppareils, ...[recipe.appliance]])];

          allUstensils = [
            ...new Set([...allUstensils, ...recipe.ustensils.map((u) => u)])];
        });
      
        allIngredients = allIngredients.sort();
        allAppareils = allAppareils.sort();
        allUstensils = allUstensils.sort();
      
        return { allIngredients, allAppareils, allUstensils };
      };
      
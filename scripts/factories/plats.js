function getIngedients (ingredientsList) {
        let list = "";
        ingredientsList.forEach((item) => {
                list += `<li><strong>${item.ingredient}</strong>${
                        item.quantity || item.quantite
                        ? ": " + (item.quantity || item.quantite)
                        : ""
                } ${item.unit ? item.unit : ""}</li>`;
        });
        
        return list;
}
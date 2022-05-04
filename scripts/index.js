import {recipes} from "../data/recipes.js";
import { showPlats } from "./factories/plats.js";

window.addEventListener("load", (e) => {
        showPlats(recipes);
});

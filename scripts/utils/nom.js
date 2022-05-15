/*
 Reçoit une chaîne et la renvoie normalisée afin qu'elle ne distingue pas les caractères spéciaux
*/
 export const normalizeString = (string) => {
        string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        // convertir la chaîne en minuscule
        string = string.toLowerCase();
      
        // les voyelles sont remplacées par une ligature
        string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
      
        return string;
      };
      
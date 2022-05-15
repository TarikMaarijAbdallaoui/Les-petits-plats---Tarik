

const tagLabel = document.querySelectorAll(".tag-label");

tagLabel.forEach((label) => {
  const tagInput = label.parentNode.children[1];

  label.addEventListener("click", (event) => {
    event.preventDefault();
    const tagBox = event.target.parentNode.parentNode;
    console.log(tagBox);
    label.style.display = "none";
    tagBox.classList.add("open");
    tagInput.setAttribute("placeholder", "Rechercher");
    tagInput.style.display = "block";
    tagInput.style.width = "40rem";
  });
});
// récupération id dans url
let params = new URL(document.location).searchParams;
let id = params.get("id");
//Récupération des éléments parents et des éléments à modifier
let imgItem = document.querySelector(".item__img");
let title = document.getElementById("title");
let description = document.getElementById("description");
let prixProduit = document.getElementById("price");
let selecteur = document.getElementById("color");
let selectionCouleur = document.getElementById("colors");


let quantitySelection = document.getElementById("quantity");
let ZoneBouton = document.getElementById("item__content__addButton");

main();

function main() {
    getArticles();
    addToCart();
}

function getArticles(){
    fetch("http://localhost:3000/api/products/"+id)
    .then(function (response) {
      return response.json();
    })

    .then(function (resultatAPI) {
        const articles = resultatAPI;
       console.log(articles);
     
       // Boucle qui se répète une fois 
        for ( let i=0; i<1; i++){

            //création balise img et définition du parents, du alt et du src
            let imgProduit = document.createElement("img");
            imgItem.appendChild(imgProduit);
            imgProduit.src = articles.imageUrl;
            imgProduit.alt = articles.altTxt;
            //Modification balise h1 avec le nom produit
            title.innerHTML = articles.name;
            //Modification du span price avec prix produit
            prixProduit.innerHTML = articles.price;
            //Modification du p description avec description produit 
            description.innerHTML = articles.description;
            //Variable contenant largeur array colors
            let tableauCouleur = articles.colors.length;
            //Boucle de création des option de couleurs
            for (let i = 0; i< tableauCouleur; i++){
                let option = document.createElement("option");
                option.innerHTML = articles.colors[i];
                selectionCouleur.appendChild(option);
            }
            



        }
})};

function addToCart() {
    const AjoutPanier = document.getElementById(".addToCart");
   
    AjoutPanier.addEventListener("click", function(event)  {
        event.preventDefault();
      if (quantitySelection.value > 0 && quantitySelection.value < 100) {
        // ------ Création du produit qui sera ajouté au panier
        let productAdded = {
          name: title.innerHTML,
          price: parseFloat(prixProduit.innerHTML),
          quantity: parseFloat(document.getElementById("quantity").value),
          _id: id,
        };

        let arrayProduitPanier = [];
      
      // Si le localStorage existe, on récupère son contenu, on l'insère dans le tableau , puis on le renvoit vers le localStorage avec le nouveau produit ajouté.
      if (localStorage.getItem("products") !== null) {
        arrayProduitPanier = JSON.parse(localStorage.getItem("products"));
        
      }
        // Si le LS est vide, on le crée avec le produit ajouté
     
        arrayProduitPanier.push(productAdded);
        localStorage.setItem("products", JSON.stringify(arrayProduitPanier));
      

        let TextConfirmation = document.createElement("p")
        ZoneBouton.appendChild(TextConfirmation);
        TextConfirmation.innerHTML = "Vous avez ajouté ${AjoutPanier.value} Kanap à votre panier";
    } 
  });
}

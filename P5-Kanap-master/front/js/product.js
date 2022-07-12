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
const AjoutPanier = document.getElementById("addToCart");

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
            imgProduit.src = articles.imageUrl;
            imgProduit.alt = articles.altTxt;
            imgItem.appendChild(imgProduit);
            //Modification balise h1 avec le nom produit
            title.textContent = articles.name;
            //Modification du span price avec prix produit
            prixProduit.textContent = articles.price;
            //Modification du p description avec description produit 
            description.textContent = articles.description;
            //Variable contenant largeur array colors


            let tableauCouleur = articles.colors.length;
            //Boucle de création des option de couleurs
            for (let i = 0; i< tableauCouleur; i++){
                let option = document.createElement("option");
                option.textContent = articles.colors[i];
                option.setAttribute("value", articles.colors[i]);
                selectionCouleur.appendChild(option);
            }
        }
})};

function addToCart() {
  //Tableau ItemPanier contenant Item
let ItemPanier = {'Item':[]}

//On écoute l'évènement click sur AjoutPanier, au click, on éxecute les commandes si dessous 
AjoutPanier.addEventListener("click", function(event){
  event.preventDefault();

//Récup couleur et quantité sélectionné
const Couleurselec = document.getElementById("colors").value
const QuantitySelec = document.getElementById("quantity").value

// Vérif Quantité sélectionné =0; affichange message érreur 
if (QuantitySelec === "0") {
  console.log("La quantité doit être supérieur à 0");
  // Vérif si quantité et couleur sélec. sont déja dans le tableau
} else if ((ItemPanier.Item.find(item => item.id === id && item.color === Couleurselec))) {
  console.log(ItemPanier);
  //Trouve l'index de id et de color
  let itemIndex = ItemPanier.Item.findIndex(item => item.id === id && item.color === Couleurselec)

  console.log(itemIndex);
//Modif de la quantité
  const cartItemQuantity = +ItemPanier.Item[itemIndex].quantity
  const quantityToAdd = +QuantitySelec

  ItemPanier.Item[itemIndex].quantity = cartItemQuantity + quantityToAdd

  localStorage.setItem("ItemPanier", JSON.stringify(ItemPanier))

  // Sinon push dans le tableau 
} else {
  console.log(ItemPanier);
  ItemPanier.Item.push({"id" : id, "color" : Couleurselec, "quantity" : QuantitySelec})
  localStorage.setItem("ItemPanier", JSON.stringify(ItemPanier))
}

//Vérification si localstorage contient déja des données
if (typeof localStorage.ItemPanier !== "undefined"){
  const pushItems = JSON.parse(localStorage.getItem("ItemPanier"))
  let NbrItems = pushItems.Item.lenght -1

  // Si il y a des données, push dans le tableau ItemPanier
  for (let n=0; n<= NbrItems; n++){
    ItemPanier.Item.push({
      "id" : pushItems.Item[`${n}`].id,
      "color" : pushItems.Item[`${n}`].color,
      "quantity" : pushItems.Item[`${n}`].quantity
    })
  }
}



})}

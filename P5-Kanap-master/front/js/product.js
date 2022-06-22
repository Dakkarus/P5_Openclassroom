let params = new URL(document.location).searchParams;
let id = params.get("id");

let imgItem = document.querySelector(".item__img");
let title = document.getElementById("title");
let description = document.getElementById("description");
let prixProduit = document.getElementById("price");
let selecteur = document.getElementById("color");


main();

function main() {
    getArticles();
}

function getArticles(){
    fetch("http://localhost:3000/api/products/"+id)
    .then(function (response) {
      return response.json();
    })

    .then(function (resultatAPI) {
        const articles = resultatAPI;
       console.log(articles);
       
        for (let article in articles){

            let imgProduit = document.createElement("img");
            imgItem.appendChild(imgProduit);
            imgProduit.src = articles.imageUrl;
            imgProduit.alt = articles.altTxt;

            title.innerHTML = articles.name;

            prixProduit.innerHTML = articles.price;

            description.innerHTML = articles.description;

            let selectionCouleur = document.getElementById("colors");
            for (let i = 0; i< resultatAPI[article].colors.length; i++){
                let option = document.createElement("option");
                option.innerHTML = article.colors[i];
                selectionCouleur.appendChild(option);
            }
            



        }
})};
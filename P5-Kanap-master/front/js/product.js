

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
    fetch("http://localhost:3000/api/products/${id}")
    .then(function (response) {
      return response.json();
    })

    .then(function (resultatAPI) {
        const articles = resultatAPI;
       console.log(articles);
       
        for (let article in articles){



            title.innerHTML = article.name;

            prixProduit.innerHTML = article.prix;

            description.innerHTML = article.description;

            
            

        }

})};
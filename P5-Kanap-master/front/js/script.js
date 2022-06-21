main();

function main() {
  getArticles();
}

// Récupérer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      return res.json();
    })
    
    // Dispatcher les données de chaque produit (prix, nom...) dans le DOM
    .then(function (resultatAPI) {
      articles = resultatAPI;
      console.log(articles);

      for (let article in articles) {
        //Création d'une variable contenant la section de classe items
        let sectionCarte = document.getElementById("items");

        //Création du lien a dans section items
        let carteProduit = document.createElement("a");
        //definition de a commen enfant de items 
        sectionCarte.appendChild(carteProduit);

        var idProduit = resultatAPI[article]._id;
        console.log(idProduit);
        //ajout du href en lien avec l'api
        carteProduit.href = 'product.html?id=${"idProduit"}';
        

        //création balise article dans a
        let articleProduit = document.createElement("article");
        //Definition de article comme enfant de a
        carteProduit.appendChild(articleProduit);
        

        //création img dans article
        let imgProduit = document.createElement("img");
        //definition de img comme enfant de article
        articleProduit.appendChild(imgProduit);
        //ajout du src en lien avec .imageUrl 
        imgProduit.src = resultatAPI[article].imageUrl;
        //ajout du alt de l'image en lien avec .altTxt
        imgProduit.alt = resultatAPI[article].altTxt;


        //création h3 dans article
        let nomProduit = document.createElement("h3");
        //défition de h3 comme enfant de article
        articleProduit.appendChild(nomProduit);
        //ajout de la classe
        nomProduit.classList.add("productName");
        //ajout de .name dans innerhtml
        nomProduit.innerHTML = resultatAPI[article].name;


        //création du p dans article
        let descriptionProduit = document.createElement("p");
        //Définition de P comme enfant de article
        articleProduit.appendChild(descriptionProduit);
        //ajout de la classe
        descriptionProduit.classList.add("productDescription");
        //ajout de .description dans le innerHtml
        descriptionProduit.innerHTML = resultatAPI[article].description;

      }
    });
}








main();

function main(){

    AffichagePanier();


}

function AffichagePanier(){
    
    let copieLS = JSON.parse(localStorage.getItem("products"));

    console.log(copieLS);

    for (let articles in copieLS){

        let CartItems = document.getElementById("cart__items");
        let CartArticle = document.createElement("article");
        CartItems.appendChild(CartArticle);
        
     
        let CartImg = document.createElement("div");
       
        let ImgProduit = document.createElement("img");
        CartImg.appendChild(ImgProduit);
   
        ImgProduit.alt = copieLS.imageAlt;

        let CartContent = document.createElement("div");
        CartArticle.appendChild(CartContent);

        let CartDescription = document.createElement("div");
        CartContent.appendChild(CartDescription);

        let NomProduit = document.createElement("h2");
        CartDescription.appendChild(NomProduit);
        NomProduit.innerHTML = copieLS[articles].name;

        let CouleurProduit = document.createElement("p");
        CartDescription.appendChild(CouleurProduit);
        CouleurProduit.innerHTML = copieLS[articles].couleur;

        let PrixProduit = document.createElement("p");
        CartDescription.appendChild(PrixProduit);
        PrixProduit.innerHTML = copieLS[articles].price;

        let CartSettings = document.createElement("div");
        CartArticle.appendChild(CartSettings);

        let CartSettingsQuantity = document.createElement("div");
        CartSettings.appendChild(CartSettingsQuantity);

        let QuantitéProduit = document.createElement("p");
        CartSettingsQuantity.appendChild(QuantitéProduit);
        QuantitéProduit.innerHTML = copieLS[articles].quantity;

        let ItemQuantity = document.createElement("input");
        CartSettingsQuantity.appendChild(ItemQuantity);
        ItemQuantity.type = copieLS[articles].number;
        ItemQuantity.min = 1;
        ItemQuantity.max = 100;



        
    }
};
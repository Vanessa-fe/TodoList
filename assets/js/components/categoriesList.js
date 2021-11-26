//alert('category');

const categoriesList = {
  // la propriété categories est un tableau associatif vide 
  categoriesListing : {},


  loadCategoriesFromAPI : function(){
    // faire le fetch qui va consommer l'api de ben
    // convertir la réponse json brut en objet
    // afficher les categories dans le select dans le header
    const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/categories';

    //envoyer la requete
    fetch(url)
      .then(categoriesList.convertFromJson) // nous convertissons la réponse json en objet
      .then(categoriesList.registerCategoriesListing) // on enregistre les categories dans la propriété "categoriesListing"
      .then(categoriesList.displayCategoriesInHeader)
      .then(categoriesList.displayCategoriesInTaskForm);
     
  },

  convertFromJson: function(response){
    //alert('on est dans le then');
    // console.log(response.json());
    return response.json();
  },

  registerCategoriesListing: function(categoriesListing){
    //console.log(categoriesListing);

      for(let categoryData of categoriesListing){
        //console.log(categoryData);
        //nous enregistrons les catégories dans un tableau associatif
        // l'id des catégories servira d'index
        let categoryId = categoryData.id;
        categoriesList.categoriesListing[categoryId] = categoryData;
      }

    return categoriesListing; // ici categoriesListing n'a pas changé, mais le return me permet d'enchainer sur le then() suivant
  },

  //-------------------------------------------------------------
  // methodes couche "VIEW"
  //--------------------------------------------------------------
  displayCategoriesInHeader: function(categoriesListing){
    // cibler le select dans le header
    let selectElement = document.querySelector('select.filters__choice')
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
    return categoriesListing;
  },

  displayCategoriesInTaskForm: function(categoriesListing){
    //console.log(categoriesListing);
    // cibler le select dans le formulaire
    let selectElement = document.querySelector('.task--add select');
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
  },

  displayCategoriesInSelectElement: function(selectElement, categoriesListing){
    // pour chacune des categories, nous allons ajouter une option dans le select

    for(let categoryData of categoriesListing){
      // on crée un élément option
      let optionElement = document.createElement('option');
      // on le customize (on renseigne le nom de la categorie)
      optionElement.textContent = categoryData.name;
      optionElement.setAttribute('value', categoryData.id);
      // on injecte l'opption dans le select
      selectElement.appendChild(optionElement);
    }

  },

  //=========================================================
  // méthodes "Models"
  //=========================================================
  findById: function(categoryId){
    return categoriesList.categoriesListing[categoryId];
  },












}
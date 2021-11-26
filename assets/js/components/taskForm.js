//console.log('%c' + 'taskForm.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');
const taskForm = {

  addAllEventListeners: function(){
    // cibler le form
    let formElement = document.querySelector('.task--add form')
    // ajouter écouteur d'évenement sur "submit"
    formElement.addEventListener('submit', taskForm.handleFormSubmit);
  },

  handleFormSubmit: function(event){
    // empecher le comportement par défaut (envoie des datas/refresh de la page)
    event.preventDefault();
    // recupération du nom de la tache saisie par le user
    let taskNewNameElement = document.querySelector('.task__name-edit');
    //récupération de la valeur saisie par l'utilisateur
    let taskNewName = taskNewNameElement.value;

    let selectCategoriesElement = document.querySelector('.task__category select')
    let categoryId = selectCategoriesElement.value;

    //récupération des informations de la catégorie
    //let categoryData = categoriesList.findById(categoryId);

    taskForm.saveNewTaskIntoAPI(taskNewName, categoryId);

    //appel de la méthode permettant de créer le DOM pour une nouvelle tâche
    //let taskElement = task.createDOMElement(taskNewName, categoryName);
    // appel de la méthode qui permet d'ajouter la tache dans le DOM (dans la LISTE DES TACHES)
    //tasksList.addTaskInDOM(taskElement);
  },

  saveNewTaskIntoAPI : function(taskName, categoryId){
     // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
    // récupération de l'id de la tâche
      let dataForAPI = {
        'title': taskName,
        'categoryId': categoryId,
        'completion': 0, // la tache est terminée
        'status': 1
      }

      // on prépare les entêtes HTTP (headers) de la requete
      // afin de spécifier que les données sont en json
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // on consome l'API pour ajouter en BDD

      let fetchOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataForAPI) // On ajoute les données, encodée en JSON, dans le corps de la requête
      }

      const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks';
      fetch(url, fetchOptions)
        .then(
          function(reponse){
          //alert(reponse.status)
          if(reponse.status == 201){
            return reponse.json();
          }else{
            alert('PEPIN');
          }

  
        })
        .then(
          function(newTaskData){
          
          // partie gtérant la fabrication du DOM pour la tâche.
          let categoryData = categoriesList.findById(newTaskData.category_id);
          //console.log('DANS FETCH CATEGORY DATA : ');
          //console.log(categoryData);
          let taskElement = task.createDOMElement(newTaskData.title, categoryData.name);
          // mise ajour dans le DOM du dataset stockant l'id de la tache
          task.setId(taskElement, newTaskData.id);
          tasksList.addTaskInDOM(taskElement);


        });



  }





}
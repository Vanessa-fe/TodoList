//console.log('task.js chargé');

const task = {

    addAllEventListeners: function (taskElement) {

        // ciblage du nom de la tache
        let taskNameElement = taskElement.querySelector('.task__name-display');
        taskNameElement.addEventListener('click', task.handleClickOnTaskName);

        // ciblage du bouton d'édition de la tâche
        let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
        taskEditButtonElement.addEventListener('click', task.handleClickOnEditButton);

        // ciblage de l'input d'édition du nom de la tache
        let taskInputNameElement = taskElement.querySelector('.task__name-edit');
        taskInputNameElement.addEventListener('blur', task.handleBlurOnTaskInputName);
        //on surveille les frappes de clavier (le moment ou on relache la touche)
        taskInputNameElement.addEventListener('keyup', task.handleKeyUpOnTaskInputName);

        //ciblage du bouton pour mettre une tache en status terminé
        let validateButtonElement = taskElement.querySelector('.task__button--validate');
        validateButtonElement.addEventListener('click', task.handleClickOnValidateButtonElement);

        //! e07 cibage bouton incomplete
        let incompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
        incompleteButtonElement.addEventListener('click', task.handleClickOnIncompleteButtonElement);

        // ciblage bouton archive
        let archiveButtonElement = taskElement.querySelector('.task__button--archive');
        archiveButtonElement.addEventListener('click', task.handleClickOnArchiveButtonElement);

        let seeArchives = document.querySelector(".filters__task--archived > a");
        seeArchives.addEventListener('click', task.handleClickOnSeeArchives);

        let deleteButtonElement = taskElement.querySelector('.task__button--delete');
        deleteButtonElement.addEventListener('click', task.handleClickOnDeleteButtonElement)
    },

    handleClickOnValidateButtonElement: function (event) {
        //alert('Validate');
        // récupération du bouton validation (qui a déclenché l'event)
        let validateButtonElement = event.currentTarget;
        let taskElement = validateButtonElement;
        // une fois que l'élement du DOM correspondant a une tache
        // a été récupété, nous lui appliquons les bonnes classes CSS
        taskElement.classList.add('task--complete');
        taskElement.classList.remove('task--todo');
        // bonus
        // taskElement.classList.replace('task--todo', 'task--complete');

        task.setCompletion(taskElement, 100);

        // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
        // récupération de l'id de la tâche
        const taskId = taskElement.dataset.taskId;

        let dataForAPI = {
            'completion': 100, // la tache est terminée
        }

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(dataForAPI) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function (reponse) {
                    return reponse.json()
                })
            .then(
                function (data) {
                    //console.log(data)
                });
    },

    handleClickOnIncompleteButtonElement: function (event) {
        //alert('INCOMPLET');
        // récupération du bouton validation (qui a déclenché l'event)
        let incompleteButtonElement = event.currentTarget;
        let taskElement = incompleteButtonElement.closest('.task');
        // une fois que l'élement du DOM correspondant a une tache
        // a été récupété, nous lui appliquons les bonnes classes CSS
        taskElement.classList.add('task--todo');
        taskElement.classList.remove('task--complete');
        // bonus
        // taskElement.classList.replace('task--todo', 'task--complete');

        task.setCompletion(taskElement, 0);

        // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
        // récupération de l'id de la tâche
        const taskId = taskElement.dataset.taskId;

        let dataForAPI = {
            'completion': 0, // la tache est terminée
        }

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(dataForAPI) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function (reponse) {
                    return reponse.json()
                })
            .then(
                function (data) {
                    //console.log(data)
                });
    },

    handleClickOnTaskName: function (event) {
        // récupération de l'élément ayant déclenché l'event
        let taskNameElement = event.currentTarget;
        //console.log(taskNameElement);

        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskNameElement.closest('.task');
        //console.log(taskElement);
        // une fois l'élément tâche récupéré
        // nous lui ajoutons la classe CSS 'task--edit'
        taskElement.classList.add('task--edit');
        // ciblage de l'input d'édition de la tache
        let taskNameInputElement = taskElement.querySelector('.task__name-edit');
        //console.log(taskNameInputElement);
        taskNameInputElement.focus();

        // BONUS placer le cuseur à la fin de l'input
        // récupérer la taille de texte dans l'input
        let length = taskNameInputElement.value.length;
        // on placer le cuseur  la fin de l'input (on débute une
        //selection à la fin de l'input; et on arrete la selection à la fin de l'input ; ça fait une selection vide !!)
        taskNameInputElement.setSelectionRange(length, length);
    },

    handleClickOnEditButton: function (event) {
        //alert('clic edit tache');
        task.handleClickOnTaskName(event);
    },

    handleBlurOnTaskInputName: function (event) {
        //alert('blur');
        //récupération de la valeur saisie par l'utilisateur
        let taskInputNameElement = event.currentTarget;
        let taskNewName = taskInputNameElement.value;
        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskInputNameElement.closest('.task');
        //console.log(taskElement);

        //ciblage de l'élément affichant le nom de la tâche (le p)
        let taskNameElement = taskElement.querySelector('.task__name-display');
        // mise à jour du contenu texte de l'élement affichant le nom de la tache
        taskNameElement.textContent = taskNewName;

        // on retire la classe CSS task--edit de l'élement task
        taskElement.classList.remove('task--edit');
        //! AJOUT E07
        // appel à l'api pour mettre à jour(patcher) le niveau de completion de la tache
        // récupération de l'id de la tâche
        const taskId = task.getId(taskElement);


        let dataForAPI = {
            'title': taskNewName, // la tache est terminée
        };

        // on prépare les entêtes HTTP (headers) de la requete
        // afin de spécifier que les données sont en json
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        // on consome l'API pour ajouter en BDD

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(dataForAPI) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks/' + taskId;
        //todo pour affiner notre mécanisme 
        // nous pourrions verifier si on a bien le bon code de réponse HTTP
        // ET SEULEMENT SI ON A LE BON CODE -> ajouter la tache dans la liste des taches
        // Pour éviter une divergence entre l'affichage du front et la BDD
        fetch(url, fetchOptions)
            .then(
                function (reponse) {
                    return reponse.json()
                })
            .then(
                function (data) {
                    //console.log(data)
                });
    },

    handleKeyUpOnTaskInputName: function (event) {
        // event.key nous permet de récupérér le nom de la touche qui a été pressé
        //console.log(event.key);
        if (event.key === 'Enter') {
            // on appelle le meme callback quie lorsuq'il y a un event blur sur l'input
            task.handleBlurOnTaskInputName(event);
        }
    },

    handleClickOnArchiveButtonElement: function (event) {
        // récupération de l'élément ayant déclenché l'event
        let taskNameElement = event.currentTarget;
        //console.log(taskNameElement);

        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskNameElement.closest('.task');
        //console.log(taskElement);
        // une fois l'élément tâche récupéré
        // nous lui remplaçons la classe CSS 'task--edit'
        taskElement.classList.replace('task--complete', 'task--archive');
        taskElement.classList.replace('task--todo', 'task--archive');

        // API
        const taskId = taskElement.dataset.taskId;

        let dataForAPI = {
            'status': 2
        }

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let fetchOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: JSON.stringify(dataForAPI) // On ajoute les données, encodée en JSON, dans le corps de la requête
        }

        const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks/' + taskId;
        fetch(url, fetchOptions)
            .then(
                function (reponse) {
                    return reponse.json()
                })
            .then(
                function (data) {
                    //console.log(data)
                });
    },

    handleClickOnSeeArchives: function () {
        //console.log(app.displayArchives);
        // ciblage des éléments
        let archivedTasks = document.getElementsByClassName("task--archive");
        let todoTasks = document.querySelectorAll(".task--todo");
        let completeTasks = document.querySelectorAll(".task--complete");

        // lien ciblé cliqué précèdement
        let link = document.querySelector(".filters__task--archived > a");

        // test sur app.displayArchives pour affichage ou non des archives
        switch (app.displayArchives) {
            case true:                
                // alors display:none sur les div todo et complete
                for (let task of archivedTasks) {
                    task.setAttribute("style", "display:block");
                }

                for (let task of todoTasks) {
                    task.setAttribute("style", "display:none");
                }

                for (let task of completeTasks) {
                    task.setAttribute("style", "display:none");
                }

                link.textContent = "Voir les tâches actives";

                // inversse la valeur de displayArchives pour switcher affichage archives
                switch (app.displayArchives) {
                    case false:
                        app.displayArchives = true;
                        break;
                    case true:
                        app.displayArchives = false;
                        break;
                    default:
                        alert("erreur dans l\'affichage des archives");
                }
                break;

            case false:
                // alors display:none sur les div archives (inversement)
                for (let task of archivedTasks) {
                    task.setAttribute("style", "display:none");
                }

                for (let task of todoTasks) {
                    task.setAttribute("style", "display:block");
                }

                for (let task of completeTasks) {
                    task.setAttribute("style", "display:block");
                }

                link.textContent = "Voir les archives";

                // inversse la valeur de displayArchives pour switcher affichage archives
                switch (app.displayArchives) {
                    case false:
                        app.displayArchives = true;
                        break;
                    case true:
                        app.displayArchives = false;
                        break;
                    default:
                        alert("erreur dans l\'affichage des archives");
                }
                break;
        }
    },

    onLoadDisplayArchives: function () {
        task.handleClickOnSeeArchives();
    },

    handleClickOnDeleteButtonElement: function (event) {
        // récupération de l'élément ayant déclenché l'event
        let taskNameElement = event.currentTarget;
        //console.log(taskNameElement);

        // récupération de l'élément "ancêtre" le plus proche
        // ayant la classe "task"
        let taskElement = taskNameElement.closest('.task');
        //console.log(taskElement);
        // une fois l'élément tâche récupéré

        // API
        const taskId = taskElement.dataset.taskId;

        const url = 'http://localhost/S07/S07-E04-backend-cedric-jacquot/public/tasks/' + taskId;

        fetch(url)
            .then(
                function (reponse) {
                    return reponse.json();
                })
            },

    createDOMElement: function (taskName, taskCategoryName) {
        //ciblage du template HTML correspondant à une tache
        let template = document.getElementById('task-template');

        // création d'une copie du template pour pouvoir travailler dessus
        // et renseigner les infos de la nouvelle tache.
        let templateForNewTask = template.content.cloneNode(true);

        // remplacer les valeurs dans la copie du template
        // ci dessous cf data-category dans les task
        templateForNewTask.querySelector('.task').dataset.category = taskCategoryName;
        templateForNewTask.querySelector('.task__category p').textContent = taskCategoryName;

        // remplacement du nom de la tâche dans la copie du template
        templateForNewTask.querySelector('.task__name-display').textContent = taskName;

        // input ...
        templateForNewTask.querySelector('.task__name-edit').setAttribute('value', taskName);
        //templateForNewTask.querySelector('.task__name-edit').value = taskName;

        // on enrgistre tous les events sur l'élement du DOM que nous venons de créer
        task.addAllEventListeners(templateForNewTask);

        return templateForNewTask;
    },

    setStatus: function (taskElement, status) {
        //! MERCI LAURENT !
        taskElement.querySelector('.task').classList.replace('task--todo', 'task--' + status);
        return taskElement;
    },

    setCompletion: function (taskElement, completion) {
        let progressBar = taskElement.querySelector('.progress-bar__level');
        progressBar.style.width = completion + '%';
        return taskElement;
    },

    setId: function (taskElement, id) {
        taskElement.querySelector('.task').dataset.taskId = id;
        return taskElement;
    },

    getId: function (taskElement) {
        return taskElement.dataset.taskId;
    }







}
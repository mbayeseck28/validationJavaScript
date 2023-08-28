const lists = document.getElementById('lists');
let tableauTaches = []; //Tableau qui me servira à stocker tous les taches
let cles = []; // Tableau qui me servira de recupérer les clés pour pouvoir les modifier st supprimer

// Boucle permettant de parcourrir tous les éléments du localStorage
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  let valeur = value.split(',').join(', '); //Ajouter un espace après chaque virgule
  let tableau;
  if (value !== null) {
    tableau = valeur.split(', '); //convertir la tache en un tableau JS
    tableauTaches.push(tableau);
    cles.push(key);
  } else {
    console.log(
      "La clé '" + key + "' n'a pas été trouvée dans le localStorage."
    );
  }
}
// Fonction permettant d'afficher le tableau dans le dom
function afficherTableauDansDOM(tableau) {
  // Sélectionner les éléments dans le DOM
  let conteneur = document.getElementById('tableau-conteneur'); // Élément conteneur du tableau
  let table = document.querySelector('.table'); // Élément de tableau HTML

  // Parcourir le tableau et créer une ligne pour chaque ensemble de 3 valeurs
  for (let i = 0; i < tableau.length; i += 3) {
    let ligne = document.createElement('tr'); // Créer une nouvelle ligne <tr>

    // Parcourir les 3 valeurs et créer une cellule <td> pour chacune
    for (let j = 0; j < 3; j++) {
      let index = i + j;
      if (index < tableau.length) {
        let cellule = document.createElement('td'); // Créer une nouvelle cellule <td>
        cellule.textContent = tableau[index]; // Remplir la cellule avec la valeur correspondante du tableau
        ligne.appendChild(cellule); // Ajouter la cellule à la ligne
      }
    }

    // Fonction pour supprimer une tâche du localStorage
    function supprimerTache(index) {
      const key = cles[index]; // Récupérer la clé à partir de l'index
      localStorage.removeItem(key); // Supprimer la tâche du localStorage
      location.reload(); // Recharger la page pour refléter les changements
    }

    // Fonction pour modifier une tâche du localStorage (à adapter selon vos besoins)
    function modifierTache(index) {
      const key = cles[index]; // Récupérer la clé à partir de l'index

      const tache = prompt('modifier la tache :');
      const des = prompt('modifier la description :');
      const dat = prompt('modifier la date :');
      if (tache !== null && des !== null && dat !== null) {
        // Mettre à jour la valeur dans le localStorage
        nouvelleValeur = `${tache},${des},${dat}`;
        localStorage.setItem(key, nouvelleValeur);
        location.reload(); // Recharger la page pour refléter les changements
      }
    }

    // Boucle pour créer les boutons de modification et de suppression
    for (let i = 0; i < tableauTaches.length; i += 3) {
      // ...
      let celluleBouton = document.createElement('td');
      celluleBouton.innerHTML = `
        <button type="button" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></button>
        <button type="button" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button>
      `;

      const boutonModification = celluleBouton.querySelector('.btn-success');
      boutonModification.addEventListener('click', function () {
        modifierTache(i); // Appeler la fonction avec l'index correct
      });

      const boutonSuppression = celluleBouton.querySelector('.btn-danger');
      boutonSuppression.addEventListener('click', function () {
        supprimerTache(i); // Appeler la fonction avec l'index correct
      });

      // ...
      ligne.appendChild(celluleBouton); // Ajouter la cellule des boutons à la ligne
      // Ajouter la ligne au tableau
      table.appendChild(ligne); // Ajouter la ligne au tableau HTML
      tr = ligne;
    }
  }
  // Ajouter le tableau au conteneur dans le DOM
  conteneur.appendChild(table); // Ajouter le tableau HTML au conteneur dans le DOM
}
// Affichage des taches
for (const tache of tableauTaches) {
  afficherTableauDansDOM(tache);
}

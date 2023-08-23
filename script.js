document.addEventListener('DOMContentLoaded', function () {
  // Sélection des éléments du DOM
  const calendarGrid = document.querySelector('.calendar-grid'); // Grille du calendrier
  const monthYearElement = document.querySelector('.month-year'); // Élément affichant le mois et l'année
  const prevButton = document.querySelector('.prev-btn'); // Bouton "Mois précédent"
  const nextButton = document.querySelector('.next-btn'); // Bouton "Mois suivant"

  // Initialisation de la date courante
  let currentDate = new Date();

  // Fonction pour mettre à jour le calendrier
  function updateCalendar() {
    // Calcul des informations du mois en cours

    // Crée une nouvelle instance de Date représentant le premier jour du mois en cours
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(), // Année en cours
      currentDate.getMonth(), // Mois en cours (0 pour janvier, 11 pour décembre)
      1 // Jour 1 du mois (le début du mois)
    );

    // Crée une nouvelle instance de Date représentant le dernier jour du mois en cours
    // En passant le mois suivant (currentMonth + 1) et en utilisant le jour 0, cela revient au dernier jour du mois en cours
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(), // Année en cours
      currentDate.getMonth() + 1, // Mois suivant (le mois après le mois en cours)
      0 // Jour 0, ce qui signifie le dernier jour du mois précédent
    );

    // Récupère le nombre total de jours dans le mois en cours
    const totalDays = lastDayOfMonth.getDate();

    // Récupère le jour de la semaine (0 pour dimanche, 1 pour lundi, etc.) du premier jour du mois en cours
    const startDay = firstDayOfMonth.getDay();

    // Affichage du mois et de l'année en cours

    // Utilise la méthode toLocaleString pour obtenir le nom complet du mois en cours
    // { month: 'long' } spécifie que nous voulons le nom complet du mois
    // Par exemple, si currentDate représente "10 juillet 2023", cette ligne affiche "juillet 2023"
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    // Obtient l'année en cours à partir de la date currentDate
    const year = currentDate.getFullYear();

    // Concatène le nom complet du mois avec l'année en cours, séparés par un espace
    const monthYearText = monthName + ' ' + year;

    // Affecte le texte nouvellement créé (mois et année) à l'élément du DOM (monthYearElement)
    monthYearElement.textContent = monthYearText;

    // Nettoyage de la grille du calendrier
    calendarGrid.innerHTML = '';

    // Ajout de cellules vides pour les jours précédant le premier jour du mois
    for (let i = 0; i < startDay; i++) {
      // Crée un nouvel élément <div> pour représenter une cellule vide
      const emptyCell = document.createElement('div');

      // Ajoute la cellule vide à la grille du calendrier
      calendarGrid.appendChild(emptyCell);
    }

    // Ajout des jours du mois avec gestion de la classe 'aujourd'hui'
    for (let i = 1; i <= totalDays; i++) {
      // Crée un nouvel élément <div> pour représenter un jour du mois
      const dayElement = document.createElement('div');

      // Ajoute la classe CSS 'day' à l'élément <div> pour le style
      dayElement.classList.add('day');

      // Définit le contenu texte de l'élément <div> comme le numéro du jour (i)
      dayElement.textContent = i;

      // Vérifie si le jour en cours est le même que la date courante
      if (
        currentDate.getDate() === i &&
        currentDate.getMonth() === firstDayOfMonth.getMonth() &&
        currentDate.getFullYear() === firstDayOfMonth.getFullYear()
      ) {
        // Si c'est le cas, ajoute la classe CSS 'today' à l'élément <div>
        dayElement.classList.add('today');
      }

      // Ajoute l'élément <div> représentant le jour à la grille du calendrier
      calendarGrid.appendChild(dayElement);
    }
  }

  // Mise à jour initiale du calendrier
  updateCalendar();

  // Écouteur pour le bouton "Mois précédent"
  prevButton.addEventListener('click', function () {
    // Décrémente le mois de la date courante de 1
    currentDate.setMonth(currentDate.getMonth() - 1);

    // Met à jour le calendrier en fonction de la nouvelle date
    updateCalendar();
  });

  // Écouteur pour le bouton "Mois suivant"
  nextButton.addEventListener('click', function () {
    // Incrémente le mois de la date courante de 1
    currentDate.setMonth(currentDate.getMonth() + 1);

    // Met à jour le calendrier en fonction de la nouvelle date
    updateCalendar();
  });

  // Écouteur pour la grille du calendrier (sélection d'un jour)
  calendarGrid.addEventListener('click', function (event) {
    const target = event.target; // Élément du DOM sur lequel le clic a été effectué
    const modal = document.getElementById('myModal'); // Élément modal

    // Vérifie si l'élément cliqué possède la classe 'day'
    if (target.classList.contains('day')) {
      // Récupération du jour sélectionné en tant que nombre
      const selectedDay = parseInt(target.textContent, 10);

      // Met à jour la date courante avec le jour sélectionné
      currentDate.setDate(selectedDay);

      // Met à jour le calendrier en fonction de la nouvelle date
      updateCalendar();

      // Gestion du clic sur un jour spécifique
      let task = document.getElementById('tache');
      task.innerHTML = currentDate.toLocaleDateString(); // Affichage de la date dans un élément HTML
      console.log('Jour sélectionné : ', currentDate.toLocaleDateString()); // Affichage de la date dans la console

      // Affichage de l'élément modal
      modal.style.display = 'block';
    }
  });
});

// MODAL
// Attendre que le contenu du DOM soit chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('myModal'); // Récupère l'élément modal
  const closeModalBtn = document.querySelector('.close'); // Récupère le bouton de fermeture du modal (crosse)

  // Fermer le modal lorsque l'utilisateur clique sur la croix (bouton de fermeture)
  closeModalBtn.addEventListener('click', function () {
    modal.style.display = 'none'; // Masque le modal en définissant le style d'affichage sur 'none'
  });

  // Fermer le modal lorsque l'utilisateur clique en dehors du contenu du modal
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none'; // Masque le modal si l'élément cliqué est le modal lui-même
    }
  });
});

// _______________________
// Générer une clé dynamique
function generateDynamicKey(prefix, identifier) {
  return `${prefix}_${identifier}`;
}
// Nombre Aléatoire
let previousNumber = 0;
function generateRandomNumber() {
  let newNumber = Math.random() * 100; // Génère un nombre aléatoire entre 0 et 100
  while (newNumber <= previousNumber) {
    newNumber = Math.random() * 100;
  }
  previousNumber = newNumber;
  return newNumber;
}
// Enregistrer une valeur dans le localStorage

function saveToLocalStorage(itemName, value) {
  const key = generateDynamicKey(generateRandomNumber(), itemName);
  localStorage.setItem(key, value);
}

function recupererInfos() {
  let tab = [
    document.getElementById('titre').value,
    document.getElementById('description').value,
    document.getElementById('tache').textContent,
  ];
  saveToLocalStorage('monTableau', tab);
}

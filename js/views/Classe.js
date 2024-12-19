(() => {
    const API_URL = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend

    // Fonction pour lister les classes
    async function listClasses() {
        try {
            const response = await fetch(`${API_URL}/classes`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const classes = await response.json();
                const tbody = document.querySelector('#classes-table tbody');
                tbody.innerHTML = '';

                classes.forEach(classe => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${classe.niveau}</td>
                        <td>${classe.inscriptions}</td>
                        <td><button onclick="viewInscriptions(${classe.id})">Voir Inscriptions</button></td>
                        <td><button onclick="viewCours(${classe.id})">Voir Cours</button></td>
                    `;

                    tbody.appendChild(row);
                });
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des classes :', err);
        }
    }

    // Fonction pour afficher les inscriptions d'une classe
    async function viewInscriptions(classeId) {
        try {
            const response = await fetch(`${API_URL}/classes/${classeId}/inscriptions`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const inscriptions = await response.json();
                const tbody = document.querySelector('#inscriptions-table tbody');
                tbody.innerHTML = '';

                inscriptions.forEach(inscription => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${inscription.etudiant}</td>
                        <td>${inscription.annee_scolaire}</td>
                    `;

                    tbody.appendChild(row);
                });

                // Affiche la table des inscriptions
                document.querySelector('#inscriptions-section').style.display = 'block';
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des inscriptions :', err);
        }
    }

    // Fonction pour afficher les cours d'une classe
    async function viewCours(classeId) {
        try {
            const response = await fetch(`${API_URL}/classe/${classeId}/cours`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const cours = await response.json();
                const tbody = document.querySelector('#cours-table tbody');
                tbody.innerHTML = '';

                cours.forEach(cour => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${cour.module}</td>
                        <td>${cour.professeur}</td>
                        <td>${cour.sessions}</td>
                    `;

                    tbody.appendChild(row);
                });

                // Affiche la table des cours
                document.querySelector('#cours-section').style.display = 'block';
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des cours :', err);
        }
    }

    // Charger la liste des classes automatiquement lors du chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        listClasses();
    });

    // Exposer les fonctions nécessaires au scope global
    window.listClasses = listClasses;
    window.viewInscriptions = viewInscriptions;
    window.viewCours = viewCours;
})();

(() => {
    const API_URL = 'http://localhost:8000/api'; // Remplacez par l'URL de votre backend

    // Fonction pour lister les étudiants
    async function listEtudiants() {
        try {
            const response = await fetch(`${API_URL}/etudiant`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const etudiants = await response.json();
                const tbody = document.querySelector('#etudiants-table tbody');
                tbody.innerHTML = '';

                etudiants.forEach(etudiant => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${etudiant.nom}</td>
                        <td>${etudiant.prenom}</td>
                        <td>
                            <button onclick="editEtudiant(${etudiant.id}, '${etudiant.nom}', '${etudiant.prenom}')">Modifier</button>
                            <button onclick="deleteEtudiant(${etudiant.id})">Supprimer</button>
                        </td>
                    `;

                    tbody.appendChild(row);
                });
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des étudiants :', err);
        }
    }

    // Fonction pour créer un nouvel étudiant
    async function createEtudiant() {
        const nom = document.querySelector('#nom').value;
        const prenom = document.querySelector('#prenom').value;

        try {
            const response = await fetch(`${API_URL}/etudiant`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, prenom })
            });

            if (response.ok) {
                alert('Étudiant créé avec succès.');
                listEtudiants();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la création de l\'étudiant :', err);
        }
    }

    // Fonction pour mettre à jour un étudiant
    async function updateEtudiant(id) {
        const nom = document.querySelector('#edit-nom').value;
        const prenom = document.querySelector('#edit-prenom').value;

        try {
            const response = await fetch(`${API_URL}/etudiant/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nom, prenom })
            });

            if (response.ok) {
                alert('Étudiant mis à jour avec succès.');
                listEtudiants();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour de l\'étudiant :', err);
        }
    }

    // Fonction pour supprimer un étudiant
    async function deleteEtudiant(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/etudiant/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert('Étudiant supprimé avec succès.');
                listEtudiants();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la suppression de l\'étudiant :', err);
        }
    }

    // Fonction pour ouvrir le formulaire d'édition d'un étudiant
    function editEtudiant(id, nom, prenom) {
        const editForm = document.querySelector('#edit-etudiant-form');
        editForm.style.display = 'block';

        document.querySelector('#edit-nom').value = nom;
        document.querySelector('#edit-prenom').value = prenom;

        document.querySelector('#save-edit-btn').onclick = () => updateEtudiant(id);
    }

    // Charger la liste des étudiants automatiquement lors du chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        listEtudiants();
    });

    // Exposer les fonctions nécessaires au scope global
    window.listEtudiants = listEtudiants;
    window.createEtudiant = createEtudiant;
    window.deleteEtudiant = deleteEtudiant;
    window.editEtudiant = editEtudiant;
})();

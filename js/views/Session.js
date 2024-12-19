(() => {
    const API_URL = 'http://localhost:8000'; // Remplacez par l'URL de votre backend

    // Fonction pour lister les sessions
    async function listSessions() {
        try {
            const response = await fetch(`${API_URL}/api/sessions`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const sessions = await response.json();
                const tbody = document.querySelector('#sessions-table tbody');
                tbody.innerHTML = '';

                sessions.forEach(session => {
                    const row = document.createElement('tr');

                    row.innerHTML = `
                        <td>${session.date}</td>
                        <td>${session.heureDebut}</td>
                        <td>${session.heureFin}</td>
                        <td>${session.salle || 'Non spécifiée'}</td>
                        <td>${session.cours}</td>
                        <td>
                            <button onclick="editSession(${session.id}, '${session.date}', '${session.heureDebut}', '${session.heureFin}', '${session.salle}', ${session.cours})">Modifier</button>
                            <button onclick="deleteSession(${session.id})">Supprimer</button>
                        </td>
                    `;

                    tbody.appendChild(row);
                });
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la récupération des sessions :', err);
        }
    }

    // Fonction pour créer une nouvelle session
    async function createSession() {
        const date = document.querySelector('#date').value;
        const heureDebut = document.querySelector('#heureDebut').value;
        const heureFin = document.querySelector('#heureFin').value;
        const salle = document.querySelector('#salle').value;
        const cours_id = document.querySelector('#cours_id').value;

        try {
            const response = await fetch(`${API_URL}/sessions`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, heureDebut, heureFin, salle, cours_id })
            });

            if (response.ok) {
                alert('Session créée avec succès.');
                listSessions();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la création de la session :', err);
        }
    }

    // Fonction pour mettre à jour une session
    async function updateSession(id) {
        const date = document.querySelector('#edit-date').value;
        const heureDebut = document.querySelector('#edit-heureDebut').value;
        const heureFin = document.querySelector('#edit-heureFin').value;
        const salle = document.querySelector('#edit-salle').value;
        const cours_id = document.querySelector('#edit-cours_id').value;

        try {
            const response = await fetch(`${API_URL}/sessions/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date, heureDebut, heureFin, salle, cours_id })
            });

            if (response.ok) {
                alert('Session mise à jour avec succès.');
                listSessions();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la mise à jour de la session :', err);
        }
    }

    // Fonction pour supprimer une session
    async function deleteSession(id) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette session ?')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/sessions/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                alert('Session supprimée avec succès.');
                listSessions();
            } else {
                const error = await response.json();
                alert(`Erreur : ${error.message}`);
            }
        } catch (err) {
            console.error('Erreur lors de la suppression de la session :', err);
        }
    }

    // Fonction pour ouvrir le formulaire d'édition d'une session
    function editSession(id, date, heureDebut, heureFin, salle, cours_id) {
        const editForm = document.querySelector('#edit-session-form');
        editForm.style.display = 'block';

        document.querySelector('#edit-date').value = date;
        document.querySelector('#edit-heureDebut').value = heureDebut;
        document.querySelector('#edit-heureFin').value = heureFin;
        document.querySelector('#edit-salle').value = salle;
        document.querySelector('#edit-cours_id').value = cours_id;

        document.querySelector('#save-edit-btn').onclick = () => updateSession(id);
    }

    // Charger la liste des sessions automatiquement lors du chargement de la page
    document.addEventListener('DOMContentLoaded', () => {
        listSessions();
    });

    // Exposer les fonctions nécessaires au scope global
    window.listSessions = listSessions;
    window.createSession = createSession;
    window.deleteSession = deleteSession;
    window.editSession = editSession;
})();

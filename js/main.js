// Fonction pour réinitialiser les scripts dynamiques
function unloadScripts() {
    const scripts = document.querySelectorAll('script[data-dynamic="true"]');
    scripts.forEach(script => script.remove()); // Supprime les anciens scripts dynamiques
}

// Fonction pour charger dynamiquement un script JavaScript
function loadScript(scriptUrl, onLoadCallback) {
    // Supprime les anciens scripts
    unloadScripts();

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.setAttribute('data-dynamic', 'true'); // Identifie les scripts dynamiques
    script.onload = () => {
        console.log(`Script chargé : ${scriptUrl}`);
        if (onLoadCallback) onLoadCallback();
    };
    script.onerror = () => {
        console.error(`Erreur lors du chargement du script : ${scriptUrl}`);
    };
    document.body.appendChild(script);
}

// Fonction pour charger dynamiquement une section HTML
function loadSection(url, callback) {
    const contentContainer = document.getElementById('content-container');

    // Vide le conteneur avant de charger la nouvelle section
    contentContainer.innerHTML = '<p>Chargement en cours...</p>';

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur lors du chargement de la section : ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            // Injecte le contenu HTML dans le conteneur principal
            contentContainer.innerHTML = html;

            // Exécute le callback pour charger les scripts associés
            if (callback) callback();
        })
        .catch(error => {
            console.error('Erreur:', error);
            contentContainer.innerHTML = `
                <div class="error-message">
                    <p>Impossible de charger la section. Veuillez réessayer plus tard.</p>
                </div>`;
        });
}

// Exemple de vue : CourClasses
function loadCourClassesView() {
    loadSection('./cour-classes.html', () => {
        loadScript('./js/views/CourClasses.js', () => {
            if (typeof listCourClasses === 'function') {
                listCourClasses(); // Appelle la fonction pour lister les cours-classes
            } else {
                console.error('Erreur : La fonction listCourClasses est introuvable.');
            }
        });
    });
}


function loadNiveauView() {
    loadSection('./niveau.html', () => {
        loadScript('./js/views/Niveau.js', () => {
            if (typeof listNiveau === 'function') {
                listNiveau(); // Appelle la fonction pour lister les cours-classes
            } else {
                console.error('Erreur : La fonction listCourClasses est introuvable.');
            }
        });
    });
}

function loadEtudiantView() {
    loadSection('./etudiant.html', () => {
        loadScript('./js/views/Etudiant.js', () => {
            if (typeof listEtudiants === 'function') {
                listEtudiants(); // Appelle la fonction pour lister les cours-classes
            } else {
                console.error('Erreur : La fonction listCourClasses est introuvable.');
            }
        });
    });
}

// Exemple de vue : Cours
function loadCoursView() {
    loadSection('./cours.html', () => {
        loadScript('./js/views/Cours.js', () => {
            if (typeof listCours === 'function') {
                listCours(); // Appelle la fonction pour lister les cours
            } else {
                console.error('Erreur : La fonction listCours est introuvable.');
            }
        });
    });
}

// Exemple de vue : Classes
function loadClassesView() {
    loadSection('./classes.html', () => {
        loadScript('./js/views/Classes.js', () => {
            if (typeof listClasses === 'function') {
                listClasses(); // Appelle la fonction pour lister les classes
            } else {
                console.error('Erreur : La fonction listClasses est introuvable.');
            }
        });
    });
}


function loadSessionView() {
    loadSection('./session.html', () => {
        loadScript('./js/views/Session.js', () => {
            if (typeof listSessions === 'function') {
                listSessions(); // Appelle la fonction pour lister les classes
            } else {
                console.error('Erreur : La fonction listClasses est introuvable.');
            }
        });
    });
}

// Vérification de l'authentification
function checkAuth() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
        window.location.href = './login.html';
    }
}

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    checkAuth(); // Vérifie l'authentification de l'utilisateur
    console.log('Application prête.');
});

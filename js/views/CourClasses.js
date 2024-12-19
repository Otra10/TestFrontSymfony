(() => {
    const API_URL = 'http://localhost:8000/api';

    async function listCourClasses() {
        try {
            const response = await fetch(`${API_URL}/cour/classes`);
            if (!response.ok) throw new Error('Erreur lors de la récupération des relations.');
    
            const relations = await response.json();
            const tableBody = document.querySelector('#cour-classes-table tbody');
            tableBody.innerHTML = '';
    
            relations.forEach(relation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${relation.id}</td>
                    <td>${relation.cours.join(', ')}</td>
                    <td>${relation.classes.join(', ')}</td>
                    <td>
                        <button onclick="deleteCourClass(${relation.id})">Supprimer</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    async function createCourClass(event) {
        event.preventDefault();
    
        const coursId = document.getElementById('cours').value;
        const classeId = document.getElementById('classes').value;
    
        try {
            const response = await fetch(`${API_URL}/cour/classes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cours_id: coursId, classe_id: classeId })
            });
    
            if (!response.ok) throw new Error('Erreur lors de la création de la relation.');
    
            alert('Relation créée avec succès !');
            listCourClasses();
        } catch (error) {
            console.error(error);
        }
    }
    
    async function deleteCourClass(id) {
        try {
            const response = await fetch(`${API_URL}/cour/classes/${id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Erreur lors de la suppression de la relation.');
    
            alert('Relation supprimée avec succès !');
            listCourClasses();
        } catch (error) {
            console.error(error);
        }
    }
    
    // Charger les options pour les cours et les classes
    async function loadOptions() {
        try {
            const [coursResponse, classesResponse] = await Promise.all([
                fetch(`${API_URL}/cours`),
                fetch(`${API_URL}/classes`)
            ]);
    
            if (!coursResponse.ok || !classesResponse.ok) throw new Error('Erreur lors du chargement des options.');
    
            const cours = await coursResponse.json();
            const classes = await classesResponse.json();
    
            const coursSelect = document.getElementById('cours');
            const classesSelect = document.getElementById('classes');
    
            cours.forEach(c => {
                const option = document.createElement('option');
                option.value = c.id;
                option.textContent = c.nom;
                coursSelect.appendChild(option);
            });
    
            classes.forEach(cl => {
                const option = document.createElement('option');
                option.value = cl.id;
                option.textContent = cl.nom;
                classesSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
        }
    }
    
    // Initialisation
    document.addEventListener('DOMContentLoaded', () => {
        listCourClasses();
        loadOptions();
        document.getElementById('cour-classes-form').addEventListener('submit', createCourClass);
    });
    
    window.listCourClasses = listCourClasses;

})();

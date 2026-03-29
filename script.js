// Gestion du curseur robotique personnalisé
const cursor = document.getElementById('robot-cursor');

document.addEventListener('mousemove', (e) => {
    // On met à jour la position du curseur selon la souris
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Optionnel : Animation au survol des liens
const links = document.querySelectorAll('a, .skill-card, .project-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursor.style.filter = 'hue-rotate(90deg)';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursor.style.filter = 'none';
    });
});

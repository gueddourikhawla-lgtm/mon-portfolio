const cursor = document.getElementById('robot-cursor');

// Détection si l'utilisateur est sur mobile/tactile
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const links = document.querySelectorAll('a, .skill-card, .project-card, .btn, .c-btn');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.filter = 'hue-rotate(90deg) drop-shadow(0 0 10px var(--rose-gold))';
        });
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.filter = 'none';
        });
    });
} else {
    // Si c'est un mobile, on supprime carrément l'élément du DOM
    if (cursor) cursor.remove();
}

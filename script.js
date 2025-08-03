document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');

    // Sayfa kaydırıldığında hangi bölümün göründüğünü izle
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Aktif linki güncelle
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.5 // Bölümün %50'si göründüğünde aktifleşir
    });

    // Her bölümü izle
    sections.forEach(section => {
        observer.observe(section);
    });

    // Kartlara animasyon ekle
    const cards = document.querySelectorAll('.card, .pilot-card, .partner');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                cardObserver.unobserve(entry.target); // Animasyon sonrası izlemeyi bırak
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = 0; // Başlangıçta gizle
        cardObserver.observe(card);
    });
});

// Animasyon için CSS anahtar kareleri
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animação do hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        // Acessibilidade: abrir menu com Enter
        hamburger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                navLinks.classList.toggle('active');
                const spans = hamburger.querySelectorAll('span');
                spans.forEach(span => span.classList.toggle('active'));
            }
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Destaque dos cards ao passar o mouse
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('highlight');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('highlight');
        });
        // Clique nos cards
        card.addEventListener('click', () => {
            const dica = card.querySelector('h3').textContent;
            alert(`💚 Dica selecionada: ${dica}\n\nComece hoje mesmo a aplicar esta prática sustentável!`);
        });
    });

    // Botão "Saiba mais"
    const saibaMaisBtn = document.getElementById('saibaMaisBtn');
    if (saibaMaisBtn) {
        saibaMaisBtn.addEventListener('click', () => {
            const sobreSection = document.getElementById('sobre');
            if (sobreSection) {
                sobreSection.scrollIntoView({ behavior: 'smooth' });
                // Pequena animação no título da seção
                const sobreTitle = sobreSection.querySelector('h2');
                if (sobreTitle) {
                    sobreTitle.style.transform = 'scale(1.1)';
                    sobreTitle.style.transition = 'transform 0.3s';
                    setTimeout(() => {
                        sobreTitle.style.transform = 'scale(1)';
                    }, 300);
                }
            }
        });
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    const formMessage = document.getElementById('formMessage');
    if (newsletterForm && formMessage) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.email.value.trim();
            if (validateEmail(email)) {
                formMessage.textContent = 'Inscrição realizada com sucesso!';
                formMessage.style.color = 'green';
                newsletterForm.reset();
            } else {
                formMessage.textContent = 'Por favor, insira um e-mail válido.';
                formMessage.style.color = 'red';
            }
            setTimeout(() => {
                formMessage.textContent = '';
            }, 3000);
        });
    }

    // Função utilitária para validar e-mail
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Validação simples de email
    if (email.includes('@') && email.includes('.')) {
        formMessage.textContent = '✅ Obrigado por se inscrever! Você receberá nossas dicas em breve.';
        formMessage.style.color = '#ffc107';
        newsletterForm.reset();
        
        // Animação de sucesso
        formMessage.style.animation = 'fadeInUp 0.5s ease';
        setTimeout(() => {
            formMessage.style.animation = '';
        }, 500);
    } else {
        formMessage.textContent = '❌ Por favor, insira um email válido.';
        formMessage.style.color = '#ff6b6b';
    }
});

// Destaque do link ativo durante a rolagem
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Efeito de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contador animado para as estatísticas
function animateStats() {
    const stats = document.querySelectorAll('.stat-card h3');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        if (text.includes('+')) {
            const number = parseInt(text);
            let current = 0;
            const increment = number / 50; // Dividido em 50 passos
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + '+';
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + '+';
                }
            }, 20);
        }
    });
}

// Iniciar contadores quando a seção estiver visível
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'sobre') {
            animateStats();
            observer.unobserve(entry.target); // Para não repetir a animação
        }
    });
}, observerOptions);

observer.observe(document.getElementById('sobre'));

// Loading animation para o hero
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    
    setTimeout(() => {
        heroContent.style.transition = 'opacity 1s ease';
        heroContent.style.opacity = '1';
    }, 200);
});

// Tooltip personalizado para os cards
cards.forEach(card => {
    card.setAttribute('title', 'Clique para mais informações');
});

// Mensagem de boas-vindas no console
console.log('🌍 Bem-vindo ao EcoVida!');
console.log('💚 Juntos podemos fazer a diferença!');
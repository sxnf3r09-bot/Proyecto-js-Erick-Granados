/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Dominio: Fintech & Ahorro Automático
   ============================================ */

// 1. Objeto de datos del dominio (Fintech)
const entityData = {
    name: 'AutoSave Fintech',
    description: 'Nuestra plataforma utiliza IA para analizar tus gastos y separar micro-ahorros automáticos cada vez que compras. Optimiza tu salud financiera sin esfuerzo.',
    identifier: 'FIN-2026-AS',
    contact: {
        email: 'soporte@autosave.fintech',
        phone: '+57 300 123 4567',
        location: 'Hub Tech, Bogotá'
    },
    skills: [
        { name: 'Redondeo de Compras', level: 95 },
        { name: 'Retos de Ahorro', level: 85 },
        { name: 'Inversión Indexada', level: 70 },
        { name: 'Análisis de Gastos', level: 90 },
        { name: 'Cripto-Ahorro', level: 60 },
        { name: 'Metas Compartidas', level: 75 }
    ],
    links: [
        { platform: 'LinkedIn', url: 'https://www.linkedin.com', icon: '🔗' },
        { platform: 'App Store', url: 'https://www.apple.com/app-store/', icon: '🍎' },
        { platform: 'Web', url: 'https://www.google.com', icon: '🌐' }
    ],
    stats: {
        totalUsers: '500k',
        activePlans: '12.4k',
        avgRating: 4.9,
        savedAmount: '$2.5M'
    }
};

// 2. Referencias a elementos del DOM
const themeToggle = document.getElementById('themeToggle');
const userName = document.getElementById('userName');
const userTitle = document.getElementById('userTitle');
const userLocation = document.getElementById('userLocation');
const userBio = document.getElementById('userBio');
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const skillsList = document.getElementById('skillsList');
const socialLinks = document.getElementById('socialLinks');
const statsContainer = document.getElementById('stats');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleSkillsBtn = document.getElementById('toggleSkills');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// 3. Renderizar información básica
const renderBasicInfo = () => {
    const { name, description, contact: { email, phone, location } } = entityData;
    
    userName.textContent = name;
    userTitle.textContent = 'Smart Financial Assistant';
    userLocation.textContent = `📍 ${location}`;
    userBio.textContent = description;
    userEmail.textContent = email;
    userPhone.textContent = phone;
};

// 4. Renderizar lista de habilidades (Skills)
const renderSkills = (showAll = false) => {
    const { skills } = entityData;
    const itemsToShow = showAll ? skills : skills.slice(0, 4);

    skillsList.innerHTML = itemsToShow.map(skill => `
        <div class="skill-item">
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <span>${skill.level}%</span>
                <div class="skill-bar">
                    <div class="skill-bar-fill" style="width: ${skill.level}%"></div>
                </div>
            </div>
        </div>
    `).join('');
};

// 5. Renderizar enlaces (Connect)
const renderLinks = () => {
    const { links } = entityData;
    socialLinks.innerHTML = links.map(link => `
        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="social-link">
            <span>${link.icon}</span> ${link.platform}
        </a>
    `).join('');
};

// 6. Calcular y renderizar estadísticas
const renderStats = () => {
    const { stats } = entityData;
    const statsArray = [
        { label: 'Usuarios', value: stats.totalUsers },
        { label: 'Planes Activos', value: stats.activePlans },
        { label: 'Rating', value: stats.avgRating },
        { label: 'Ahorrado', value: stats.savedAmount }
    ];

    statsContainer.innerHTML = statsArray.map(stat => `
        <div class="stat-item">
            <span class="stat-value">${stat.value}</span>
            <span class="stat-label">${stat.label}</span>
        </div>
    `).join('');
};

// 7. Funcionalidad de cambio de tema
const toggleTheme = () => {
    const currentTheme = document.documentElement.dataset.theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.dataset.theme = newTheme;
    themeToggle.querySelector('.theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
    const savedTheme = localStorage.getItem('theme') ?? 'light';
    document.documentElement.dataset.theme = savedTheme;
    themeToggle.querySelector('.theme-icon').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// 8. Funcionalidad de copiar información
const showToast = (message) => {
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
};

const copyInfo = () => {
    const { email } = entityData.contact;
    navigator.clipboard.writeText(email)
        .then(() => showToast('¡Correo de contacto copiado!'))
        .catch(() => showToast('Error al copiar'));
};

// 9. Funcionalidad de mostrar/ocultar habilidades
let showingAllSkills = false;

const handleToggleSkills = () => {
    showingAllSkills = !showingAllSkills;
    renderSkills(showingAllSkills);
    toggleSkillsBtn.textContent = showingAllSkills ? 'Show Less' : 'Show More';
};

// 10. Event Listeners
themeToggle.addEventListener('click', toggleTheme);
copyBtn.addEventListener('click', copyInfo);
toggleSkillsBtn.addEventListener('click', handleToggleSkills);

// 11. Inicializar la aplicación
const init = () => {
    loadTheme();
    renderBasicInfo();
    renderSkills();
    renderLinks();
    renderStats();
    console.log('✅ AutoSave Fintech App Initialized');
};

// Ejecutar al cargar el DOM
document.addEventListener('DOMContentLoaded', init);
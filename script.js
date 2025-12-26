 let statusFilter = '';
const API_URL = 'https://rickandmortyapi.com/api';
let currentPage = 1;
let totalPages = 1;
let searchQuery = '';
let isSearching = false;
const LOADER_DURATION = 1000;

function showLoader() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('charactersContainer').innerHTML = '';
    document.getElementById('pageInfo').textContent = ''; 
}

function hideLoader() {
    document.getElementById('loading').style.display = 'none';
}

function resetPage() {
    document.getElementById('welcomeMessage').style.display = 'block';
    document.getElementById('charactersContainer').innerHTML = '';
    document.getElementById('pageInfo').textContent = '';
    document.getElementById('searchInput').value = '';
    document.getElementById('error').style.display = 'none';


    searchQuery = '';
    isSearching = false;
    currentPage = 1;

    statusFilter = '';
    document.getElementById('statusFilter').value = '';
}


async function fetchCharacters(page = 1) {
    showLoader();

    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

let url = `${API_URL}/character?page=${page}`;

if (isSearching && searchQuery) {
    url += `&name=${encodeURIComponent(searchQuery)}`;
}

if (statusFilter) {
    url += `&status=${statusFilter}`;
}


    try {
        const response = await fetch(url);
        const data = await response.json();

        setTimeout(() => {
            hideLoader();
            if (!data.results || data.results.length === 0) {
                errorDiv.style.display = 'block';
                errorDiv.textContent = 'No characters found';
                document.getElementById('charactersContainer').innerHTML = '';
                document.getElementById('pageInfo').textContent = '';
                return;
            }
            totalPages = data.info.pages;
            displayCharacters(data.results);
            displayPagination(data.info.count);
        }, LOADER_DURATION);
    } catch (err) {
        setTimeout(() => {
            hideLoader();
            errorDiv.style.display = 'block';
            errorDiv.textContent = `Error: ${err.message}`;
        }, LOADER_DURATION);
    }
}

async function displayCharacters(characters) {
    const container = document.getElementById('charactersContainer');
    container.innerHTML = ''; 
    const overlay = document.getElementById('cardOverlay');

    for (const character of characters) {

        const lastEpisodeUrl = character.episode[character.episode.length - 1];

        let lastEpisodeInfo = '';
        try {
            const res = await fetch(lastEpisodeUrl);
            const epData = await res.json();
            lastEpisodeInfo = `${epData.episode} - ${epData.name}`;
        } catch {
            lastEpisodeInfo = 'Unknown';
        }

        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <img src="${character.image}" alt="${character.name}" class="character-image" onerror="this.src='https://via.placeholder.com/280x250?text=No+Image'">
            <div class="character-info">
                <div class="character-name">${character.name}</div>
                <div class="character-detail">
                    <span class="label">Status:</span>
                    <span class="status ${character.status.toLowerCase()}">${character.status}</span>
                </div>
                <div class="character-detail"><span class="label">Species:</span> ${character.species}</div>
                <div class="character-detail"><span class="label">Gender:</span> ${character.gender}</div>
                <div class="character-detail"><span class="label">Type:</span> ${character.type || 'Unknown'}</div>
                <div class="character-detail"><span class="label">Last Location:</span> ${character.location.name}</div>
                <div class="character-detail"><span class="label">Last Episode:</span> ${lastEpisodeInfo}</div>
            </div>
        `;

       card.addEventListener('click', () => {
    const existingBtn = card.querySelector('.close-btn');
    if (existingBtn) existingBtn.remove();

    card.classList.add('active');
    overlay.style.display = 'block';
    document.body.classList.add('card-active');


    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-btn';
    closeBtn.innerHTML = '&times;';
    card.appendChild(closeBtn);

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        card.classList.remove('active');
        overlay.style.display = 'none';
        document.body.classList.remove('card-active');
        closeBtn.remove();
    });
});

overlay.addEventListener('click', () => {
    const activeCard = document.querySelector('.character-card.active');
    if (activeCard) {
        activeCard.classList.remove('active');
        const btn = activeCard.querySelector('.close-btn');
        if (btn) btn.remove(); 
    }
    overlay.style.display = 'none';
    document.body.classList.remove('card-active');
});

        container.appendChild(card);
    }
   
}

function displayPagination(totalCount) {
    let infoText = `Total: ${totalCount} characters found.`;
    if (totalPages > 1) {
        infoText += '<div class="pagination">';
        for (let i = 1; i <= totalPages; i++) {
            infoText += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
        }
        infoText += '</div>';
    }
    document.getElementById('pageInfo').innerHTML = infoText;
}

function goToPage(page) {
    currentPage = page;
    fetchCharacters(page);
}

function searchCharacters() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) {
        alert('⚠️ Please enter a character name to search'); 
        return;
    }

    searchQuery = searchInput;
    isSearching = true;
    currentPage = 1;
    document.getElementById('welcomeMessage').style.display = 'none';

    const errorDiv = document.getElementById('error');
    errorDiv.style.display = 'none';
    errorDiv.textContent = '';

    fetchCharacters();
}


document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchCharacters();
});

const music = document.getElementById('bgMusic');


music.play().catch(() => {
    const playMusic = () => {
        music.play();
        document.removeEventListener('click', playMusic);
        document.removeEventListener('keydown', playMusic);
    };
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
});

function fadeOut(element, callback) {
    element.classList.remove('show'); 
    setTimeout(() => {
        element.style.display = 'none';
        if (callback) callback();
    }, 800); 
}

function fadeIn(element) {
    element.style.display = 'block';
    setTimeout(() => {
        element.classList.add('show');
    }, 50); 
}


function goToCatalog() {
    const homepage = document.getElementById('homepage');
    const catalog = document.getElementById('catalog');
    const navbar = document.getElementById('catalogNavbar');

    fadeOut(homepage, () => {
        fadeIn(catalog);
        navbar.style.display = 'flex';
    });
}


function goToHome() {
    const homepage = document.getElementById('homepage');
    const catalog = document.getElementById('catalog');
    const navbar = document.getElementById('catalogNavbar');

    navbar.style.display = 'none';
    fadeOut(catalog, () => fadeIn(homepage));
}

function applyFilters() {
    
    if (!isSearching || !searchQuery) {
        alert('⚠️ Please search for a character first before using the filter.');
        document.getElementById('statusFilter').value = '';
        return;
    }

    statusFilter = document.getElementById('statusFilter').value;
    currentPage = 1;
    fetchCharacters();
}

card.addEventListener('click', () => {
    card.classList.add('active');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
});

overlay.addEventListener('click', () => {
    const activeCard = document.querySelector('.character-card.active');
    if (activeCard) activeCard.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = 'auto'; 
});

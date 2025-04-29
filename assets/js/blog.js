// ====== Pagination dynamique depuis blogs.json ======

// Nombre d'articles affichés par page
const articlesPerPage = 6;

// Variables globales
let articles = [];
let totalPages = 0;

// Récupère le JSON et initialise la pagination
function initPagination() {
  fetch('assets/data/blogs.json')
    .then(res => res.json())
    .then(data => {
      articles = data;
      totalPages = Math.ceil(articles.length / articlesPerPage);
      changePage(1);  // démarre sur la page 1
    })
    .catch(err => console.error('Erreur de chargement JSON :', err));
}

// Affiche les liens de pagination
function renderPagination(currentPage) {
  const paginationElement = document.querySelector('#blog-pagination .pagination');
  let html = '';

  // Bouton Précédent
  html += `<li class="page-item${currentPage === 1 ? ' disabled' : ''}">
             <a href="#" class="page-link" onclick="changePage(${currentPage - 1})" aria-label="Précédent">
               <i class="bi bi-chevron-left"></i>
             </a>
           </li>`;

  // Numéros de page
  for (let i = 1; i <= totalPages; i++) {
    html += `<li class="page-item${i === currentPage ? ' active' : ''}">
               <a href="#" class="page-link" onclick="changePage(${i})">${i}</a>
             </li>`;
  }

  // Bouton Suivant
  html += `<li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
             <a href="#" class="page-link" onclick="changePage(${currentPage + 1})" aria-label="Suivant">
               <i class="bi bi-chevron-right"></i>
             </a>
           </li>`;

  paginationElement.innerHTML = html;
}

// Change de page : affiche les articles et met à jour la pagination
function changePage(pageNumber) {
  if (pageNumber < 1 || pageNumber > totalPages) return;

  // Calcul des indices
  const start = (pageNumber - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const subset = articles.slice(start, end);

  displayArticles(subset);
  renderPagination(pageNumber);
}

// Affiche les articles passés en argument
function displayArticles(list) {
  const row = document.querySelector('#blog-posts .row');
  row.innerHTML = '';  // vide la zone

  list.forEach(post => {
    const col = document.createElement('div');
    col.className = 'col-lg-4';
    col.innerHTML = `
      <article>
        <div class="post-img">
          <img src="${post.image}" alt="${post.title}" class="img-fluid">
        </div>
        <p class="post-category">${post.category}</p>
        <h2 class="title">
          <a href="${post.link}">${post.title}</a>
        </h2>
        <div class="d-flex align-items-center">
          <img src="${post.authorImage}" alt="${post.authorName}" class="img-fluid post-author-img flex-shrink-0">
          <div class="post-meta">
            <p class="post-author">${post.authorName}</p>
            <p class="post-date">
              <time datetime="${post.date}">${new Date(post.date).toLocaleDateString('fr-FR')}</time>
            </p>
          </div>
        </div>
      </article>
    `;
    row.appendChild(col);
  });
}

// Au chargement de la page, on initialise tout
document.addEventListener('DOMContentLoaded', initPagination);

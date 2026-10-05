const keywords = document.querySelector('#keywords');
const products = [...document.querySelectorAll('.poly-prod')];
const categories = [...document.querySelectorAll('#categories a')];
let category = 'all';
const normalize = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').toLowerCase();
function filterProducts() {
    const query = normalize(keywords.value.trim());
    let count = 0;
    products.forEach((product) => {
        const match = (category === 'all' || product.dataset.category === category)
            && normalize(product.querySelector('.panel-title').textContent).includes(query);
        product.hidden = !match;
        if (match) count++;
    });
    document.querySelector('#empty-message').hidden = count > 0;
}
keywords.addEventListener('input', filterProducts);
document.querySelector('#search-form').addEventListener('submit', (event) => { event.preventDefault(); filterProducts(); });
categories.forEach((link) => link.addEventListener('click', () => {
    category = link.dataset.category;
    categories.forEach((item) => item.classList.toggle('active', item === link));
    filterProducts();
}));

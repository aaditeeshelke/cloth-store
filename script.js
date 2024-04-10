document.addEventListener('DOMContentLoaded', function() {
    let clothingData;
    let cartItems = [];
    const clothingContainer = document.getElementById('clothingContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryButtons = document.querySelectorAll('.filter-buttons button');
    
    // Fetch clothing data
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            clothingData = data.categories;
            renderClothingItems(clothingData);
        })
        .catch(error => console.error('Error fetching data:', error));

    // Render clothing items
    function renderClothingItems(data) {
        clothingContainer.innerHTML = '';
        data.forEach(category => {
            category.category_products.forEach(product => {
                if (!searchInput.value.trim() || 
                    product.title.toLowerCase().includes(searchInput.value.trim().toLowerCase()) || 
                    product.vendor.toLowerCase().includes(searchInput.value.trim().toLowerCase()) || 
                    category.category_name.toLowerCase().includes(searchInput.value.trim().toLowerCase())) {
                    const card = createClothingCard(product);
                    clothingContainer.appendChild(card);
                }
            });
        });
        // Add event listeners to Add to Cart buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', addToCart);
        });
    }

    // Create clothing card
    function createClothingCard(product) {
        const card = document.createElement('div');
        card.classList.add('clothing-card');
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <h2>${product.vendor}</h2>
            ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
            <button class="add-to-cart-btn" data-id="${product.id}" data-price="${product.price}">Add to Cart</button>
        `;
        return card;
    }

    // Add item to cart
    function addToCart(event) {
        const productId = event.target.dataset.id;
        const productPrice = parseFloat(event.target.dataset.price);

        // Find the product in clothingData
        const product = clothingData.flatMap(category => category.category_products).find(p => p.id === productId);

        // Add product to cartItems
        cartItems.push(product);
    }

    // Filter clothing items
    function filterClothing(event) {
        const categoryName = event.target.innerText;
        renderClothingItems(clothingData.filter(cat => cat.category_name === categoryName));
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
    }

    // Search clothing items
    searchInput.addEventListener('input', function() {
        renderClothingItems(clothingData);
    });

    // Add event listener for category buttons
    categoryButtons.forEach(btn => btn.addEventListener('click', filterClothing));

    // View Cart button event listener
    document.getElementById('viewCartBtn').addEventListener('click', function() {
        // Store cart items in local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        // Redirect to cart page
        window.location.href = 'cart.html';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Render cart items
    renderCart();

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cartItems.forEach(item => {
            const card = createClothingCard(item);
            cartItemsContainer.appendChild(card);
            totalPrice += parseFloat(item.price);
        });

        cartTotal.textContent = totalPrice.toFixed(2);
    }

    // Create clothing card
    function createClothingCard(product) {
        const card = document.createElement('li');
        card.classList.add('cart-item');
        card.innerHTML = `
            <div class="cart-item-details">
                <img src="${product.image}" alt="${product.title}">
                <div class="cart-item-info">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>
                    <h4>${product.vendor}</h4>
                    ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
                </div>
            </div>
        `;
        return card;
    }
});

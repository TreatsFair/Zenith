let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow-items');
const dots = document.querySelectorAll('.dot');

let timeoutId = null;

showSlides();

function plusSlides(n) {
    slideIndex += n;
    clearTimeout(timeoutId);
    showSlides();
}

function minusSlides(n) {
    slideIndex -= n;
    clearTimeout(timeoutId);
    showSlides();
}

function currentSlide(n) {
    slideIndex = n;
    clearTimeout(timeoutId);
    showSlides();
}

function showSlides() {
    if (slideIndex >= slides.length) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = slides.length - 1 }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove('active');
        slides[i].style.display = 'none';  // Ensure all slides are hidden
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove('active');
    }

    slides[slideIndex].classList.add('active');
    slides[slideIndex].style.display = 'flex';  // Display the current slide
    dots[slideIndex].classList.add('active');

    timeoutId = setTimeout(() => {
        slideIndex++;
        showSlides();
    }, 7000); // Change slide every 4 seconds
}


//cart

    // Cart functionality
    let iconCart = document.querySelector('.icon-cart');
    let closeCart = document.querySelector('.close-cart');
    let checkout = document.querySelector('.checkout-button');
    let body = document.querySelector('body');

    // Load cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    iconCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

    closeCart.addEventListener('click', () => {
        body.classList.toggle('showCart');
    });

  
    checkout.addEventListener('click', () => {
        alert('Purchase has been made!');
        clearCart();
    });

    function addToCart(event) {
        const productElement = event.target.closest('.product-item, .product1-item');
        const productName = productElement.querySelector('h4, .product1-name').innerText;
        const productPrice = productElement.querySelector('.price-font, .product1-price').innerText;
        const productImage = productElement.querySelector('img').src;

        const product = {
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        };

        const existingProductIndex = cart.findIndex(item => item.name === productName);
        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartDisplay();
        updateCartCount();
    }

    function updateCartDisplay() {
        const cartContent = document.querySelector('.cart-content');
        cartContent.innerHTML = '';

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-items');
            cartItem.innerHTML = `
                <div class="cart-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-name">
                    ${item.name}
                </div>
                <div class="cart-price">
                    ${item.price}
                </div>
                <div class="cart-quantity">
                    <span class="minus" onclick="updateQuantity(${index}, -1)"><</span>
                    <span>${item.quantity}</span>
                    <span class="add" onclick="updateQuantity(${index}, 1)">></span>
                </div>
            `;
            cartContent.appendChild(cartItem);
        });
    }

    function updateQuantity(index, delta) {
        cart[index].quantity += delta;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.innerText = totalItems;
    }

    // Add event listeners to all "Add to Cart" buttons
    document.querySelectorAll('.product-btn, .add-to-cart-button').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Initialize cart display and count
    updateCartDisplay();
    updateCartCount();

    // Make updateQuantity function globally accessible
    window.updateQuantity = updateQuantity;

    function clearCart() {
        cart = []; // Empty the cart array
        updateCartDisplay(); // Update the cart display to reflect the empty cart
        updateCartCount(); // Update the cart count to reflect the empty cart
    }


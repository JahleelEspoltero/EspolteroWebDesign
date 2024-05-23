document.addEventListener('DOMContentLoaded', () => {
    // Cart Open Close
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");

    // Open Cart
    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    // Close Cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

     // Handle "Pay Now" button click
     var payNowButton = document.querySelector('.btn-buy');
     payNowButton.addEventListener('click', function() {
         window.location.href = 'checkout.html';
     });

    // Cart Working JS
    function ready() {
        // Remove Item From Cart
        var removeCartButtons = document.getElementsByClassName('cart-remove');
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener('click', removeCartItem);
        }

        // Quantity Change
        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }

        // Add to cart
        var addCart = document.getElementsByClassName('add-cart');
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener('click', addCartClicked);
        }

        // Load cart items
        loadCartItems();

        // Update cart icon
        updateCartIcon();
    }

    // Call ready function
    ready();

    // Remove Cart Item
    function removeCartItem(event) {
        var buttonClicked = event.target;
        buttonClicked.parentElement.remove();
        updateTotal();
        saveCartItems();
        updateCartIcon();
    }

    // Quantity Changed
    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
        saveCartItems();
        updateCartIcon();
    }

    // Add Cart Function
    function addCartClicked(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.querySelector('.product-title').innerText;
        var price = shopProducts.querySelector('.price').innerText;
        var productImg = shopProducts.querySelector('.product-img').src;
        var size = shopProducts.querySelector('select').value; // Get selected size
        addProductToCart(title, price, productImg, size); // Pass size to addProductToCart function
        updateTotal();
        saveCartItems();
        updateCartIcon();
    }

    function addProductToCart(title, price, productImg, size) {
        var cartContent = document.querySelector('.cart-content');
        var cartItems = cartContent.getElementsByClassName('cart-box');

        // Check if item with the same size is already in the cart
        for (var i = 0; i < cartItems.length; i++) {
            var cartItem = cartItems[i];
            var cartTitle = cartItem.querySelector('.cart-product-title').innerText;
            var cartSize = cartItem.querySelector('.cart-product-size').innerText;

            if (cartTitle === title && cartSize === size) {
                alert('You have already added this item with the same size to your cart.');
                return;
            }
        }

        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');
        var cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img" />
            <div class="detail-box">
                <div class="cart-product-title">${title}</div>
                <div class="cart-product-size">${size}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i class="bx bx-trash-alt cart-remove"></i>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartContent.appendChild(cartShopBox);
        cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
        updateCartIcon();
    }

    // Update Total
    function updateTotal() {
        var cartContent = document.querySelector('.cart-content');
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var total = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var priceElement = cartBox.querySelector('.cart-price');
            var quantityElement = cartBox.querySelector('.cart-quantity');
            var price = parseFloat(priceElement.innerText.replace('₱', ''));
            var quantity = quantityElement.value;
            total += price * quantity;
        }
        total = Math.round(total * 100) / 100;
        document.querySelector('.total-price').innerText = '₱' + total.toFixed(2); // Ensure two decimal places

        // Save total to localStorage
        try {
            localStorage.setItem('cartTotal', total.toFixed(2));
        } catch (e) {
            console.error('Could not save cart total:', e);
        }
    }

    // Keep Item in cart when page refresh with localstorage
    function saveCartItems() {
        var cartContent = document.getElementsByClassName('cart-content')[0];
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var cartItems = [];

        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var titleElement = cartBox.querySelector('.cart-product-title');
            var sizeElement = cartBox.querySelector('.cart-product-size');
            var priceElement = cartBox.querySelector('.cart-price');
            var quantityElement = cartBox.querySelector('.cart-quantity');
            var productImg = cartBox.querySelector('.cart-img').src;

            var item = {
                title: titleElement.innerText,
                size: sizeElement.innerText,
                price: priceElement.innerText,
                quantity: quantityElement.value,
                productImg: productImg,
            };
            cartItems.push(item);
        }

        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (e) {
            console.error('Could not save cart items:', e);
        }
    }

    // Loads in Cart
    function loadCartItems() {
        try {
            var cartItems = localStorage.getItem('cartItems');
            if (cartItems) {
                cartItems = JSON.parse(cartItems);

                for (var i = 0; i < cartItems.length; i++) {
                    var item = cartItems[i];
                    addProductToCart(item.title, item.price, item.productImg, item.size);

                    var cartBoxes = document.getElementsByClassName('cart-box');
                    var cartBox = cartBoxes[cartBoxes.length - 1];
                    var quantityElement = cartBox.querySelector('.cart-quantity');
                    quantityElement.value = item.quantity; // Set the input value
                }
            }

            var cartTotal = localStorage.getItem('cartTotal');
            if (cartTotal) {
                document.querySelector('.total-price').innerText = "₱" + cartTotal;
            }
            updateCartIcon();
        } catch (e) {
            console.error('Could not load cart items:', e);
        }
    }

    // Update Cart Icon
    function updateCartIcon() {
        var cartContent = document.querySelector('.cart-content');
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        var totalQuantity = 0;
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var quantityElement = cartBox.querySelector('.cart-quantity');
            var quantity = parseInt(quantityElement.value);
            totalQuantity += quantity;
        }
        document.querySelector('#cart-icon').setAttribute('data-quantity', totalQuantity);
    }
});


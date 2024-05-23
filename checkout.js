document.addEventListener('DOMContentLoaded', () => {
    let cartIcon = document.querySelector("#cart-icon");
    let cart = document.querySelector(".cart");
    let closeCart = document.querySelector("#close-cart");
    let totalPriceElements = document.querySelectorAll('.total-price, .total-price2');
    let cartItemsList = document.querySelector('#cart-items-list');
    let payNowButton = document.querySelector('#pay-now-button');

    cartIcon.onclick = () => {
        cart.classList.add("active");
    };

    closeCart.onclick = () => {
        cart.classList.remove("active");
    };

    payNowButton.addEventListener('click', () => {
        alert('Proceeding to payment...');
        // Redirect to success page
        window.location.href = 'success.html';
    });

    function ready() {
        var removeCartButtons = document.querySelectorAll('.cart-remove');
        for (var i = 0; i < removeCartButtons.length; i++) {
            var button = removeCartButtons[i];
            button.addEventListener('click', removeCartItem);
        }

        var quantityInputs = document.getElementsByClassName('cart-quantity');
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }

        var addCart = document.getElementsByClassName('add-cart');
        for (var i = 0; i < addCart.length; i++) {
            var button = addCart[i];
            button.addEventListener('click', addCartClicked);
        }

        loadCartItems();
        updateCartIcon();
        updateTotal(); // Initial update of total price
    }

    ready();

    function removeCartItem(event) {
        var buttonClicked = event.target;
        var cartBox = buttonClicked.closest('.cart-box');
        var priceElement = cartBox.querySelector('.cart-price');
        var quantityElement = cartBox.querySelector('.cart-quantity');
        var price = parseFloat(priceElement.innerText.replace('₱', ''));
        var quantity = parseInt(quantityElement.value);
    
        cartBox.remove(); // Remove the cart item from UI
    
        // Update total price
        updateTotal();
    
        // Save and update the cart
        saveCartItems();
        updateCartIcon();
        renderCartItemsList();
    }

    function quantityChanged(event) {
        var input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateTotal();
        saveCartItems();
        updateCartIcon();
        renderCartItemsList();
    }

    function addCartClicked(event) {
        var button = event.target;
        var shopProducts = button.parentElement;
        var title = shopProducts.querySelector('.product-title').innerText;
        var price = shopProducts.querySelector('.price').innerText;
        var productImg = shopProducts.querySelector('.product-img').src;
        var size = shopProducts.querySelector('select').value;
        addProductToCart(title, price, productImg, size);
        updateTotal();
        saveCartItems();
        updateCartIcon();
        renderCartItemsList();
    }

    function addProductToCart(title, price, productImg, size) {
        var cartContent = document.querySelector('.cart-content');
        var cartItems = cartContent.getElementsByClassName('cart-box');

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
            <table>
                <tr>
                    <td><img src="${productImg}" alt="" class="cart-img"></td>
                    <td>
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-product-size">${size}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                    </td>
                    <td><i class="bx bx-trash-alt cart-remove"></i></td>
                </tr>
            </table>`;
        cartShopBox.innerHTML = cartBoxContent;
        cartContent.appendChild(cartShopBox);
        cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
    }

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
    totalPriceElements.forEach(el => el.innerText = '₱' + total.toFixed(2));

    try {
        localStorage.setItem('cartTotal', total.toFixed(2));
    } catch (e) {
        console.error('Could not save cart total:', e);
    }
}

    function saveCartItems() {
        var cartContent = document.querySelector('.cart-content');
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
                    quantityElement.value = item.quantity;
                }
            }

            var cartTotal = localStorage.getItem('cartTotal');
            if (cartTotal) {
                totalPriceElements.forEach(el => el.innerText = "₱" + cartTotal);
            }
            updateCartIcon();
            renderCartItemsList();
        } catch (e) {
            console.error('Could not load cart items:', e);
        }
    }

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

    function renderCartItemsList() {
        cartItemsList.innerHTML = ''; // Clear existing items
        var cartContent = document.querySelector('.cart-content');
        var cartBoxes = cartContent.getElementsByClassName('cart-box');
        for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var title = cartBox.querySelector('.cart-product-title').innerText;
            var size = cartBox.querySelector('.cart-product-size').innerText;
            var price = cartBox.querySelector('.cart-price').innerText;
            var quantity = cartBox.querySelector('.cart-quantity').value;
            var productImg = cartBox.querySelector('.cart-img').src;

            var tr = document.createElement('tr');
            tr.innerHTML = `
                <td><img src="${productImg}" alt="" style="width: 100px;"></td>
                <td>${title}</td>
                <td>${size}</td>
                <td>${price}</td>
                <td>${quantity}</td>
                <td></td>
            `;
            cartItemsList.appendChild(tr);

            // Add remove button event listener to newly added item
            tr.querySelector('.cart-remove').addEventListener('click', removeCartItem);
        }

        updateTotal(); // Update total after rendering list
    }

    document.querySelector('.btn-buy').addEventListener('click', renderCartItemsList);
});

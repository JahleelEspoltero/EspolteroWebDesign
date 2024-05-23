document.addEventListener('DOMContentLoaded', () => {
    // Fetch items from localStorage
    loadCartItems();

    // Function to load cart items
    function loadCartItems() {
        try {
            var cartItems = localStorage.getItem('cartItems');
            if (cartItems) {
                cartItems = JSON.parse(cartItems);
                var cartItemsList = document.getElementById('cart-items-list');
                cartItemsList.innerHTML = ''; // Clear previous items

                cartItems.forEach(item => {
                    var li = document.createElement('li');
                    li.innerHTML = `
                        <div class="cart-item">
                            <img src="${item.productImg}" alt="${item.title}" class="cart-item-img">
                            <div class="cart-item-details">
                                <div class="cart-item-title">${item.title}</div>
                                <div class="cart-item-size">Size: ${item.size}</div>
                                <div class="cart-item-price">Price: ${item.price}</div>
                                <div class="cart-item-quantity">Quantity: ${item.quantity}</div>
                                <div class="cart-item-quantity"> &nbsp; </div>
                                <div class="cart-item-quantity">Total: ${item.price * item.quantity}</div>
                            </div>
                        </div>
                    `;
                    cartItemsList.appendChild(li);
                });
            }
        } catch (e) {
            console.error('Could not load cart items:', e);
        }

        // Update total in the cart
        updateTotal();

        // Update total in the checkout form
        updateCheckoutTotal();
    }

    // Handle form submission
    var paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        var paymentMethod = document.querySelector('input[name="payment-method"]:checked');
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        var paymentValue = paymentMethod.value;

        if (paymentValue === 'gcash') {
            var phone = document.getElementById('gcash-number').value;
            alert(`Payment successful via GCash with phone number: ${phone}. Redirecting to thank you page...`);
            window.location.href = 'success.html'; // Redirect to thank you page
        } else if (paymentValue === 'bank-transfer') {
            var bankName = document.getElementById('bank-name').value;
            var accountName = document.getElementById('account-name').value;
            var accountNumber = document.getElementById('account-number').value;
            alert(`Payment successful via Bank Transfer. Bank Name: ${bankName}, Account Name: ${accountName}, Account Number: ${accountNumber}. Redirecting to thank you page...`);
            window.location.href = 'success.html'; // Redirect to thank you page
        } else {
            window.location.href = 'cancel.html'; // Redirect to cancel page if no payment method selected
        }
    });

    // Toggle display based on selected payment method
    var paymentMethodSelect = document.getElementById('payment-method');
    var gcashPaymentDiv = document.getElementById('gcash-payment');
    var bankTransferDiv = document.getElementById('bank-transfer-details');

    paymentMethodSelect.addEventListener('change', function() {
        var selectedMethod = paymentMethodSelect.value;

        if (selectedMethod === 'gcash') {
            gcashPaymentDiv.style.display = 'block';
            bankTransferDiv.style.display = 'none';
        } else if (selectedMethod === 'bank-transfer') {
            gcashPaymentDiv.style.display = 'none';
            bankTransferDiv.style.display = 'block';
        }
    });

    // Update checkout form total
    function updateCheckoutTotal() {
        var cartTotal = localStorage.getItem('cartTotal');
        if (cartTotal) {
            var totalElement = document.querySelector('.total-price');
            if (totalElement) {
                totalElement.innerText = "₱" + cartTotal;
            } else {
                console.error('Total price element not found.');
            }
        } else {
            console.error('Cart total not found in localStorage.');
        }
    }

    // Update total in the cart
    function updateTotal() {
        var cartItems = localStorage.getItem('cartItems');
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
            var total = 0;
            cartItems.forEach(item => {
                total += parseFloat(item.price) * parseInt(item.quantity);
            });
            total = Math.round(total * 100) / 100;
            var totalToPayElement = document.querySelector('.total-price');
            if (totalToPayElement) {
                totalToPayElement.innerText = '₱' + total.toFixed(2); // Ensure two decimal places
            } else {
                console.error('Total price element not found.');
            }

            // Save total to localStorage
            try {
                localStorage.setItem('cartTotal', total.toFixed(2));
            } catch (e) {
                console.error('Could not save cart total:', e);
            }
        } else {
            console.error('Cart items not found in localStorage.');
        }
    }

});

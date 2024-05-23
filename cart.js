const payBtn = document.querySelector('.btn-buy');

if (payBtn) {
    payBtn.addEventListener('click', () => {
        const cartItems = localStorage.getItem('cartItems');

        if (cartItems) {
            fetch('/stripe-checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: JSON.parse(cartItems),
                }),
            })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                if (data.url) {
                    location.href = data.url;
                } else {
                    throw new Error('Response does not contain URL');
                }
            })
            .catch((err) => console.error('Fetch error:', err));
        } else {
            console.error('No items in cart');
        }
    });
} else {
    console.error('Button with class .btn-buy not found');
}

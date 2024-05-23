document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    const searchButton = document.querySelector('.search-bar button[type="submit"]');
    const suggestionsContainer = document.querySelector('.search-suggestions');

    const productData = [
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj8Z6gk47T2LMbZJHMDC5anOy-xKjLWtOm7D7-H18zy03SL0io3WHCL6I2Fy0yb0QtgajKqMkkWd6MaCII4cnj2MOmrL-EvqSREjv6NXXixZQBgYiwQ4KLKIoKXmWJUqrM4GQw_36otc1blsQxbW621ungMMbDCdOId_A9FQft6Y3jL45aeYqwE5HauUixE/s2000/spursjersey.png',
            title: 'Victor Wembanyama "Mars Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'product-details-dunklowpanda.html'
        },
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgVX2ExZmPHQcV-1tndcXajgSNzXpZ19TE1eQ6zZY88hMnC9sc-PauOMQhsogsF_3y1LFs0TBu_6sWu2XwymgRbG-XLQuy-CDSu2VC1SUbjjovhLaGreUyrNJnF6iseUjVSgm1msXDTmMRMvviJn8v7s-M9lLISI87xeyoUQ0wnRU2v6xpzJ_PU5OVaCB0c/s2000/okcjersey.png',
            title: 'Chet Holmgren "Reeses Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'https://example.com/product2'
        },
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOAd3fXgSd4kXXrgpUZVo5e3EPGWmglhrQpuDriHmOAhSg9TwW5tHOCAzcfIdsjmcDmWHE7lilDtC8IEBQIfB2L7fQiAZGxu2OmhewsqTZQbj8Mvk2wcHgiIWkpdenqet8BUZYA9Nr2j18EiZaE6BEXJk7ryC90-Q0TC1bx1tg97Tl2UaOGEa7T_xsXbWM/s2000/mavsjersey.png',
            title: 'Luka Dončić "Crunch Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'product-details-dunklowpurple.html'
        },
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEitAnmb73VnoQ0_Sz08NqZCtxHBLAmcikLdg_NA0NevwczrASJ0yIuybaZWBtcnvrak3zsak593gNb6ue5fOqa7tqfyMdxkUzOoe6rhvOXv4o5gq10JtuzMyAbJuwmRGcf8BUZYA9Nr2j18EiZaE6BEXJk7ryC90-Q0TC1bx1tg97Tl2UaOGEa7T_xsXbWM/s2000/lakersjersey.png',
            title: 'Lebron James "M&M\'s Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'https://example.com/product4'
        },
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj3VUHoCjxCUY_DpjbmOkyxrbbdeq4xn0Feui7CjbPoKIau0n85mppujN6yHkGPQW7OBtL7TeHogd_DiSSvarSgPqeITL2lG3hUxzUv00iCG0NQFVSs-bh76zn413xw1KM6nepDWJ93Tqhd9loa4saQrAxgrD_rd2IYgxqJRyUClij13t7Qbm60U_Q8LiHx/s2000/milwaukeejersey.png',
            title: 'Damian Lillard "Hershey\'s Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'https://example.com/product5'
        },
        {
            image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVULjt58vSPMJLUbLwGpqtUGKzq8vAr5GAvXFyWAKbSDRzjfFTbziNZ0usr2WvCOL4dEeefdti7l8lZkMqASe8gYIbdvqRwZw1ARy3GjoeCAt3yUXVbXC9p0P5ZUYBvZvKDNs8VYjCbOR0yof05GsmDys2T6O0Et8HCYh7gclG5T2Wr9i8eYdyenSrMTuL/s2000/kingsjersey.png',
            title: 'De\'Aaron Fox "Cadbury Chocolate Jersey Concept"',
            description: 'Your Sweetest Jersey came in town.',
            price: '₱680.00',
            link: 'https://example.com/product6'
        }
    ];

    searchButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        const searchText = searchInput.value.trim().toLowerCase();

        const matchedProduct = productData.find(product => 
            product.title.toLowerCase().includes(searchText)
        );

        if (matchedProduct) {
            window.location.href = matchedProduct.link;
        } else {
            alert('No matching product found.');
        }
    });

    searchInput.addEventListener('input', function() {
        const searchText = searchInput.value.trim().toLowerCase();
        suggestionsContainer.innerHTML = ''; // Clear previous suggestions

        if (searchText) {
            const matchedProducts = productData.filter(product => 
                product.title.toLowerCase().includes(searchText) || 
                product.description.toLowerCase().includes(searchText)
            );

            matchedProducts.forEach(product => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('search-suggestion');
                suggestionItem.textContent = product.title;
                suggestionItem.addEventListener('click', () => {
                    window.location.href = product.link;
                });

                suggestionsContainer.appendChild(suggestionItem);
            });

            if (matchedProducts.length > 0) {
                suggestionsContainer.style.display = 'block';
            } else {
                suggestionsContainer.style.display = 'none';
            }
        } else {
            suggestionsContainer.style.display = 'none';
        }
    });
});

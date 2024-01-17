let originalData = [];
document.addEventListener('DOMContentLoaded', fetchData);

async function fetchData() {
    try {
        const response = await fetch('https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        data = await response.json();
        originalData =data.data;
        console.log("API Data:", data);
         // Log the entire response for debugging
         console.log(originalData);

        // Check if 'data' property exists and is an array
        if (data && Array.isArray(data.data)) {
            console.log("Fetching data successful");
            displayData(data.data);
        } else {
            throw new Error("API response does not contain the expected 'data' property or 'data' is not an array");
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayData(products) {
    const cardContainer = document.getElementById('card-container');

    // Clear existing content in the cardContainer
    cardContainer.innerHTML = '';

    // Iterate through the products and create card containers
    products.forEach(product => {
        // Create a card container
        const card = document.createElement('div');
        card.classList.add('card');

        // Create an image element
        const badgeElement = document.createElement('span');
        badgeElement.textContent = product.product_badge;
        badgeElement.classList.add('badge');


        const imageElement = document.createElement('img');
        imageElement.src = product.product_image;
        imageElement.alt = product.product_title;
        imageElement.onerror = function () {
            console.error(`Error loading image: ${product.product_image}`);
            imageElement.src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        };

        const contentContainer = document.createElement('div');
        contentContainer.classList.add('content-container');

        // Create a title element
        const titleElement = document.createElement('h4');
        titleElement.textContent = product.product_title;

        // Create a badge element
        

        // Create a variant list
        const variantList = document.createElement('ul');
        product.product_variants.forEach(variant => {
            const variantItem = document.createElement('li');
            variantItem.textContent = Object.values(variant)[0];
            variantList.appendChild(variantItem);
        });
        contentContainer.appendChild(titleElement);
        contentContainer.appendChild(variantList);

       

        // Append elements to the card container
        card.appendChild(imageElement);
       
        card.appendChild(badgeElement);
        card.appendChild(contentContainer);
        
        // Append the card container to the cardContainer
        cardContainer.appendChild(card);
    });
    cardContainer.appendChild(cardsWrapper);
}

function filterProducts(searchTerm) {
    console.log(searchTerm);
    const filteredData = originalData.filter(product => {
        // Implement your filtering logic based on product variants
        const variants = product.product_variants.map(variant => Object.values(variant)[0].toLowerCase());
        return variants.some(variant => variant.includes(searchTerm.toLowerCase()));
    });
    console.log("after applying filter",filteredData);

    displayData(filteredData);
}

function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) {
        return text;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<span style="background-color:green;">$1</span>');
}



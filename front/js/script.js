// DISPLAY ALL THE PRODUCTS ON THE HOME PAGE
// The name of the file must be script.js because in the index.html, at the bottom, the linked script folder is script.js
// to access to the products we have an url => "http://localhost:3000/api/products"
// our backend listens the port 3000 and to access to the products the root is '/api/products'
// In the frontend inspect and open NETWORK tab. You can see the products. 
// 1. Use fetch method, it is a simple GET request, FETCH() is returning a promise. 
// 2. Use then() which resolves the promise to a response
// 3. Response object has a json method which is used to parse the response's body to a js object. Here json method will give me an array that holds my products. 
// 4. json method returns also a promise, so use another then() to catch the array of products with the variable "data" that I have as an argument

let url = 'http://localhost:3000/api/products';

function fetchData() {
    // fetch(url);
    // If I console it, it turns a promise with an initial pending status. 
    console.log(fetch(url));
    fetch(url).then(response => {
        console.log(response);
        if (!response.ok) {
            throw Error("ERROR");
        }
        // with this we will get another promis which means we need to wait. and we need to another then
        //  const data =  response.json();
        return response.json();
        //  console.log(data);
        // then return the response
    }).then(data => {
        // it will return data
        console.log(data);

        // Use "createElement", "appendChild", "setAttribute" Methods
        // setAttribute(name, value) => it adds the name of the attribute and its value, setAttribute("href", url)
        // createElement("img") => it adds an <img> element
        // appendChild => it adds your HTML elemnt to the existing HTML element
        // innerText gets the text which is between two tags
        // You can get this information from index.html and models/Product.js

        //use a loop type, I used forEach
        data.forEach(myProduct => {
            console.log(myProduct)
            // here a (product Link) is a main element
            let productLink = document.createElement('a');
            productLink.setAttribute('href', `product.html?id=${myProduct._id}`);
            document.getElementById('items').appendChild(productLink);

            // article is child element of the a (product link)
            let article = document.createElement('article');
            productLink.appendChild(article);
            // image is child element of the article
            let image = document.createElement('img');
            image.setAttribute('src', myProduct.imageUrl);
            image.setAttribute('alt', myProduct.altTxt)
            article.appendChild(image);

            let title = document.createElement('h3');
            // title.setAttribute('class', 'productName');
            title.getElementsByClassName('productName');
            article.appendChild(title);
            title.innerText = myProduct.name;

            // you can use innerText or innerHTML, they are same thing
            let description = document.createElement('p');
            description.getElementsByClassName('productDescription');
            article.appendChild(description);
            description.innerHTML = myProduct.description;

        });

        // Then catch the errors
    }).catch(error => {
        console.log(error);
        alert("⚠️ Error! Fetch()!")
    });
}
fetchData();
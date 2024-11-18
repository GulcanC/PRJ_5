// xproducts for normals, xproduct for 
// here the important thing is the key and value name in the local storage. 
// When I send the selected items to local storage, I gave the name for the key "selectedPrd", it is importrant. 
// And this selected product has a value which contains, productId, productColor, productQty, these names are also important. I can not change them in the cart.js
// they come from the product.js => 
/*   let productObj = {
       productId: productId,
       productColor: color.value,
       productQty: Number(quantity.value),
   } */
// here xproduct and xproducts are not important, but you have to put xproduct for accesing the object which was created in product.js
// xProduct for productId, productColor, productQty
// for others which comes from Product.js like colors, name, description; altTxt, imageUrl, use xProducts


let prdLocalStorageStr = localStorage.getItem('selectedPrd');
console.log(prdLocalStorageStr); // string

let prdLocalStorage = JSON.parse(prdLocalStorageStr)
console.log(prdLocalStorage);  // array

// here xProduct name is not important, but use it for keys => imageUrl, altTxt, description, name
if (prdLocalStorage) {
    // you can remove the name of the function "callBack"
    prdLocalStorage.forEach(function callBack(xProduct, index) {
        let url = `http://localhost:3000/api/products/${xProduct.productId}`;
        console.log(url)

        fetch(url)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
            })
            // here the xProducts name is not important, but you have to use it for keys comes from the object => productId, productColor, productQty
            .then(function (xProducts) {

                // get all elements from cart.html


                // xProduct => productId, productColor, productQty
                // xProducts =>altText, imageUrl, name, description
                // article
                let article = document.createElement('article');
                article.setAttribute('data-id', xProduct.productId);
                article.setAttribute('data-color', xProduct.productColor);
                article.setAttribute('class', 'cart__item');
                document.getElementById('cart__items').appendChild(article);
                console.log(article)

                // first div => under the article
                let divFirstChild1 = document.createElement('div');
                divFirstChild1.setAttribute('class', "cart__item__img");
                article.appendChild(divFirstChild1);
                console.log(divFirstChild1)

                // img inside div1
                let image = document.createElement('img');
                image.setAttribute('alt', xProducts.altTxt);
                image.setAttribute('src', xProducts.imageUrl);
                divFirstChild1.appendChild(image);
                console.log(image)

                // second div => under the article
                let divFirstChild2 = document.createElement('div');
                divFirstChild2.setAttribute('class', 'cart__item__content')
                article.appendChild(divFirstChild2);
                console.log(divFirstChild2)

                // first div => under the second div
                let divSecondChild1 = document.createElement('div');
                divSecondChild1.setAttribute('class', 'cart__item__content__description')
                divFirstChild2.appendChild(divSecondChild1);

                // h2 (title), p (color), p (price) under divSecondChild1
                let h2 = document.createElement('h2');
                divSecondChild1.appendChild(h2);
                h2.innerHTML = xProducts.name;

                // here take attention, I used xProduct, because it comes from obj
                let pColor = document.createElement('p');
                divSecondChild1.appendChild(pColor);
                pColor.innerText = xProduct.productColor;

                let pPrice = document.createElement('p');
                divSecondChild1.appendChild(pPrice);
                pPrice.innerText = xProducts.price;

                // second div under the second div
                let divSecondChild2 = document.createElement('div');
                divSecondChild2.setAttribute('class', 'cart__item__content__settings');
                divFirstChild2.appendChild(divSecondChild2);

                // first div under second child div
                let divThirdChild1 = document.createElement('div');
                divThirdChild1.setAttribute('class', 'cart__item__content__settings__quantity');
                divSecondChild2.appendChild(divThirdChild1);

                // p (quantity) and input under third child div element
                let pQty = document.createElement('p');
                divThirdChild1.appendChild(pQty);
                pQty.innerText = "Quantity: ";

                let input = document.createElement('input');
                divThirdChild1.appendChild(input);
                input.setAttribute('type', 'number');
                // or => input.className = "itemQuantity"
                input.setAttribute('class', 'itemQuantity');
                input.setAttribute('name', 'itemQuantity');
                input.setAttribute('min', '1');
                input.setAttribute('max', '100');
                // or => input.value = xProduct.productQty
                input.setAttribute('value', xProduct.productQty);

                // second div under under second child div
                let divThirdChild2 = document.createElement('div');
                divThirdChild2.setAttribute('class', 'cart__item__content__settings__delete');
                divSecondChild2.appendChild(divThirdChild2);

                // p under second child div

                let pDelete = document.createElement('p');
                divThirdChild2.appendChild(pDelete);
                pDelete.innerText = "Delete ";
                pDelete.setAttribute('class', 'deleteItem');


            });
    });
}




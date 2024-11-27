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
                pPrice.innerText = xProducts.price + " Euro";

                // second div under the second div
                let divSecondChild2 = document.createElement('div');
                divSecondChild2.setAttribute('class', 'cart__item__content__settings');
                divFirstChild2.appendChild(divSecondChild2);

                // first div under second child div
                let divThirdChild1 = document.createElement('div');
                divThirdChild1.setAttribute('class', 'cart__item__content__settings__quantity');
                divSecondChild2.appendChild(divThirdChild1);

                // p (quantity) and input under third child div element
                let pQtyTitle = document.createElement('p');
                divThirdChild1.appendChild(pQtyTitle);
                pQtyTitle.innerText = "Quantity: ";

                let prdQty = document.createElement('input');
                divThirdChild1.appendChild(prdQty);
                prdQty.setAttribute('type', 'number');
                // or => prdQty.className = "itemQuantity"
                prdQty.setAttribute('class', 'itemQuantity');
                prdQty.setAttribute('name', 'itemQuantity');
                prdQty.setAttribute('min', '1');
                prdQty.setAttribute('max', '100');
                // or => prdQty.value = xProduct.productQty
                prdQty.setAttribute('value', xProduct.productQty);

                // second div under under second child div
                let divThirdChild2 = document.createElement('div');
                divThirdChild2.setAttribute('class', 'cart__item__content__settings__delete');
                divSecondChild2.appendChild(divThirdChild2);

                // p under second child div
                let pDelete = document.createElement('p');
                divThirdChild2.appendChild(pDelete);
                pDelete.innerText = "Delete ";
                pDelete.setAttribute('class', 'deleteItem');

                // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ modify quantity
                // use addEventListener() method which attaches an event handler to the specified element
                // element.addEvenetListener(event, function, useCapture), thi first parameter is the type of the event (HTML DOM Event) like click, mousedown, change, cut, copy, scroll, ...
                // we will use change HTML DOM event => the content of a form element has changed
                // here our element is prdQty, we have already created it in this section 
                // here prdQty is new Quantity or updated quantity, but productQty comes from the local storage, this was already stocked in the local storage

                prdQty.addEventListener('change', function (event) {
                    // event.stopPropagation()  => ornegin iki div elementin var. Bunlardan biri parent, digeri child element. mesela parent icin bir event tanilandiysa, bu child icinde gecerli olacaktir.
                    // yani parent icindeki event child icindeki eventide gerceklestirecek. Bunu onlemek icin kullaniyoruz
                    event.stopPropagation();
                    console.log(typeof prdQty.value);
                    console.log(typeof Number(prdQty.value));

                    let updatedQty = Number(prdQty.value);

                    if (updatedQty <= 0) {
                        alert(' ⚠️ Negatif values and "0" are not acceptable !');
                        window.location.reload();
                    }

                    else if (updatedQty > 100) {
                        alert(' ⚠️ Product quantity can not be greater than 100!');
                        window.location.reload();
                    }

                    // here productQty comes from local storage. It takes the products from local storage according to index number, then if we increase or decrase product number, it will be updated in local storage
                    else if (updatedQty >= 1 && updatedQty <= 100) {
                        prdLocalStorage[index].productQty = updatedQty;
                        localStorage.setItem('selectedPrd', JSON.stringify(prdLocalStorage));
                        totalPrice();


                     alert(

                            `💜💜💜 The product quantitiy is updated!
                          
                            ✔️ Selected product quantity: ${updatedQty}
                            `
                        );

                        window.location.reload();

                    }

                    window.location.reload();
                    console.log(updatedQty)

                })
                console.log(prdLocalStorage[index])


                // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ delete product

                pDelete.addEventListener('click', () => {
                    // remove 1 element at index i, if you write 2 it will delete 2 elements, fonciton flech

                    prdLocalStorage.splice(index, 1);

                    // send the new data to the localStorage
                    localStorage.setItem('selectedPrd', JSON.stringify(prdLocalStorage));
                    console.log(prdLocalStorage)

                    alert("⚠️ The selected product will be deleted from your cart!");
                    window.location.reload();

                })


                // ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️ total price

                var inputQty = document.querySelectorAll('.itemQuantity');
                console.log(inputQty)
                function totalPrice() {

                    // determine total quantity and total price for the first time
                    let totalQuantity = 0;
                    let totalPrice = 0;

                    inputQty.forEach(element => {
                        totalQuantity += Number(inputQty[index].value);
                        totalPrice += Number((inputQty[index].value) * (xProducts.price))

                    });

                    let pTotalQty = document.getElementById('totalQuantity');
                    pTotalQty.innerHTML = totalQuantity;

                    let pTotalPrice = document.getElementById('totalPrice');
                    pTotalPrice.innerText = totalPrice;


                }

                totalPrice();

            });
    });
}

// FORM


// I will use regExText for three values; firstName, lastName and city
// It should be minimum three characters and max 10 characters

var regExText = /^[a-zA-Z\s\'\-]{3,10}$/; // use regExText for three values; firstName, lastName and city
var regExAddress = /^[0-9]{1,5}[" "]{1}[a-zA-z0-9/\\''(),-\s]{2,255}[" "]{1}[0-9]{5}$/;
var regExEmail = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

function validateFirstName() {

    let firstName = document.getElementById('firstName').value;
    console.log(firstName);

    // if input is valid, update page to show succesful entry
    if (regExText.test(firstName)) {

    document.getElementById('firstNameErrorMsg').innerHTML = "✅ First name is valid!"}

    else {
        document.getElementById('firstNameErrorMsg').innerText = "⚠️ Please enter a valid name using 3-10 characters! "
    }


}

function validateLastName() {

    let lastName = document.getElementById('lastName').value;
}



var formSubmitButton = document.querySelector('.cart__order__form');

formSubmitButton.addEventListener('change', function() {
    validateFirstName(firstName)

})






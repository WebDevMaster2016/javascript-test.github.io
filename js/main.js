const messArr = [
    {
        find_error_text: 'We are sorry, but according to the query you entered, there was no data to found!!!',
        filter_error_text: 'We are sorry, but according to the query you entered, there was no data to filter'
    }
];

function clearArray() {
    document.querySelector('.product-list').innerHTML = "";
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function printError(selector, mess) {
    const elem = document.querySelector(selector);
    const elemToInsert = document.createElement("p");

    elemToInsert.className = 'wrong-search-result';
    elemToInsert.innerHTML = mess;
    insertAfter(elem, elemToInsert);
}

function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}

var Product = function(product_id, product_name, shop_product_price, fabricator) {

    if(!fabricator) {
        fabricator = {
            name: 'no data provided',
            address: 'no data provided',
            rating: 'no data provided'
        }
    }

    // define private member
    var _provider_product_price = 1890;

    // define public members
    this.product_id = product_id || '0000';
    this.product_name = product_name;
    this.shop_product_price = shop_product_price;
    this.fabricator = fabricator;

    // define private method
    function povider_product_price() {
        return _provider_product_price;
    }

    // define privileged method
    this.my_povider_product_price = function() {
        return povider_product_price();
    };
};

// adding getDistinction method via object prototype
Product.prototype.getDistinction = function() {
    return this.my_povider_product_price() - this.shop_product_price;
};

var Manufacturer = function(name, address, rating) {
    this.name = name;
    this.address = address;
    this.rating = rating;
};

var objectsArray = [];

var lg = new Manufacturer('LG', 'USA', 10);
var philips = new Manufacturer('Philips', 'USA', 9);
var myProduct = new Product(1234, "My product name 1", 1450);
var myProduct1 = new Product(undefined, "My product name 2", 1550);
var myProduct2 = new Product(8967, "My product name 3", 1100, lg);
var myProduct3 = new Product(8512, "My product name 4", 900, philips);

objectsArray.push(myProduct, myProduct1, myProduct2, myProduct3);

// console.log(objectsArray);

var productsList = Object.assign({}, objectsArray);

var productsListJSON = JSON.stringify(productsList);

// console.log(productsListJSON);

/*Array.prototype.upDate = function() {
    return this.map(function(value) {
        var productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `<div class="product-card__id">Product ID: ${value.product_id}</div>
			        <h1 class="product-card__name">${value.product_name}</h1>
			        <p class="product-card__price">Price: ${value.shop_product_price}</p>
			        <p class="product-card__fabricator-name">Fabricator name - ${value.fabricator.name} </p>
			        <p class="product-card__fabricator-address">Fabricator address - ${value.fabricator.address}</p>
			        <p class="product-card__fabricator-rating">Fabricator rating - ${value.fabricator.rating}</p>`;
        document.querySelector('.product-list').appendChild(productCard);
        return productCard;
    });
    // return teastListNode;
};*/


// this requests the file and executes a callback with the parsed result once
//   it is available
fetchJSONFile('js/json/products.json', function(data){
    // do something with your data

    var jsonObj = JSON.parse(data);
    console.log(jsonObj);

    // document.querySelector('.product-list').innerHTML += data;
    // console.log(data);
});

/*
objectsArray.upDate();

// find
document.querySelector('.js-product-form__button--find').addEventListener('click', function() {

    function findPrice(value) {
        return value.shop_product_price === parseInt(document.getElementsByName('find-object')[0].value)
    }

    var objectsArrayNew = objectsArray.find(findPrice);

    if(objectsArrayNew !== undefined) {
        clearArray();
        [objectsArrayNew].upDate();
    } else {
        printError('.product-form--find', messArr[0].find_error_text)
    }

}, false);

// filter
document.querySelector('.js-product-form__button--filter').addEventListener('click', function() {

    function filterPrice(value) {
        return value.shop_product_price > parseInt(document.getElementsByName('filter-object')[0].value)
    }

    var result = objectsArray.filter(filterPrice);

    if(result.length > 0) {
        clearArray();
        result.upDate();
    } else {
        printError('.product-form--filter', messArr[0].filter_error_text);
    }
}, false);


var funcArr = [toSmall, toBig];

function toBig() {
    function compareNumbersToBig(a, b) {
        return a.product_id - b.product_id;
    }

    var sortResult = objectsArray.sort(compareNumbersToBig);

    clearArray();
    sortResult.upDate();
}

function toSmall() {
    function compareNumbersToSmall(a, b) {
        return b.product_id - a.product_id;
    }

    var sortResult = objectsArray.sort(compareNumbersToSmall);

    clearArray();
    sortResult.upDate();
}

// sort
document.querySelector('.js-product-form__button--sort').addEventListener('click', function() {

    funcArr.reverse()[0]();

}, false);

// refresh
document.querySelector('.js-product-form__button--refresh').addEventListener('click', function () {
    clearArray();
    objectsArray.upDate();
});*/

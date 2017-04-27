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

function addListenerMulti(element, eventNames, listener) {
	var events = eventNames.split(' ');
	for (var i=0, iLen=events.length; i<iLen; i++) {
		element.addEventListener(events[i], listener, false);
	}
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

/*var objectsArray = [];

var lg = new Manufacturer('LG', 'USA', 10);
var philips = new Manufacturer('Philips', 'USA', 9);
var myProduct = new Product(1234, "My product name 1", 1450);
var myProduct1 = new Product(undefined, "My product name 2", 1550);
var myProduct2 = new Product(8967, "My product name 3", 1100, lg);
var myProduct3 = new Product(8512, "My product name 4", 900, philips);
var myProduct4 = new Product(8553, "My product name 5", 1900, lg);
var myProduct5 = new Product(8597, "My product name 6", 470, philips);
var myProduct6 = new Product(8521, "My product name 7", 870, lg);
var myProduct7 = new Product(8564, "My product name 8", 260, philips);
var myProduct8 = new Product(8573, "My product name 9", 2500, lg);
var myProduct9 = new Product(8537, "My product name 10", 2900, philips);

objectsArray.push(myProduct, myProduct1, myProduct2, myProduct3, myProduct4, myProduct5, myProduct6, myProduct7, myProduct8, myProduct9);

console.log(objectsArray);

var productsList = Object.assign({}, objectsArray);

var productsListJSON = JSON.stringify(productsList);

console.log(productsListJSON);*/

Array.prototype.upDate = function() {
    var teastListNode = this.map(function(value) {
        var productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `<div class="product-card__id">Product ID: ${value.product_id}</div>
            <h1 class="product-card__name">${value.product_name}</h1>
            <p class="product-card__price">Price: ${value.shop_product_price}</p>
            <p class="product-card__fabricator-name">Fabricator name - ${value.fabricator.name} </p>
            <p class="product-card__fabricator-address">Fabricator address - ${value.fabricator.address}</p>
            <p class="product-card__fabricator-rating">Fabricator rating - ${value.fabricator.rating}</p>
            <button type="button" class="buy-button js-buy-button">Buy</button>`;
        document.querySelector('.product-list').appendChild(productCard);
        return productCard;
    });

    var btn = document.querySelectorAll('.js-buy-button');

    var modal = document.querySelector("#basket-modal");

    var modalButtonClose = document.querySelector(".modal__btn-close");

    var body = document.querySelector('body');
    // console.log(btn);

    for(var i = 0; i < btn.length; i++) {

        btn[i].addEventListener('click', function(){
            modal.style.display = "block";
            body.style.overflowY = "hidden";

            console.log('123');

            localStorage.setItem('name', this.parentElement.querySelector('.product-card__name').innerHTML);

            document.querySelector('.modal__content').innerHTML = localStorage.getItem('name');
        }, false);
    }

    // When the user clicks on <span> (x), close the modal
    modalButtonClose.addEventListener('click', function() {
        modal.style.display = "none";
        body.style.overflowY = "auto"
    });

    // When the user clicks anywhere outside of the modal, close it
    addListenerMulti(window, 'click keyup', function(event) {
        if ((event.target === modal) || (event.keyCode === 27)) {
            modal.style.display = "none";
            body.style.overflowY = ""
        }
    });

    document.querySelector('.js-filters-wrapper__button--basket').addEventListener('click', function() {
        modal.style.display = "block";
        body.style.overflowY = "hidden";
    });

    return teastListNode;
};

var objectsArray = [];


// this requests the file and executes a callback with the parsed result once it is available
fetchJSONFile('js/json/products.json', function(data){

    for(var i in data) {

        objectsArray.push(data[i]);
    }

    objectsArray.upDate();

});

document.addEventListener("DOMContentLoaded", function(event) {

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
    });

    // listener for any clicks on the document.
    document.addEventListener("click", function(e) {

        var filterListWrapper = document.querySelector('.filters-wrapper__filter-list');
        var filterListWrapperVisible = filterListWrapper.getAttribute('data-state') === 'visible';
        var filterListWrapperRect = filterListWrapper.getBoundingClientRect();

        if (filterListWrapperVisible && e.target !== filterListWrapper && ((e.clientX < filterListWrapperRect.left) || (e.clientX > filterListWrapperRect.right)) || ((e.clientY < filterListWrapperRect.top) || (e.clientY > filterListWrapperRect.bottom))) {
            filterListWrapper.setAttribute('data-state', 'hidden');
        }

    }, false);

    // listener for click on "filters" button
    document.querySelector('.js-filters-wrapper__button--filters').addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var filterListWrapper = document.querySelector('.filters-wrapper__filter-list');

        if(filterListWrapper.getAttribute('data-state') === 'hidden') {
           filterListWrapper.setAttribute('data-state', 'visible');
        } else {
           filterListWrapper.setAttribute('data-state', 'hidden');
        }
    }, false);

    // set offset for filter list
    var filtersWrapperRight = document.querySelector('.filters-wrapper__button--filters').getBoundingClientRect().right;
    var windowWidth = window.innerWidth;

    document.querySelector('.filters-wrapper__filter-list').style.marginRight = window.innerWidth - document.querySelector('.filters-wrapper__button--filters').getBoundingClientRect().right - 10 + 'px';

    // setTimeout(function () {

        // Get the modal
        // var modal = document.querySelector("#basket-modal");

        // Get the button that opens the modal
        /*var btn = document.querySelectorAll('.js-buy-button');
        console.log(btn);*/

        // Get the <span> element that closes the modal
        // var modalButtonClose = document.querySelector(".modal__btn-close");

        // var body = document.querySelector('body');

        // When the user clicks on the button, open the modal
        /*for(var i = 0; i < btn.length; i++) {

            btn[i].addEventListener('click', function(){
                modal.style.display = "block";
                body.style.overflowY = "hidden";

	            // localStorage.setItem('name', this.parentElement.querySelector('.product-card__name').innerHTML);

	            // document.querySelector('.modal__content').innerHTML = localStorage.getItem('name');
            }, false);
        }*/

        // When the user clicks on <span> (x), close the modal
        /*modalButtonClose.addEventListener('click', function() {
            modal.style.display = "none";
            body.style.overflowY = "auto"
        });*/

        // When the user clicks anywhere outside of the modal, close it
        /*addListenerMulti(window, 'click keyup', function(event) {
            if ((event.target === modal) || (event.keyCode === 27)) {
                modal.style.display = "none";
                body.style.overflowY = ""
            }
        });

        document.querySelector('.js-filters-wrapper__button--basket').addEventListener('click', function() {
	        modal.style.display = "block";
	        body.style.overflowY = "hidden";
        });*/

    // }, 0);

});

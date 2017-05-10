(function(){

	"use strict";

	// console.log(localStorage);

	// define global short alias for range of document methods
	var qS = document.querySelector.bind(document);
	var qSA = document.querySelectorAll.bind(document);

	const messArr = [
	    {
	        find_error_text: 'We are sorry, but according to the query you entered, there was no data to found!!!',
	        filter_error_text: 'We are sorry, but according to the query you entered, there was no data to filter'
	    }
	];

	function clearArray() {
	    qS('.product-list').innerHTML = "";
	}

	function insertAfter(referenceNode, newNode) {
	    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}

	function printError(selector, mess) {
	    const elem = qS(selector);
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

	/*var Product = function(product_id, product_name, shop_product_price, fabricator) {

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
	};*/

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

	Array.prototype.removeAt = function(id) {
	    for (var item in this) {
	        if (this[item].cardID == id) {
	            this.splice(item, 1);
	            return true;
	        }
	    }
	    return false;
	};

	Array.prototype.upDate = function() {
		// var getModalData = JSON.parse(localStorage.getItem("cards"));

	    var teastListNode = this.map(function(value) {
	        /*if(getModalData !== null) {
		        for(let item of getModalData) {

		            if(item.cardID == value.product_id) {
		                // console.log(value.product_id);
		                // console.log('123');
		                var buyText = 'Added to cart'
		            } else {
			            // console.log('456');
		                buyText = 'Buy'
		            }
		        }
	        } else {
	            buyText = 'Buy';
	        }*/

	        var productCard = document.createElement("div");
	        productCard.className = "product-card";
	        productCard.innerHTML = `<div class="product-card__id">Product ID: <span>${value.product_id}</span></div>
	            <h1 class="product-card__name">${value.product_name}</h1>
	            <p class="product-card__price">Price: <span>${value.shop_product_price}</span></p>
	            <p class="product-card__fabricator-name">Fabricator name - <span>${value.fabricator.name}</span></p>
	            <p class="product-card__fabricator-address">Fabricator address - <span>${value.fabricator.address}</span></p>
	            <p class="product-card__fabricator-rating">Fabricator rating - <span>${value.fabricator.rating}</span></p>
	            <button type="button" class="card-button js-buy-button">Buy</button>`;
	        qS('.product-list').appendChild(productCard);
	        return productCard;
	    });

	    var btn = qSA('.js-buy-button');
	    var modal = qS("#basket-modal");
	    var modalButtonClose = qS(".modal__btn-close");
	    var body = qS('body');
	    var html = qS('html');

	    // listen click on "Buy" button
	    for(var i = 0; i < btn.length; i++) {

	        btn[i].addEventListener('click', function(){

	            var cards;
	            if(!localStorage.cards) {
	                cards = [];
	            }
	            else {
	                cards = JSON.parse(localStorage.cards);
	            }

	            var currentCard = {
	                userNumber : cards.length,
	                cardID: this.parentNode.querySelector('.product-card__id span').innerHTML,
	                name: this.parentElement.querySelector('.product-card__name').innerHTML,
	                price: this.parentElement.querySelector('.product-card__price span').innerHTML,
	                fabricatorName: this.parentElement.querySelector('.product-card__fabricator-name span').innerHTML,
	                fabricatorAddress: this.parentElement.querySelector('.product-card__fabricator-address span').innerHTML,
	                fabricatorRating: this.parentElement.querySelector('.product-card__fabricator-rating span').innerHTML,
	                buttonText: "Added to cart"
	            };

		        /*for(let item of cards) {
		            if(item.cardID == this.parentNode.querySelector('.product-card__id span').innerHTML) {
			        }
		        }*/

	            cards.push(currentCard);

	            try {
	                localStorage.cards = JSON.stringify(cards);
	                console.log(cards, "The data was saved.");
		            modal.style.display = "block";
		            Object.assign(html.style, {
			            overflowY: "hidden",
			            marginRight: window.innerWidth - document.body.clientWidth + 'px'
		            });
		            qS('.js-basket-items-amount').innerHTML = cards.length;

		            for(let item of cards) {
			            qS('.modal__content-body').innerHTML += `<div data-basket-state="in-basket" class="product-card">
							<div class="product-card__id">Product ID: <span>${item.cardID}</span></div>
	                        <h1 class="product-card__name">${item.name}</h1>
	                        <p class="product-card__price">Price: <span>${item.price}</span></p>
	                        <p class="product-card__fabricator-name">Fabricator name - <span>${item.fabricatorName}</span></p>
	                        <p class="product-card__fabricator-address">Fabricator address - <span>${item.fabricatorAddress}</span></p>
	                        <p class="product-card__fabricator-rating">Fabricator rating - <span>${item.fabricatorRating}</span></p>
	                        <div class="card-button-remove-wrapper">
	                            <button type="button" class="card-button js-remove-button">Remove</button>
	                        </div>
						</div>`;
		            }

	                return true;
	            } catch (e) {
	                if (e == QUOTA_EXCEEDED_ERR) {
	                    alert('Quota exceeded!');
	                }
	            }

	        }, false);
	    }

	    // When the user clicks on (x), close the modal
	    modalButtonClose.addEventListener('click', function() {
	        modal.style.display = "none";
	        Object.assign(html.style, {
	            overflowY: "",
	            marginRight: ""
	        });
		    qS('.modal__content-body').innerHTML = "";
	    });

	    // remove product card from basket
		document.addEventListener("click", function (e) {
			var target = e.target;

			while (target && target.parentNode !== document) {
				target = target.parentNode;
				if (!target) { return; } // If element doesn't exist

				if (target.classList.contains('card-button-remove-wrapper')){
					e.target.parentNode.parentNode.style.display = "none";

	                var basketCardID = e.target.parentNode.parentNode.querySelector('.product-card__id span').innerHTML;

	                var localStorageObj = JSON.parse(localStorage.cards);
	                localStorageObj.removeAt(basketCardID);
	                localStorage.cards = JSON.stringify(localStorageObj);

					qS('.js-basket-items-amount').innerHTML = localStorageObj.length;
	                console.log(localStorage.cards);

	                if(localStorageObj.length == 0) {
	                    qS('.modal__content-body').innerHTML = '<div class="modal__empty">Your Shopping Cart is empty</div>';
	                }

				}
			}
		});

	    // When the user clicks anywhere outside of the modal or press "Esc" button, close modal
	    addListenerMulti(window, 'click keyup', function(event) {
	        if ((event.target === modal) || (event.keyCode === 27)) {
	            modal.style.display = "none";
	            Object.assign(html.style, {
	                overflowY: "",
	                marginRight: ""
	            });
		        qS('.modal__content-body').innerHTML = "";
	        }
	    });

	    // show basket
	    function showBasketModal() {
	        qS('.js-filters-wrapper__button--basket').addEventListener('click', function() {
	            modal.style.display = "block";
	            Object.assign(html.style, {
	                overflowY: "hidden",
	                marginRight: window.innerWidth - document.body.clientWidth + 'px'
	            });

	            // var localStorageBasketObj = JSON.parse(localStorage.cards);


	            var localStorageBasketObj;
	            if(!localStorage.cards) {
	                localStorageBasketObj = [];
	            }
	            else {
	                localStorageBasketObj = JSON.parse(localStorage.cards);
	            }

	            // console.log(localStorageBasketObj);

	            if(localStorageBasketObj.length > 0 && localStorageBasketObj.length != 0) {

		            for(let item of localStorageBasketObj) {
			            qS('.modal__content-body').innerHTML += `<div class="product-card">
							<div class="product-card__id">Product ID: <span>${item.cardID}</span></div>
	                        <h1 class="product-card__name">${item.name}</h1>
	                        <p class="product-card__price">Price: <span>${item.price}</span></p>
	                        <p class="product-card__fabricator-name">Fabricator name - <span>${item.fabricatorName}</span></p>
	                        <p class="product-card__fabricator-address">Fabricator address - <span>${item.fabricatorAddress}</span></p>
	                        <p class="product-card__fabricator-rating">Fabricator rating - <span>${item.fabricatorRating}</span></p>
	                        <div class="card-button-remove-wrapper">
	                            <button type="button" class="card-button js-remove-button">Remove</button>
	                        </div>
						</div>`;
		            }

	            } else {
	                qS('.modal__content-body').innerHTML = '<div class="modal__empty">Your Shopping Cart is empty</div>'
	            }
	        });
	    }

	    showBasketModal();

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

		// set amount of products in basket
		var cardsInBasket;
		if(!localStorage.cards) {
			cardsInBasket = [];
		}
		else {
			cardsInBasket = JSON.parse(localStorage.cards);
		}

		if(cardsInBasket.length === 0) {
			qS('.js-basket-items-amount').innerHTML = '0';
		} else {
			qS('.js-basket-items-amount').innerHTML = cardsInBasket.length;
		}

		console.log(cardsInBasket.length);

	    // find
	    qS('.js-product-form__button--find').addEventListener('click', function() {

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
	    qS('.js-product-form__button--filter').addEventListener('click', function() {

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
	    qS('.js-product-form__button--sort').addEventListener('click', function() {

	        funcArr.reverse()[0]();

	    }, false);

	    // refresh
	    qS('.js-product-form__button--refresh').addEventListener('click', function () {

	        clearArray();
	        objectsArray.upDate();
	    });

	    // listener for any clicks on the document.
	    addListenerMulti(window, "click keyup", function(e) {

	        var filterListWrapper = qS('.filters-wrapper__filter-list');
	        var filterListWrapperVisible = filterListWrapper.getAttribute('data-state') === 'visible';
	        var filterListWrapperRect = filterListWrapper.getBoundingClientRect();

	        if (filterListWrapperVisible && e.target !== filterListWrapper && ((e.clientX < filterListWrapperRect.left) || (e.clientX > filterListWrapperRect.right)) || ((e.clientY < filterListWrapperRect.top) || (e.clientY > filterListWrapperRect.bottom))) {
	            filterListWrapper.setAttribute('data-state', 'hidden');
	        } else if(e.keyCode === 27) {
		        filterListWrapper.setAttribute('data-state', 'hidden');
	        }

	    }, false);

	    // listener for click on "filters" button
	    qS('.js-filters-wrapper__button--filters').addEventListener('click', function (e) {
	        e.preventDefault();
	        e.stopPropagation();

	        var filterListWrapper = qS('.filters-wrapper__filter-list');

	        if(filterListWrapper.getAttribute('data-state') === 'hidden') {
	           filterListWrapper.setAttribute('data-state', 'visible');
	        } else {
	           filterListWrapper.setAttribute('data-state', 'hidden');
	        }
	    }, false);

	    // set offset for filter list
	    qS('.filters-wrapper__filter-list').style.right = window.innerWidth - qS('.filters-wrapper__button--filters').getBoundingClientRect().right + 'px';

	});

})();
"use strict"

document.addEventListener('DOMContentLoaded', function () {

    //isMobile
    function isMobileDevice() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    //Бургер
    const menuIcon = document.querySelector('.icon-menu');
    const menuBody = document.querySelector('.menu__body');
    menuIcon.addEventListener('click', function() {
        document.body.classList.toggle('_lock');
        menuIcon.classList.toggle('_active');
        menuBody.classList.toggle('_active');
    });

    //Header
    const header = document.querySelector('.header');
    const callback = function(entries, observer) {
        if (entries[0].isIntersecting) {
            header.classList.remove('_scroll');
        } else {
            header.classList.add('_scroll');
        };
    };
    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(header);

    //Делегирование событий
    document.addEventListener('click', documentActions)
    function documentActions(e) {
        const targetElement = e.target;
        if (window.innerWidth > 768 && isMobileDevice()) {
            if(targetElement.classList.contains('menu__arrow')){
                targetElement.closest('.menu__item').classList.toggle('_active');
            };
            if(!targetElement.closest('.menu__item') && document.querySelectorAll('.menu__item._active').length > 0) {
                const activeMenu = document.querySelectorAll('.menu__item._active');
                for (let i = 0; i < activeMenu.length; i++) {
                    activeMenu[i].classList.remove('_active');
                };
            };
        };
        if(targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('_active');
        } else if (!targetElement.closest('.search-form') && document.querySelectorAll('.search-form._active').length > 0) {
            document.querySelector('.search-form').classList.remove('_active');
        };
        if(targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            e.preventDefault();
        };
        if(targetElement.classList.contains('action-item__button')) {
            const productId = targetElement.closest('.item-products').dataset.productId;
            addToCart(targetElement, productId);
            e.preventDefault();
        }
        if(targetElement.classList.contains('cart-header__icon') || targetElement.closest('.cart-header__icon')) {
            if(document.querySelector('.cart-list').children.length > 0) {
                document.querySelector('.cart-header').classList.toggle('_active');
            }
            e.preventDefault();
        } else if (!targetElement.closest('.cart-header') && !targetElement.classList.contains('action-item__button')) {
            document.querySelector('.cart-header').classList.remove('_active');
        }
        if(targetElement.classList.contains('cart-list__delete')) {
            const productId = targetElement.closest('.cart-list__item').dataset.cartprodId;
            updateCart(targetElement, productId, false);
            e.preventDefault();
        }
    };

    //Спойлер
    const spollersArray = document.querySelectorAll('[data-spollers]');
    if (spollersArray.length > 0) {
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });
        if (spollersRegular.length > 0) {
            initSpollers(spollersRegular);
        };
        const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
            return item.dataset.spollers.split(",")[0];
        });
        if (spollersMedia.length > 0) {
            const breakpointsArray = [];
            spollersMedia.forEach(item => {
                const params = item.dataset.spollers;
                const breakpoint = {};
                const paramsArray = params.split(",");
                breakpoint.value = paramsArray[0];
                breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
                breakpoint.item = item;
                breakpointsArray.push(breakpoint);
            });
            let mediaQueries = breakpointsArray.map(function (item) {
                return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
            });
            mediaQueries = mediaQueries.filter(function (item, index, self) {
                return self.indexOf(item) === index;
            });
            mediaQueries.forEach(breakpoint => {
                const paramsArray = breakpoint.split(",");
                const mediaBreakpoint = paramsArray[1];
                const mediaType = paramsArray[2];
                const matchMedia = window.matchMedia(paramsArray[0]);
                const spollersArray = breakpointsArray.filter(function (item) {
                    if (item.value === mediaBreakpoint && item.type === mediaType) {
                        return true;
                    };
                });
                matchMedia.addEventListener("change",function () {
                    initSpollers(spollersArray, matchMedia);
                });
                initSpollers(spollersArray, matchMedia);
            });
        };
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove('_init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                };
            });
        };
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length > 0) {
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        };
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    };
                });
            };
        };
        function setSpollerAction(e) {
            const el = e.target;
            if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
                const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
                if (!spollersBlock.querySelectorAll('._slide').length) {
                    if (oneSpoller && !spollerTitle.classList.contains('_active')) {
                        hideSpollersBody(spollersBlock);
                    };
                    spollerTitle.classList.toggle('_active');
                    _slideToggle(spollerTitle.nextElementSibling, 300);
                };
                e.preventDefault();
            };
        };
        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
            if (spollerActiveTitle) {
                spollerActiveTitle.classList.remove('_active');
                _slideUp(spollerActiveTitle.nextElementSibling, 300);
            };
        };
    };

    let _slideUp = (target, duration = 300) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            target.style.transitionProperty = 'height, margin, padding';
            target.style.transitionDuration = duration + 'ms';
            target.style.height = target.offsetHeight + 'px';
            target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            window.setTimeout( () => {
                target.hidden = true;
                target.style.removeProperty('height');
                target.style.removeProperty('padding-top');
                target.style.removeProperty('padding-bottom');
                target.style.removeProperty('margin-top');
                target.style.removeProperty('margin-bottom');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        };
    };

    let _slideDown = (target, duration = 300) => {
        if (!target.classList.contains('_slide')) {
            target.classList.add('_slide');
            if (target.hidden) {
                target.hidden = false
            };
            let height = target.offsetHeight;
            target.style.overflow = 'hidden';
            target.style.height = 0;
            target.style.paddingTop = 0;
            target.style.paddingBottom = 0;
            target.style.marginTop = 0;
            target.style.marginBottom = 0;
            target.offsetHeight;
            target.style.transitionProperty = "height, margin, padding";
            target.style.transitionDuration = duration + 'ms';
            target.style.height = height + 'px';
            target.style.removeProperty('padding-top');
            target.style.removeProperty('padding-bottom');
            target.style.removeProperty('margin-top');
            target.style.removeProperty('margin-bottom');
            window.setTimeout( () => {
                target.style.removeProperty('height');
                target.style.removeProperty('overflow');
                target.style.removeProperty('transition-duration');
                target.style.removeProperty('transition-property');
                target.classList.remove('_slide');
            }, duration);
        };
    };

    var _slideToggle = (target, duration = 300) => {
        if (target.hidden) {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        };
    };

    //Слайдер
    if (document.querySelector('.slider-main__body')) {
        new Swiper('.slider-main__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
              el: '.control-slider-main__dotts',
              clickable: true,
            },
            navigation: {
              nextEl: '.slider-main .arrow-slider-main_next',
              prevEl: '.slider-main .arrow-slider-main_prev',
            },
          });
    }
    if (document.querySelector('.slider-rooms__body')) {
        new Swiper('.slider-rooms__body', {
            observer: true,
            observeParents: true,
            slidesPerView: "auto",
            spaceBetween: 24,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
              el: '.slider-rooms__dotts',
              clickable: true,
            },
            navigation: {
              nextEl: '.slider-rooms .slider-rooms__arrow_next',
              prevEl: '.slider-rooms .slider-rooms__arrow_prev',
            },
          });
    }
    if (document.querySelector('.slider-tips__body')) {
        new Swiper('.slider-tips__body', {
            observer: true,
            observeParents: true,
            slidesPerView: 3,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
              el: '.slider-tips__dotts',
              clickable: true,
            },
            navigation: {
              nextEl: '.slider-tips .slider-tips__arrow_next',
              prevEl: '.slider-tips .slider-tips__arrow_prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1.1,
                    spaceBetween: 15,
                    autoHeight: true,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            }
          });
    }

    //Load more
    async function getProducts(button) {
        if (!button.classList.contains('_hold')) {
            button.classList.add('_hold');
            const file = "json/products.json";
            let response = await fetch(file, {
                method: "GET"
            });
            if (response.ok) {
                let result = await response.json();
                loadProducts(result);
                button.classList.remove('_hold');
                button.remove();
            } else {
                alert("Ошибка");
            };
        };
    };
    function loadProducts(data) {
        const productsItems = document.querySelector('.products__items');
        data.products.forEach (item => {
            const productId = item.id;
            const productUrl = item.url;
            const productImage = item.image;
            const productTitle = item.title;
            const productText = item.text;
            const productPrice = item.price;
            const productOldPrice = item.priceOld;
            const productShareUrl = item.shareUrl;
            const productLikeUrl = item.likeUrl;
            const productLabels = item.labels;

            let productTemplateStart = `<div data-product-id="${productId}" class="products__item item-products">`;
	        let productTemplateEnd = `</div>`;
	        let productTemplateLabels = '';
		    if (productLabels) {
			let productTemplateLabelsStart = `<div class="item-products__labels">`;
			let productTemplateLabelsEnd = `</div>`;
			let productTemplateLabelsContent = '';
			productLabels.forEach(labelItem => {
			productTemplateLabelsContent += `<div class="item-products__label item-products__label_${labelItem.type}">${labelItem.value}</div>`;
			});
			productTemplateLabels += productTemplateLabelsStart;
			productTemplateLabels += productTemplateLabelsContent;
			productTemplateLabels += productTemplateLabelsEnd;
			}
			let productTemplateImage = `
            <a href="${productUrl}" class="item-products__image _ibg">
            <img src="./img/products/${productImage}.jpg" alt="product">
            </a>
	        `;
			let productTemplateBodyStart = `<div class="item-products__body body-products">`;
			let productTemplateBodyEnd = `</div>`;
			let productTemplateContent = `
            <a href="${productUrl}" class="body-products__title">${productTitle}</a>
			<div class="body-products__text">${productText}</div>
	        `;
			let productTemplatePrices = '';
			let productTemplatePricesStart = `<div class="body-products__price">`;
			let productTemplatePricesCurrent = `<div class="body-products__price_current">&#8372; ${productPrice}</div>`;
			let productTemplatePricesOld = `<div class="body-products__price_old">&#8372; ${productOldPrice}</div>`;
			let productTemplatePricesEnd = `</div></div>`;
			productTemplatePrices = productTemplatePricesStart;
			productTemplatePrices += productTemplatePricesCurrent;
			if (productOldPrice) {
				productTemplatePrices += productTemplatePricesOld;
			}
			productTemplatePrices += productTemplatePricesEnd;
			let productTemplateActions = `
		    <div class="item-products__action action-item">
			<div class="action-item__body">
			<button type="button" class="action-item__button">Add to cart</button>
			<a href="${productShareUrl}" class="action-item__link _icon-share">Share</a>
			<a href="${productLikeUrl}" class="action-item__link _icon-favorite">Like</a>
		    </div>
	        `;

			let productTemplateBody = '';
			productTemplateBody += productTemplateBodyStart;
			productTemplateBody += productTemplateContent;
			productTemplateBody += productTemplatePrices;
			productTemplateBody += productTemplateActions;
			productTemplateBody += productTemplateBodyEnd;

			let productTemplate = '';
			productTemplate += productTemplateStart;
			productTemplate += productTemplateLabels;
			productTemplate += productTemplateImage;
			productTemplate += productTemplateBody;
			productTemplate += productTemplateEnd;

            productsItems.insertAdjacentHTML('beforeend', productTemplate);
            ibg();
        });
    };

    //AddToCart
    function addToCart(productButton, productId) {
        if(!productButton.classList.contains('_hold')) {
            productButton.classList.add('_hold');
            productButton.classList.add('_fly');
            const cart = document.querySelector('.cart-header');
            const product = document.querySelector(`[data-product-id="${productId}"]`);
            const productImage = product.querySelector('.item-products__image');
            const productImageFly = productImage.cloneNode(true);
            const productImageFlyWidth = productImage.offsetWidth;
            const productImageFlyHeight = productImage.offsetHeight;
            const productImageFlyTop = productImage.getBoundingClientRect().top;
            const productImageFlyLeft = productImage.getBoundingClientRect().left;
            productImageFly.setAttribute('class', '_flyImage _ibg');
            productImageFly.style.cssText = 
                `
            top: ${productImageFlyTop}px;
            left: ${productImageFlyLeft}px;
            width: ${productImageFlyWidth}px;
            height: ${productImageFlyHeight}px;
        `;
            document.body.append(productImageFly);
            const cartTop = cart.getBoundingClientRect().top;
            const cartRight = cart.getBoundingClientRect().right;
            productImageFly.style.cssText = 
                `
            top: ${cartTop}px;
            left: ${cartRight}px;
            width: 0px;
            height: 0px;
            opacity: 0;
        `;
        ibg();

        productImageFly.addEventListener('transitionend', function() {
            if(productButton.classList.contains('_fly')) {
                productImageFly.remove();
                updateCart(productButton, productId);
                productButton.classList.remove('_fly');
            };
        });
        };
    };
    function updateCart(productButton, productId, productAdd = true) {
        const cart = document.querySelector('.cart-header');
        const cartIcon = cart.querySelector('.cart-header__icon');
        const cartQuantity = cartIcon.querySelector('span');
        const cartList = document.querySelector('.cart-list');
        const cartProduct = cartList.querySelector(`[data-cartprod-id="${productId}"]`);
        if(productAdd) {
            if(cartQuantity) {
                cartQuantity.innerHTML = ++cartQuantity.innerHTML;
            } else {
                cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
            };
            if(!cartProduct) {
                const product = document.querySelector(`[data-product-id="${productId}"]`);
                const cartProductImage = product.querySelector('.item-products__image').innerHTML;
                const cartProductTitle = product.querySelector('.body-products__title').innerHTML;
                const cartProductContent = `
                <a href="#" class="cart-list__image _ibg">${cartProductImage}</a>
                <div class="cart-list__body">
                    <a href="#" class="cart-list__title">${cartProductTitle}</a>
                    <div class="cart-list__quantity">Quantity: <span>1</span></div>
                    <a href="#" class="cart-list__delete">Delete</a>
                </div>`;
                cartList.insertAdjacentHTML('beforeend', `<li data-cartprod-id="${productId}" class="cart-list__item">${cartProductContent}</li>`);
            } else {
                const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
                cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
            };
            productButton.classList.remove('_hold');
            ibg();
        } else {
            const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
            cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
            if(!parseInt(cartProductQuantity.innerHTML)) {
                cartProduct.remove();
            };
            const cartQuantityValue = --cartQuantity.innerHTML;
            if(cartQuantityValue) {
                cartQuantity.innerHTML = cartQuantityValue;
            } else {
                cartQuantity.remove();
                cart.classList.remove('_active');
            }
        }
    };

    //Gallery
    const gallery = document.querySelector('.gallery__body');
    if (gallery && !isMobileDevice()) {
        const galleryItems = document.querySelector('.gallery__items');
        const gallertColumn = document.querySelectorAll('.gallery__column');
        const speed = gallery.dataset.speed;
        let positionX = 0;
        let coordXprocent = 0;
        function setMouseGalleryStyle() {
            let gallertItemsWidth = 0;
            gallertColumn.forEach(element => {
                gallertItemsWidth += element.offsetWidth;
            });
            const galleryDifferent = gallertItemsWidth - gallery.offsetWidth;
            const distX = Math.floor(coordXprocent - positionX);
            positionX = positionX + (distX * speed);
            let position = galleryDifferent / 200 * positionX;
            galleryItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;
            if (Math.abs(distX) > 0) {
                requestAnimationFrame(setMouseGalleryStyle);
            } else {
                gallery.classList.remove('_init');
            };
        };
        gallery.addEventListener("mousemove", function (e) {
            const gallertWidth = gallery.offsetWidth;
            const coordX = e.pageX - gallertWidth / 2;
            coordXprocent = coordX / gallertWidth * 200;
            if (!gallery.classList.contains('_init')) {
                requestAnimationFrame(setMouseGalleryStyle);
                gallery.classList.add('_init');
            };
        });
    };

    //Картинку из html-тега <img> делаем фоновой
    //Родительскому блок тега <img> добавляем class="_ibg"
    function ibg(){
        const ibg = document.querySelectorAll("._ibg");
        for (let i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
        ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
        }}}
        ibg();

    //Валидатор форм
    //Тегу <form> добавляем id="form"
    //Обязательным для заполнения полям добавляем class="_req"
    //Полю почты добавляем class="_email"
    //В CSS задаем стили для "._error"
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);
    async function formSend(e) {
        e.preventDefault();
        let error = formValidate(form);
    }
    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req")
        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);
            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value == "") {
                    formAddError(input);
                    error++;
                }
            }
        }
    }
    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input.value);
    };

    //Адаптив
    function DynamicAdapt(type) {
        this.type = type;
    }
    
    DynamicAdapt.prototype.init = function () {
        const _this = this;
        // массив объектов
        this.оbjects = [];
        this.daClassname = "_dynamic_adapt_";
        // массив DOM-элементов
        this.nodes = document.querySelectorAll("[data-da]");
    
        // наполнение оbjects объктами
        for (let i = 0; i < this.nodes.length; i++) {
            const node = this.nodes[i];
            const data = node.dataset.da.trim();
            const dataArray = data.split(",");
            const оbject = {};
            оbject.element = node;
            оbject.parent = node.parentNode;
            оbject.destination = document.querySelector(dataArray[0].trim());
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
            оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.оbjects.push(оbject);
        }
    
        this.arraySort(this.оbjects);
    
        // массив уникальных медиа-запросов
        this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
            return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
        }, this);
        this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
            return Array.prototype.indexOf.call(self, item) === index;
        });
    
        // навешивание слушателя на медиа-запрос
        // и вызов обработчика при первом запуске
        for (let i = 0; i < this.mediaQueries.length; i++) {
            const media = this.mediaQueries[i];
            const mediaSplit = String.prototype.split.call(media, ',');
            const matchMedia = window.matchMedia(mediaSplit[0]);
            const mediaBreakpoint = mediaSplit[1];
    
            // массив объектов с подходящим брейкпоинтом
            const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
                return item.breakpoint === mediaBreakpoint;
            });
            matchMedia.addListener(function () {
                _this.mediaHandler(matchMedia, оbjectsFilter);
            });
            this.mediaHandler(matchMedia, оbjectsFilter);
        }
    };
    
    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
        if (matchMedia.matches) {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                оbject.index = this.indexInParent(оbject.parent, оbject.element);
                this.moveTo(оbject.place, оbject.element, оbject.destination);
            }
        } else {
            for (let i = 0; i < оbjects.length; i++) {
                const оbject = оbjects[i];
                if (оbject.element.classList.contains(this.daClassname)) {
                    this.moveBack(оbject.parent, оbject.element, оbject.index);
                }
            }
        }
    };
    
    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
        element.classList.add(this.daClassname);
        if (place === 'last' || place >= destination.children.length) {
            destination.insertAdjacentElement('beforeend', element);
            return;
        }
        if (place === 'first') {
            destination.insertAdjacentElement('afterbegin', element);
            return;
        }
        destination.children[place].insertAdjacentElement('beforebegin', element);
    }
    
    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
        element.classList.remove(this.daClassname);
        if (parent.children[index] !== undefined) {
            parent.children[index].insertAdjacentElement('beforebegin', element);
        } else {
            parent.insertAdjacentElement('beforeend', element);
        }
    }
    
    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
        const array = Array.prototype.slice.call(parent.children);
        return Array.prototype.indexOf.call(array, element);
    };
    
    // Функция сортировки массива по breakpoint и place 
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
        if (this.type === "min") {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return -1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return 1;
                    }
    
                    return a.place - b.place;
                }
    
                return a.breakpoint - b.breakpoint;
            });
        } else {
            Array.prototype.sort.call(arr, function (a, b) {
                if (a.breakpoint === b.breakpoint) {
                    if (a.place === b.place) {
                        return 0;
                    }
    
                    if (a.place === "first" || b.place === "last") {
                        return 1;
                    }
    
                    if (a.place === "last" || b.place === "first") {
                        return -1;
                    }
    
                    return b.place - a.place;
                }
    
                return b.breakpoint - a.breakpoint;
            });
            return;
        }
    };
    
    const da = new DynamicAdapt("max");
    da.init();
});

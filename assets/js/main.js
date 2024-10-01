(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    

        // login form
        $(".login-bar-icon").on("click", function(){
            $(".login-area").addClass("login-active");
        });

        $(".close-btn").on("click", function() {
            $(".login-area").removeClass("login-active");
        });

        $('.message a').click(function(){
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
         });


        // adicionar produto ao carrinho
        document.addEventListener('DOMContentLoaded', () => {
            const cartButtons = document.querySelectorAll('.cart-btn');
        
            cartButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.preventDefault();
                    const productID = button.getAttribute('data-id');
                    const productName = button.getAttribute('data-name');
                    const productPrice = parseFloat(button.getAttribute('data-price'));
                    const productImage = button.getAttribute('data-image');
                    addToCart(productID, productName, productPrice, productImage);
                });
            });
        
            function addToCart(id, name, price, image) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const existingProduct = cart.find(product => product.id === id);
        
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    const product = { id, name, price, image, quantity: 1 };
                    cart.push(product);
                }
        
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartTable();
                alert('Produto adicionado ao carrinho!');
            }
        
            function updateCartTable() {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                const cartBody = document.getElementById('cart-body');
                cartBody.innerHTML = '';
        
                cart.forEach(product => {
                    const row = document.createElement('tr');
                    row.classList.add('table-body-row');
                    row.innerHTML = `
                        <td class="product-remove"><a href="#" data-id="${product.id}"><i class="far fa-window-close"></i></a></td>
                        <td class="product-image"><img src="${product.image}" alt=""></td>
                        <td class="product-name">${product.name}</td>
                        <td class="product-price">R$${product.price.toFixed(2)}</td>
                        <td class="product-quantity"><input type="number" value="${product.quantity}" min="1" data-id="${product.id}"></td>
                        <td class="product-total">R$${(product.price * product.quantity).toFixed(2)}</td>
                    `;
                    cartBody.appendChild(row);
                });
        
                updateTotals();
                addRemoveEventListeners();
                addQuantityChangeListeners();
            }
        
            function updateTotals() {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                let subtotal = 0;
        
                cart.forEach(product => {
                    subtotal += product.price * product.quantity;
                });
        
                document.getElementById('subtotal').innerText = `R$${subtotal.toFixed(2)}`;
                document.getElementById('frete').innerText = 'R$0.00'; // Atualize conforme necessário
                document.getElementById('total').innerText = `R$${subtotal.toFixed(2)}`;
            }
        
            function addRemoveEventListeners() {
                const removeButtons = document.querySelectorAll('.product-remove a');
                removeButtons.forEach(button => {
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        const productID = button.getAttribute('data-id');
                        removeFromCart(productID);
                    });
                });
            }
        
            function removeFromCart(id) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart = cart.filter(product => product.id !== id);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartTable();
            }
        
            function addQuantityChangeListeners() {
                const quantityInputs = document.querySelectorAll('.product-quantity input');
                quantityInputs.forEach(input => {
                    input.addEventListener('change', (event) => {
                        const productID = input.getAttribute('data-id');
                        const newQuantity = parseInt(event.target.value);
                        updateProductQuantity(productID, newQuantity);
                    });
                });
            }
        
            function updateProductQuantity(id, quantity) {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                const product = cart.find(product => product.id === id);
                if (product) {
                    product.quantity = quantity;
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartTable();
                }
            }
        
            updateCartTable();
        });

    });


    jQuery(window).on("load",function(){
        jQuery(".loader").fadeOut(1000);
    });


}(jQuery));
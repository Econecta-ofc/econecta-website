// adicionar produto ao carrinho
function addToCart(event) {
    event.preventDefault();

    // pega as informações do produto a partir dos atributos data-*
    let productID = this.getAttribute('data-id');
    let productName = this.getAttribute('data-name');
    let productPrice = parseFloat(this.getAttribute('data-price'));
    let productImage = this.getAttribute('data-image');

    // cria um objeto de produto
    let product = {
        id: productID,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1
    };

    // pega o carrinho do localStorage (ou cria um novo se não existir)
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // verifica se o produto já está no carrinho
    let existingProduct = cart.find(item => item.id == productID);

    if (existingProduct) {
        // se o produto já estiver no carrinho, aumenta a quantidade
        existingProduct.quantity += 1;
    } else {
        // se o produto já estiver no carrinho, adiciona o novo produto
        cart.push(product);
    }

    // atualiza o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // exibe uma mensagem de sucesso
    alert('Produto adicionado ao carrinho!');
}

// seleciona todos os botões de "Adicionar ao carrinho"
const addToCartButtons = document.querySelectorAll('.cart-btn');

// adiciona o evento de clique a cada botão
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});
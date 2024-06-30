const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCount = document.querySelector('#cart-count');
const addressInput = document.querySelector('#address');
const addressWarn = document.querySelector('#address-warn');

let cart = [];

cartBtn.addEventListener('click', () => {
  updateCartModal();

  cartModal.style.display = 'flex';
});

cartModal.addEventListener('click', (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = 'none';
  }
});

closeModalBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

menu.addEventListener('click', (event) => {
  let parentButton = event.target.closest('.add-to-cart-btn');

  if (parentButton) {
    const name = parentButton.getAttribute('data-name');
    const price = parseFloat(parentButton.getAttribute('data-price'));

    addToCart(name, price);
  }
});

const addToCart = (name, price) => {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name,
      price,
      quantity: 1,
    });
  }

  updateCartModal();
};

const updateCartModal = () => {
  cartItemsContainer.innerHTML = '';

  let total = 0;

  cart.forEach((item) => {
    const cartItemElement = document.createElement('div');

    cartItemElement.innerHTML = `
      <div>
        <div>
          <p>${item.name}</p>
          <p>${item.quantity}</p>
          <p>${item.price}</p>
        </div>
        
        <div>
          <button>Remover</button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItemElement);
  });
};

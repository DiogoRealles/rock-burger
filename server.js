const menu = document.querySelector('#menu');
const cartBtn = document.querySelector('#cart-btn');
const cartModal = document.querySelector('#cart-modal');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const checkoutBtn = document.querySelector('#checkout-btn');
const closeModalBtn = document.querySelector('#close-modal-btn');
const cartCounter = document.querySelector('#cart-count');
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
    cartItemElement.classList.add(
      'flex',
      'flex-col',
      'justify-between',
      'mb-4'
    );

    cartItemElement.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <p class="font-bold">${item.name}</p>
          <p>Qtd: ${item.quantity}</p>
          <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
        </div>
        
          <button
          data-name="${item.name}"
          class="remove-from-cart-btn">Remover</button>
      </div>
    `;

    total += item.price * item.quantity;

    cartItemsContainer.appendChild(cartItemElement);
  });

  cartTotal.textContent = total.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  cartCounter.innerHTML = cart.length;
};

cartItemsContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-from-cart-btn')) {
    const name = event.target.getAttribute('data-name');

    removeItemCart(name);
  }
});

const removeItemCart = (name) => {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;

      updateCartModal();

      return;
    }

    cart.splice(index, 1);
    updateCartModal();
  }
};

addressInput.addEventListener('input', (event) => {
  let inputValue = event.target.value;

  if (inputValue !== '') {
    addressInput.classList.remove('border-red-500');
    addressWarn.classList.add('hidden');
  }
});

checkoutBtn.addEventListener('click', () => {
  const isOpen = checkRestaurantOpen();

  if (!isOpen) {
    Toastify({
      text: 'Oops o restaurante está fechado!',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      stopOnFocus: true,
      style: {
        background: '#ef4444',
      },
    }).showToast();

    return;
  }

  if (cart.length === 0) return;

  if (addressInput.value === '') {
    addressWarn.classList.remove('hidden');
    addressInput.classList.add('border-red-500');
    return;
  }

  const cartIems = cart
    .map((item) => {
      return ` ${item.name} Quantidade: (${item.quantidade}) Preço: R$${item.price} |`;
    })
    .join('');

  const message = encodeURIComponent(cartIems);
  const phone = '+5511941335607';

  window.open(
    `https://wa.me/${phone}?text=Envia meu lanche aí: ${message} Endereço: ${addressInput.value}`,
    '_blank'
  );

  cart = [];

  updateCartModal();
});

const checkRestaurantOpen = () => {
  const date = new Date();
  let hour = date.getHours();
  // hour = 17;
  return hour >= 18 && hour < 23;
};

const spanItem = document.querySelector('#date-span');
const isOpen = checkRestaurantOpen();

if (isOpen) {
  spanItem.classList.remove('bg-red-500');
  spanItem.classList.add('bg-green-600');
} else {
  spanItem.classList.remove('bg-green-600');
  spanItem.classList.add('bg-red-500');
}

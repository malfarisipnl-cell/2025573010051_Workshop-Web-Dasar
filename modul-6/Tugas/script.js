const products = [
  {
    id: 1,
    name: 'RAM DDR4 16GB 3200MHz',
    price: 450000,
    image: 'https://images.unsplash.com/photo-1611855719306-855681466066?q=80&w=1119&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    name: 'SSD 512GB NVMe PCIe 4.0',
    price: 550000,
    image: 'https://images.unsplash.com/photo-1588259341633-32e9693ccb59?q=80&w=1073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 3,
    name: 'Monitor LED 24 Inch Full HD',
    price: 1200000,
    image: 'https://plus.unsplash.com/premium_photo-1669380425564-6e1a281a4d30?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 4,
    name: 'Mechanical Keyboard RGB',
    price: 750000,
    image: 'https://images.unsplash.com/photo-1626958390943-a70309376444?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 5,
    name: 'Wireless Mouse Gaming',
    price: 350000,
    image: 'https://images.unsplash.com/photo-1629121291243-7b5e885cce9b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 6,
    name: 'Headphone Gaming Stereo',
    price: 650000,
    image: 'https://images.unsplash.com/photo-1677086813101-496781a0f327?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 7,
    name: 'USB Hub 7-Port 3.0',
    price: 280000,
    image: 'https://images.unsplash.com/photo-1760376789478-c1023d2dc007?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 8,
    name: 'Power Supply 650W Modular',
    price: 1100000,
    image: 'https://m.media-amazon.com/images/I/71HEQ9FBF9L._AC_SL1500_.jpg'
  }
];

let cart = [];

const productGrid = document.getElementById('productGrid');
const cartList = document.getElementById('cartList');
const cartCount = document.getElementById('cartCount');
const iconBadge = document.getElementById('iconBadge');
const cartStatus = document.getElementById('cartStatus');
const summaryItems = document.getElementById('summaryItems');
const summaryTotal = document.getElementById('summaryTotal');
const checkoutButton = document.getElementById('checkoutButton');

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
}

function renderProducts() {
  productGrid.innerHTML = products.map(product => {
    return `
      <article class="card">
        <img src="${product.image}" alt="Produk ${product.name}" />
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <p class="card-price">${formatCurrency(product.price)}</p>
          <div class="card-actions">
            <span>${formatCurrency(product.price)}</span>
            <button class="button" type="button" data-action="add" data-id="${product.id}">Tambah ke Keranjang</button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function getCartItemCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const product = products.find(product => product.id === item.productId);
    return sum + (product.price * item.quantity);
  }, 0);
}

function renderCart() {
  const totalItems = getCartItemCount();
  const totalPrice = getCartTotal();

  cartCount.textContent = totalItems;
  iconBadge.textContent = `${totalItems} item`;
  summaryItems.textContent = totalItems;
  summaryTotal.textContent = formatCurrency(totalPrice);
  cartStatus.textContent = totalItems === 0 ? 'Belum ada produk dalam keranjang.' : 'Item sudah ditambahkan ke keranjang.';
  checkoutButton.disabled = totalItems === 0;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <li class="empty-state">Keranjang kosong. Tambahkan produk terlebih dahulu.</li>
    `;
    return;
  }

  cartList.innerHTML = cart.map(item => {
    const product = products.find(product => product.id === item.productId);
    return `
      <li class="cart-item">
        <div class="item-info">
          <strong>${product.name}</strong>
          <span class="item-subtitle">${formatCurrency(product.price)} × ${item.quantity}</span>
          <span class="item-subtitle">Subtotal: ${formatCurrency(product.price * item.quantity)}</span>
        </div>
        <div class="item-actions">
          <div class="qty-controls">
            <button class="icon-button" type="button" data-action="decrease" data-id="${item.productId}">−</button>
            <span>${item.quantity}</span>
            <button class="icon-button" type="button" data-action="increase" data-id="${item.productId}">+</button>
          </div>
          <button class="icon-button remove-button" type="button" data-action="remove" data-id="${item.productId}">Hapus</button>
        </div>
      </li>
    `;
  }).join('');
}

function findCartItem(productId) {
  return cart.find(item => item.productId === productId);
}

function addToCart(productId) {
  const existingItem = findCartItem(productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }
  renderCart();
}

function updateCartItem(productId, change) {
  const existingItem = findCartItem(productId);
  if (!existingItem) return;

  existingItem.quantity += change;
  if (existingItem.quantity <= 0) {
    cart = cart.filter(item => item.productId !== productId);
  }
  renderCart();
}

function removeCartItem(productId) {
  cart = cart.filter(item => item.productId !== productId);
  renderCart();
}

function handleProductClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'add') {
    addToCart(id);
  }
}

function handleCartClick(event) {
  const button = event.target.closest('button');
  if (!button) return;

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  if (action === 'increase') {
    updateCartItem(id, 1);
  }
  if (action === 'decrease') {
    updateCartItem(id, -1);
  }
  if (action === 'remove') {
    removeCartItem(id);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert('Keranjang masih kosong. Tambahkan produk terlebih dahulu.');
    return;
  }

  const lines = cart.map(item => {
    const product = products.find(product => product.id === item.productId);
    return `${product.name} x ${item.quantity} = ${formatCurrency(product.price * item.quantity)}`;
  });

  const summary = [`Ringkasan Order:`, ...lines, '', `Total Item: ${getCartItemCount()}`, `Total Harga: ${formatCurrency(getCartTotal())}`];
  alert(summary.join('\n'));
}

function init() {
  renderProducts();
  renderCart();
  productGrid.addEventListener('click', handleProductClick);
  cartList.addEventListener('click', handleCartClick);
  checkoutButton.addEventListener('click', checkout);
}

window.addEventListener('DOMContentLoaded', init);

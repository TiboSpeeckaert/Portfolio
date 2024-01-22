document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupModal();
  attachCartToggleEventHandler();

  const closeCartButton = document.getElementById("closeCartButton");
  if (closeCartButton) {
    closeCartButton.addEventListener("click", function () {
      toggleCart();
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
});

function handleContactFormSubmit(event) {
  event.preventDefault();
  alert("Thank you for contacting us!");
}

const products = [
  {
    id: 1,
    name: "Vans Classic",
    description: "Timeless skate style.",
    image: "img/shoe1.png",
  },
  {
    id: 2,
    name: "Vans Old Skool",
    description: "Iconic side stripe.",
    image: "img/shoe2.avif",
  },
  {
    id: 3,
    name: "Vans Sk8-Hi",
    description: "Legendary lace-up high top.",
    image: "img/shoe3.webp",
  },
  {
    id: 4,
    name: "Vans Authentic",
    description: "The original since 1966.",
    image: "img/shoe4.avif",
  },
  {
    id: 5,
    name: "Vans Era",
    description: "The classic low top.",
    image: "img/shoe5.png",
  },
];

let cart = [];

function loadProducts() {
  const productGallery = document.querySelector(".product-gallery");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onclick="showProductDetails(${product.id})">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    productGallery.appendChild(productDiv);
  });
}

function setupModal() {
  const modal = document.getElementById("productModal");
  const closeButton = document.querySelector(".close-button");
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

function showProductDetails(productId) {
  const product = products.find((p) => p.id === productId);
  const modal = document.getElementById("productModal");
  modal.querySelector(".modal-content").innerHTML = `
        <span class="close-button" onclick="closeModal()">&times;</span>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src="${product.image}" alt="${product.name}" style="width:100%;">
    `;
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("productModal");
  modal.style.display = "none";
}

function attachCartToggleEventHandler() {
  const cartToggle = document.getElementById("cartToggle");
  if (cartToggle) {
    cartToggle.addEventListener("click", toggleCart);
  } else {
    console.error("Cart toggle button not found");
  }
}

function toggleCart() {
  console.log("Toggle cart called");
  const cartSidebar = document.getElementById("cartSidebar");
  if (cartSidebar) {
    cartSidebar.style.display =
      cartSidebar.style.display === "block" ? "none" : "block";
  } else {
    console.error("Cart sidebar not found");
  }
}

function addToCart(productId) {
  // Find the index of the product in the cart
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
    // Product is already in the cart, increase the quantity
    cart[productIndex].quantity++;
  } else {
    // Product is not in the cart, find it in the products array
    const product = products.find((item) => item.id === productId);
    if (product) {
      // Add the product to the cart with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }
  }

  // Update the cart display after adding the product
  updateCartDisplay();
}

function removeFromCart(productId) {
  const productIndex = cart.findIndex((p) => p.id === productId);

  if (cart[productIndex].quantity > 1) {
    cart[productIndex].quantity -= 1;
  } else {
    cart.splice(productIndex, 1);
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = ""; // Clear existing cart items

  cart.forEach((product) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    // Create image element
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.name;
    img.style.width = "50px"; // Set a fixed width for the image
    img.style.height = "auto";
    img.style.marginRight = "10px";

    // Create paragraph element for product name and quantity
    const p = document.createElement("p");
    p.textContent = `${product.name} - Quantity: ${product.quantity}`;

    // Create decrement button
    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.onclick = function () {
      removeFromCart(product.id, false); // Pass false to decrease quantity
    };

    // Create increment button
    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.onclick = function () {
      addToCart(product.id); // Reuse addToCart to increment quantity
    };

    // Create remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeFromCart(product.id, true); // Pass true to remove the item
    };

    // Append elements to itemDiv
    itemDiv.appendChild(img);
    itemDiv.appendChild(p);
    itemDiv.appendChild(decrementButton);
    itemDiv.appendChild(incrementButton);
    itemDiv.appendChild(removeButton);

    // Append itemDiv to cartItems
    cartItems.appendChild(itemDiv);
  });
}

function removeFromCart(productId, removeAll) {
  const productIndex = cart.findIndex((p) => p.id === productId);

  if (productIndex === -1) return; // Product not found in cart

  if (removeAll || cart[productIndex].quantity === 1) {
    // Remove item from cart if removeAll is true or quantity is 1
    cart.splice(productIndex, 1);
  } else {
    // Decrease quantity
    cart[productIndex].quantity -= 1;
  }

  updateCartDisplay();
}

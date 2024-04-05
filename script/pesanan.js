(function () {
  // Variabel yang menyimpan elemen-elemen DOM
  const productsContainer = document.querySelector("#card-tour");
  const cartContainer = document.querySelector("#shopping-cart");
  const cartContent = document.querySelector("#cart-content");
  const toggleCartBtn = document.querySelector("#toggle-cart-btn");
  const clearCartBtn = document.querySelector("#clear-cart");
  const checkoutBtn = document.querySelector("#checkout-btn");
  const totalPriceContainer = document.querySelector("#total-price");



  // Fungsi untuk menampilkan atau menyembunyikan keranjang belanja
  function toggleCart() {
    cartContainer.classList.toggle("open");
  }

  // Fungsi untuk menangani pengiriman pesanan
  function submitOrder(e) {
    e.preventDefault();
    alert("Pesanan berhasil dikirim!");
    clearCart();
  }

  // Mendengarkan event submit pada form pesanan
  document.getElementById("order-form").addEventListener("submit", submitOrder);

  // Fungsi untuk mendapatkan konten dari local storage
  function getLSContent() {
    const lsContent = JSON.parse(localStorage.getItem("products")) || [];
    return lsContent;
  }

  // Fungsi untuk menyimpan konten ke local storage
  function setLSContent(lsContent) {
    localStorage.setItem("products", JSON.stringify(lsContent));
  }

  // Fungsi untuk menghitung total harga produk di keranjang belanja
  function calculateTotal(prices) {
    return prices.reduce(function (prev, next) {
      return prev + next;
    }, 0);
  }

  // Fungsi untuk mendapatkan harga produk di keranjang belanja
  function getCartItemPrices() {
    const prices = [];
    let nums = cartContent.querySelectorAll("tr td:nth-child(3)");

    if (nums.length > 0) {
      for (let cell = 0; cell < nums.length; cell++) {
        let num = nums[cell].innerText;
        num = num.replace(/[^\d]/g, "");
        num = parseFloat(num);
        prices.push(num);
      }
      return prices;
    } else {
      return;
    }
  }

  // Fungsi untuk menampilkan total harga di keranjang belanja
  function displayCartTotal() {
    const prices = getCartItemPrices();
    let total = 0;
    if (prices) {
      total = calculateTotal(prices);
      totalPriceContainer.innerHTML = `<span class="total">Total: Rp.${total.toFixed(2)}</span>`;
    } else {
      totalPriceContainer.innerHTML = '<span class="total">Total: Rp.0,00</span>';
    }
  }

  // Fungsi untuk menampilkan produk di keranjang belanja
  function displayProducts() {
    const lsContent = getLSContent();
    let productMarkup = "";
    if (lsContent !== null) {
      for (let product of lsContent) {
        productMarkup += `
          <tr>
            <td><img class="cart-image" src="${product.image}" alt="${product.name}" width="120"></td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td><a href="#" data-id="${product.id}" class="remove">X</a></td>
          </tr>
        `;
      }
    } else {
      productMarkup = "Keranjang Anda kosong.";
    }
    cartContent.querySelector("tbody").innerHTML = productMarkup;
  }
  

  // Fungsi untuk menyimpan produk ke keranjang belanja
  function saveProduct(clickedBtn) {
    const productId = clickedBtn.getAttribute("data-id");
    const card = clickedBtn.parentElement.parentElement;
    const cardInfo = clickedBtn.parentElement;
    const prodImage = card.querySelector("img").src;
    const prodName = cardInfo.querySelector("h3").textContent;
    const prodPrice = cardInfo.querySelector(".card__price").textContent;

    let isProductInCart = false;
    const lsContent = getLSContent();

    lsContent.forEach(function (product) {
      if (product.id === productId) {
        alert("Produk ini sudah ada di keranjang Anda.");
        isProductInCart = true;
      }
    });

    if (!isProductInCart) {
      lsContent.push({
        id: productId,
        image: prodImage,
        name: prodName,
        price: prodPrice,
      });

      setLSContent(lsContent);
      displayProducts();
    }
  }

  // Fungsi untuk menghapus produk dari keranjang belanja
  function removeProduct(productId) {
    const lsContent = getLSContent();
    let productIndex;
    lsContent.forEach(function (product, i) {
      if (product.id === productId) {
        productIndex = i;
      }
    });

    lsContent.splice(productIndex, 1);
    setLSContent(lsContent);
    displayProducts();
  }

  // Fungsi untuk mengosongkan keranjang belanja
  function clearCart() {
    const lsContent = getLSContent();
    lsContent.splice(0, lsContent.length);
    setLSContent(lsContent);
    displayProducts();
  }

  // Fungsi untuk melakukan checkout
  function checkout() {
    const cartItems = cartContent.querySelectorAll("tr");
    let message = "Pesanan Anda:\n";

    cartItems.forEach(function (item) {
      const productNameElement = item.querySelector("td:nth-child(2)");
      const productPriceElement = item.querySelector("td:nth-child(3)");
      const productName = productNameElement ? productNameElement.textContent : "";
      const productPrice = productPriceElement ? productPriceElement.textContent : "";
      message += `${productName} - ${productPrice}\n`;
    });

    const name = document.querySelector("#name").value;
    const address = document.querySelector("#address").value;
    const phone = document.querySelector("#phone").value;
    const description = document.querySelector("#description").value;

    message += `\nNama: ${name}\n`;
    message += `Alamat: ${address}\n`;
    message += `Telepon: ${phone}\n`;
    message += `Deskripsi: ${description}`;

    const whatsappURL = `https://api.whatsapp.com/send?phone=6282145674937&text=${encodeURIComponent(message)}`;
    window.open(whatsappURL);

    clearCart();
  }

  // Event saat halaman selesai dimuat
  document.addEventListener("DOMContentLoaded", function (e) {
    displayProducts();
    displayCartTotal();
  });

  // Event untuk menampilkan atau menyembunyikan keranjang belanja
  toggleCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    toggleCart();
  });

  // Event untuk menambahkan produk ke keranjang belanja
  document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(function(button) {
      button.addEventListener("click", function() {
        saveProduct(this); // "this" refers to the clicked button element
      });
    });
  });
  

  // Event untuk menghapus produk dari keranjang belanja
  cartContent.querySelector("tbody").addEventListener("click", function (e) {
    e.preventDefault();
    const clickedBtn = e.target;
    if (e.target.classList.contains("remove")) {
      const productId = clickedBtn.getAttribute("data-id");
      removeProduct(productId);
      displayCartTotal();
    }
  });

  // Event untuk mengosongkan keranjang belanja
  clearCartBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearCart();
    displayCartTotal();
  });

  // Event untuk melakukan checkout
  checkoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    checkout();
    displayCartTotal();
  });
})();

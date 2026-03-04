/* =============================================
   TopLap – Main JavaScript
   ============================================= */

// ========== PRODUCT DATA ==========
const PRODUCTS = [
  // LAPTOPS
  { id: 1, name: "Dell XPS 15 OLED", category: "laptops", brand: "dell", price: 149999, oldPrice: 175000, rating: 4.9, reviews: 312, image: "images/laptop.png", badge: "New", specs: "Intel Core i9 | 32GB RAM | 1TB SSD | RTX 4060" },
  { id: 2, name: "ASUS ROG Zephyrus G16", category: "laptops", brand: "asus", price: 189999, oldPrice: 220000, rating: 4.8, reviews: 245, image: "images/laptop2.png", badge: "Hot", specs: "AMD Ryzen 9 | 32GB RAM | 1TB SSD | RTX 4080" },
  { id: 3, name: "Lenovo ThinkPad X1 Carbon", category: "laptops", brand: "lenovo", price: 124999, oldPrice: 145000, rating: 4.7, reviews: 187, image: "images/laptop.png", badge: "Sale", specs: "Intel Core i7 | 16GB RAM | 512GB SSD | 14\" IPS" },
  { id: 4, name: "Dell Inspiron 14 Plus", category: "laptops", brand: "dell", price: 79999, oldPrice: 95000, rating: 4.5, reviews: 423, image: "images/laptop2.png", badge: null, specs: "Intel Core i5 | 16GB RAM | 512GB SSD | 14\" FHD" },
  { id: 5, name: "ASUS VivoBook 16X", category: "laptops", brand: "asus", price: 64999, oldPrice: 75000, rating: 4.4, reviews: 536, image: "images/laptop.png", badge: "Sale", specs: "AMD Ryzen 7 | 16GB RAM | 512GB SSD | 16\" FHD+" },
  { id: 6, name: "Lenovo IdeaPad Gaming 3", category: "laptops", brand: "lenovo", price: 54999, oldPrice: 69999, rating: 4.6, reviews: 712, image: "images/laptop2.png", badge: "Hot", specs: "AMD Ryzen 5 | 8GB RAM | 512GB SSD | RTX 3050" },

  // MACBOOKS
  { id: 7, name: "MacBook Pro 14\" M3 Pro", category: "macbooks", brand: "apple", price: 199999, oldPrice: 219999, rating: 5.0, reviews: 892, image: "images/macbook.png", badge: "New", specs: "Apple M3 Pro | 18GB RAM | 512GB SSD | 14\" ProMotion" },
  { id: 8, name: "MacBook Air 15\" M3", category: "macbooks", brand: "apple", price: 149999, oldPrice: 164999, rating: 4.9, reviews: 1043, image: "images/macbook.png", badge: "Hot", specs: "Apple M3 | 16GB RAM | 512GB SSD | 15.3\" Liquid Retina" },
  { id: 9, name: "MacBook Pro 16\" M3 Max", category: "macbooks", brand: "apple", price: 299999, oldPrice: 329999, rating: 5.0, reviews: 421, image: "images/macbook.png", badge: "Premium", specs: "Apple M3 Max | 36GB RAM | 1TB SSD | 16.2\" ProMotion" },
  { id: 10, name: "MacBook Air 13\" M2", category: "macbooks", brand: "apple", price: 114999, oldPrice: 124999, rating: 4.9, reviews: 2341, image: "images/macbook.png", badge: "Sale", specs: "Apple M2 | 8GB RAM | 256GB SSD | 13.6\" Liquid Retina" },

  // TABLETS
  { id: 11, name: "iPad Pro 13\" M4", category: "tablets", brand: "apple", price: 119999, oldPrice: 139999, rating: 4.9, reviews: 654, image: "images/tablet.png", badge: "New", specs: "Apple M4 | 8GB RAM | 256GB | 13\" Ultra Retina XDR" },
  { id: 12, name: "iPad Air 11\" M2", category: "tablets", brand: "apple", price: 74999, oldPrice: 84999, rating: 4.8, reviews: 876, image: "images/tablet2.png", badge: "Hot", specs: "Apple M2 | 8GB RAM | 128GB | 11\" Liquid Retina" },
  { id: 13, name: "Samsung Galaxy Tab S9 Ultra", category: "tablets", brand: "samsung", price: 109999, oldPrice: 124999, rating: 4.7, reviews: 432, image: "images/tablet.png", badge: "Sale", specs: "Snapdragon 8 Gen 2 | 12GB | 256GB | 14.6\" AMOLED" },
  { id: 14, name: "Samsung Galaxy Tab S9 FE", category: "tablets", brand: "samsung", price: 44999, oldPrice: 52999, rating: 4.5, reviews: 321, image: "images/tablet2.png", badge: null, specs: "Exynos 1380 | 8GB | 128GB | 10.9\" TFT LCD" },
  { id: 15, name: "Lenovo Tab P12 Pro", category: "tablets", brand: "lenovo", price: 64999, oldPrice: 74999, rating: 4.6, reviews: 218, image: "images/tablet.png", badge: null, specs: "Snapdragon 870 | 8GB | 256GB | 12.6\" AMOLED" },
];

// Format Indian Rupees
function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

// Star display
function starsHTML(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  let s = "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - half);
  return s;
}

// Build product card HTML
function buildProductCard(p) {
  return `
    <div class="product-card" data-id="${p.id}" data-cat="${p.category}">
      ${p.badge ? `<div class="product-badge${p.badge === 'Sale' ? ' sale' : ''}">${p.badge}</div>` : ""}
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
        <div class="product-actions">
          <button class="action-btn" title="Quick View" onclick="quickView(${p.id})">👁️</button>
          <button class="action-btn" title="Wishlist" onclick="addWishlist(${p.id},this)">♡</button>
        </div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p style="color:var(--text-muted);font-size:0.78rem;margin-bottom:0.5rem;">${p.specs}</p>
        <div class="product-meta">
          <span class="stars">${starsHTML(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
        <div class="product-price">
          <span class="price-current">${formatPrice(p.price)}</span>
          ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
        </div>
        <button class="add-to-cart" onclick="addToCart(${p.id})">🛒 Add to Cart</button>
      </div>
    </div>
  `;
}

// ========== CART ==========
let cart = JSON.parse(localStorage.getItem("toplap_cart") || "[]");

function saveCart() { localStorage.setItem("toplap_cart", JSON.stringify(cart)); }

function getCartCount() { return cart.reduce((s, i) => s + i.qty, 0); }

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);

  const cartItemsEl = document.getElementById("cartItems");
  const cartFooterEl = document.getElementById("cartFooter");
  const cartTotalEl = document.getElementById("cartTotal");

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty"><div class="empty-icon">🛒</div><p>Your cart is empty</p><a href="shop.html" class="btn-primary" style="display:inline-block;margin-top:1rem;padding:10px 24px;border-radius:50px;font-size:0.9rem;">Browse Products</a></div>`;
    if (cartFooterEl) cartFooterEl.style.display = "none";
    return;
  }

  if (cartFooterEl) cartFooterEl.style.display = "block";

  let html = "";
  let total = 0;

  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return;
    const subtotal = p.price * item.qty;
    total += subtotal;
    html += `
      <div class="cart-item">
        <div class="cart-item-img"><img src="${p.image}" alt="${p.name}" /></div>
        <div class="cart-item-info">
          <h4>${p.name}</h4>
          <div class="cart-item-price">${formatPrice(p.price)}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="changeQty(${p.id},-1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${p.id},1)">+</button>
          </div>
        </div>
        <button class="remove-item" onclick="removeFromCart(${p.id})" title="Remove">🗑️</button>
      </div>
    `;
  });

  cartItemsEl.innerHTML = html;
  if (cartTotalEl) cartTotalEl.textContent = formatPrice(total);
}

function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) item.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  const p = PRODUCTS.find(x => x.id === id);
  showToast(`✅ "${p.name}" added to cart!`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function handleCheckout() {
  showToast("🚀 Redirecting to checkout...");
  setTimeout(() => {
    cart = [];
    saveCart();
    updateCartUI();
    closeCart();
    showToast("🎉 Order placed successfully! Thank you for shopping with TopLap.");
  }, 1800);
}

// ========== CART SIDEBAR ==========
function openCart() {
  document.getElementById("cartSidebar")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("open");
}
function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("open");
}

// ========== TOAST ==========
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  const tMsg = document.getElementById("toastMsg");
  if (!t || !tMsg) return;
  tMsg.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

// ========== WISHLIST ==========
function addWishlist(id, btn) {
  const p = PRODUCTS.find(x => x.id === id);
  if (btn) btn.textContent = btn.textContent === "♡" ? "♥" : "♡";
  showToast(`💙 "${p.name}" ${btn.textContent === "♥" ? "added to" : "removed from"} wishlist!`);
}

// ========== QUICK VIEW ==========
function quickView(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  showToast(`👁️ ${p.name} — ${p.specs}`);
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const cartToggle = document.getElementById("cartToggle");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 40);
  });

  hamburger?.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks?.classList.toggle("open");
  });

  cartToggle?.addEventListener("click", () => {
    updateCartUI();
    openCart();
  });
  cartClose?.addEventListener("click", closeCart);
  cartOverlay?.addEventListener("click", closeCart);
}

// ========== FILTER TABS (Homepage) ==========
function initFilterTabs() {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      renderFeaturedGrid(filter);
    });
  });
}

// ========== RENDER FEATURED GRID (Homepage) ==========
function renderFeaturedGrid(filter = "all") {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  const filtered = filter === "all" ? PRODUCTS.slice(0, 8) : PRODUCTS.filter(p => p.category === filter).slice(0, 8);
  grid.innerHTML = filtered.map(buildProductCard).join("") || "<p style='color:var(--text-muted);text-align:center;grid-column:1/-1;'>No products found.</p>";
}

// ========== RENDER SHOP GRID ==========
function renderShopGrid(products = PRODUCTS) {
  const grid = document.getElementById("shopGrid");
  if (!grid) return;
  grid.innerHTML = products.map(buildProductCard).join("") || "<p style='color:var(--text-muted);text-align:center;grid-column:1/-1;padding:2rem;'>No products match your filters.</p>";
  const rc = document.getElementById("resultsCount");
  if (rc) rc.textContent = `Showing ${products.length} product${products.length !== 1 ? "s" : ""}`;
}

// ========== SHOP PAGE FILTERS ==========
function initShopFilters() {
  const priceRange = document.getElementById("priceRange");
  const priceLabel = document.getElementById("priceLabel");
  const sortEl = document.getElementById("shopSort");
  const clearBtn = document.getElementById("clearFilters");

  function applyFilters() {
    const activeCats = [...document.querySelectorAll(".cat-filter:checked")].map(el => el.value);
    const activeBrands = [...document.querySelectorAll(".brand-filter:checked")].map(el => el.value);
    const maxPrice = priceRange ? parseInt(priceRange.value) : 300000;
    const sort = sortEl ? sortEl.value : "default";

    let filtered = PRODUCTS.filter(p =>
      activeCats.includes(p.category) &&
      activeBrands.includes(p.brand) &&
      p.price <= maxPrice
    );

    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

    renderShopGrid(filtered);
  }

  if (priceRange) {
    priceRange.addEventListener("input", () => {
      priceLabel.textContent = "₹" + parseInt(priceRange.value).toLocaleString("en-IN");
      applyFilters();
    });
  }

  document.querySelectorAll(".cat-filter, .brand-filter").forEach(el => {
    el.addEventListener("change", applyFilters);
  });

  sortEl?.addEventListener("change", applyFilters);
  document.getElementById("mobileSort")?.addEventListener("change", e => {
    if (sortEl) sortEl.value = e.target.value;
    applyFilters();
  });

  clearBtn?.addEventListener("click", () => {
    document.querySelectorAll(".cat-filter, .brand-filter").forEach(el => el.checked = true);
    if (priceRange) { priceRange.value = 300000; priceLabel.textContent = "₹3,00,000"; }
    if (sortEl) sortEl.value = "default";
    renderShopGrid();
  });

  // Pre-filter by URL param
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  if (cat) {
    document.querySelectorAll(".cat-filter").forEach(el => { el.checked = el.value === cat; });
    applyFilters();
  } else {
    renderShopGrid();
  }
}

// ========== COUNTDOWN TIMER ==========
function initCountdown() {
  const target = new Date();
  target.setHours(target.getHours() + 11, target.getMinutes() + 59, target.getSeconds() + 59);

  function tick() {
    const now = new Date();
    let diff = Math.max(0, target - now);
    const h = Math.floor(diff / 3600000); diff -= h * 3600000;
    const m = Math.floor(diff / 60000); diff -= m * 60000;
    const s = Math.floor(diff / 1000);
    const pad = n => String(n).padStart(2, "0");
    const hEl = document.getElementById("cH");
    const mEl = document.getElementById("cM");
    const sEl = document.getElementById("cS");
    if (hEl) hEl.textContent = pad(h);
    if (mEl) mEl.textContent = pad(m);
    if (sEl) sEl.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);
}

// ========== NEWSLETTER ==========
function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById("nlEmail");
  showToast(`🎉 Subscribed with ${email.value}! Welcome to TopLap!`);
  if (email) email.value = "";
}

// ========== CONTACT FORM ==========
function handleContactForm(e) {
  e.preventDefault();
  showToast("📨 Message sent! We'll reply within 24 hours.");
  e.target.reset();
}

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll(".product-card, .cat-card, .feature-card, .testimonial-card, .value-card, .team-card").forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    observer.observe(el);
  });
}

// ========== INIT ==========
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  updateCartUI();
  renderFeaturedGrid();
  initFilterTabs();
  initCountdown();
  setTimeout(initScrollAnimations, 100);
});

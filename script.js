// Dummy Product Data
const products = [
    {
        id: 1,
        name: "Fresh Oyster Mushrooms",
        price: 60,
        originalPrice: 70,
        unit: "120g",
        description: "Freshly harvested, 100% natural, and sustainably grown oyster mushrooms. Perfect for a healthy and tasty meal.",
        imagePath: "assets/packed_oyster.png" // The dedicated packed mushroom image
    },
    {
        id: 2,
        name: "Homemade Mushroom Pickle",
        price: 100,
        originalPrice: 110,
        unit: "150g",
        description: "Hygienically prepared, homemade mushroom pickle made with care and love. No chemicals, no preservatives, just pure nutrition and amazing taste.",
        imagePath: "assets/pickle.png" // The pickle image
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    renderProducts();
    setupScrollReveal();
    setupNavbarScroll();
});

// Scroll Animations
function setupScrollReveal() {
    const reveals = document.querySelectorAll('.feature-card, .section-header, .product-card, .about-container, .hero-content');
    
    // initially add reveal class
    reveals.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));
}

function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


// Navigation Logic (SPA)
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            navigateTo(targetId);

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Close mobile menu on click
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });
}

function navigateTo(viewId) {
    // Update Views
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active-view');
    });

    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.add('active-view');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update nav links if navigated via button
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('data-target') === viewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Render Products in Grid
function renderProducts() {
    const productsGrid = document.getElementById('products-list');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductDetail(product.id);

        card.innerHTML = `
            <div class="product-img-container">
                ${product.imagePath ? `<img src="${product.imagePath}" alt="${product.name}" class="product-img">` : `<span>Image: ${product.name}</span>`}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">
                    ${product.originalPrice ? `<del style="color: #999; font-size: 0.85em; font-weight: normal; margin-right: 6px;">₹${product.originalPrice}</del>` : ''}₹${product.price} / ${product.unit}
                </div>
                <button class="view-btn">View Details</button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Open Product Detail View
function openProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const detailContainer = document.getElementById('detail-content');

    detailContainer.innerHTML = `
        <div class="detail-img-container">
             ${product.imagePath ? `<img src="${product.imagePath}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">` : `<span>Image: ${product.name}</span>`}
        </div>
        <div class="detail-info">
            <h2>${product.name}</h2>
            <div class="price">
                ${product.originalPrice ? `<del style="color: #999; font-size: 0.8em; font-weight: normal; margin-right: 8px;">₹${product.originalPrice}</del>` : ''}₹${product.price} / ${product.unit}
            </div>
            <p class="description">${product.description}</p>
            
            <div class="order-actions">
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(-1)">-</button>
                    <input type="number" id="product-qty" class="qty-input" value="1" min="1" readonly>
                    <button class="qty-btn" onclick="updateQuantity(1)">+</button>
                </div>
                <button class="whatsapp-btn" onclick="orderViaWhatsApp(${product.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                    </svg>
                    Order via WhatsApp
                </button>
            </div>
            <div class="benefits">
                <h4>Why Choose Mush Fit?</h4>
                <ul style="margin-top: 0.5rem; margin-left: 1.5rem; color: var(--text-muted);">
                    <li>100% Organic & Pesticide Free</li>
                    <li>Harvested on the day of delivery</li>
                    <li>Packed in eco-friendly materials</li>
                </ul>
            </div>
        </div>
    `;

    navigateTo('product-detail');
}

// Quantity Control
function updateQuantity(change) {
    const qtyInput = document.getElementById('product-qty');
    let currentQty = parseInt(qtyInput.value);

    let newQty = currentQty + change;
    if (newQty < 1) newQty = 1;

    qtyInput.value = newQty;
}

// WhatsApp Order Integration
function orderViaWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    const qty = document.getElementById('product-qty').value;

    const phoneNumber = "9496761502"; // Replace with actual business number

    const message = `Hello Mush Fit! 🌱\n\nI would like to order:\n*${product.name}*\nQuantity: ${qty} x ${product.unit}\nTotal Approximate Price: ₹${product.price * qty}\n\nPlease let me know the delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
}

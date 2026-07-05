import React, { useState } from "react";
import "./App.css";

const PRODUCTS = [
  {
    id: 1,
    name: "TechWave Phone X",
    brand: "TechWave",
    type: "Smartphone",
    storage: "128GB",
    price: 899,
    color: "Black",
  },
  {
    id: 2,
    name: "TechWave Phone Lite",
    brand: "TechWave",
    type: "Smartphone",
    storage: "64GB",
    price: 599,
    color: "Blue",
  },
  {
    id: 3,
    name: "ProSound Wireless Headphones",
    brand: "ProSound",
    type: "Accessory",
    storage: "N/A",
    price: 199,
    color: "White",
  },
  {
    id: 4,
    name: "UltraCharge USB‑C Charger",
    brand: "PowerMax",
    type: "Accessory",
    storage: "N/A",
    price: 49,
    color: "Black",
  },
  {
    id: 5,
    name: "TechWave Phone Pro",
    brand: "TechWave",
    type: "Smartphone",
    storage: "256GB",
    price: 1099,
    color: "Silver",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState(1); // 1: Cart, 2: Info, 3: Payment, 4: Confirmation
  const [filters, setFilters] = useState({
    brand: "",
    type: "",
    maxPrice: "",
    storage: "",
  });
  const [surveyVisible, setSurveyVisible] = useState(false);
  const [survey, setSurvey] = useState({
    rating: "",
    comment: "",
  });

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setSurveyVisible(true); // déclenche le sondage après interaction
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (filters.brand && p.brand !== filters.brand) return false;
    if (filters.type && p.type !== filters.type) return false;
    if (filters.storage && p.storage !== filters.storage) return false;
    if (filters.maxPrice && p.price > Number(filters.maxPrice)) return false;
    return true;
  });

  const cartTotal = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="app">
      <header className="header">
        <h1>TechWave Store</h1>
        <p className="tagline">
          Your trusted destination for smartphones and IT accessories.
        </p>
        <nav className="nav">
          <button onClick={() => setStep(1)}>Shop & Cart</button>
          <button onClick={() => setStep(2)}>Checkout</button>
          <button onClick={() => setStep(3)}>Payment</button>
          <button onClick={() => setStep(4)}>Confirmation</button>
        </nav>
        <p className="step-indicator">
          Checkout process step: <strong>{step}</strong> / 4
        </p>
      </header>

      <main className="main">
        {/* Faceted search + product exploration */}
        <section className="exploration">
          <h2>Explore our products</h2>
          <p>
            Use the filters below to narrow down your search. We help you find
            the right phone or accessory based on brand, type, storage and
            price.
          </p>

          <div className="facets">
            <div className="facet">
              <label>Brand</label>
              <select
                value={filters.brand}
                onChange={(e) =>
                  setFilters({ ...filters, brand: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="TechWave">TechWave</option>
                <option value="ProSound">ProSound</option>
                <option value="PowerMax">PowerMax</option>
              </select>
            </div>

            <div className="facet">
              <label>Type</label>
              <select
                value={filters.type}
                onChange={(e) =>
                  setFilters({ ...filters, type: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Accessory">Accessory</option>
              </select>
            </div>

            <div className="facet">
              <label>Max price ($)</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters({ ...filters, maxPrice: e.target.value })
                }
                placeholder="e.g. 800"
              />
            </div>

            <div className="facet">
              <label>Storage</label>
              <select
                value={filters.storage}
                onChange={(e) =>
                  setFilters({ ...filters, storage: e.target.value })
                }
              >
                <option value="">All</option>
                <option value="64GB">64GB</option>
                <option value="128GB">128GB</option>
                <option value="256GB">256GB</option>
                <option value="N/A">N/A</option>
              </select>
            </div>
          </div>

          <div className="product-list">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <h3>{p.name}</h3>
                <p className="product-brand">{p.brand}</p>
                <p>
                  <strong>Type:</strong> {p.type}
                </p>
                <p>
                  <strong>Storage:</strong> {p.storage}
                </p>
                <p>
                  <strong>Color:</strong> {p.color}
                </p>
                <p className="price">${p.price}</p>
                <button onClick={() => addToCart(p)}>
                  Add to cart – Limited time offer!
                </button>
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <p>No products match your filters. Try adjusting your criteria.</p>
            )}
          </div>
        </section>

        {/* Checkout process: follow instructions */}
        <section className="checkout">
          <h2>Checkout process</h2>
          {step === 1 && (
            <div className="step">
              <h3>Step 1 – Cart</h3>
              <p>
                Review the items you have selected. You can remove items or
                continue shopping.
              </p>
              {cart.length === 0 ? (
                <p>Your cart is empty. Start by adding a product.</p>
              ) : (
                <ul>
                  {cart.map((p, idx) => (
                    <li key={idx}>
                      {p.name} – ${p.price}
                    </li>
                  ))}
                </ul>
              )}
              <p>
                <strong>Total:</strong> ${cartTotal}
              </p>
              <button
                disabled={cart.length === 0}
                onClick={() => setStep(2)}
              >
                Proceed to personal information
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <h3>Step 2 – Personal information</h3>
              <p>
                Please provide your contact and shipping details so we can
                deliver your order.
              </p>
              <form className="form">
                <label>
                  Full name
                  <input type="text" placeholder="John Doe" />
                </label>
                <label>
                  Email
                  <input type="email" placeholder="john@example.com" />
                </label>
                <label>
                  Shipping address
                  <input type="text" placeholder="123 Main Street" />
                </label>
              </form>
              <button onClick={() => setStep(1)}>Back to cart</button>
              <button onClick={() => setStep(3)}>Proceed to payment</button>
            </div>
          )}

          {step === 3 && (
            <div className="step">
              <h3>Step 3 – Payment</h3>
              <p>
                Enter your payment information. This is a simulation; no real
                payment will be processed.
              </p>
              <form className="form">
                <label>
                  Card number
                  <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                </label>
                <label>
                  Expiry date
                  <input type="text" placeholder="MM/YY" />
                </label>
                <label>
                  CVV
                  <input type="text" placeholder="123" />
                </label>
              </form>
              <button onClick={() => setStep(2)}>Back to personal info</button>
              <button onClick={() => setStep(4)}>Confirm order</button>
            </div>
          )}

          {step === 4 && (
            <div className="step">
              <h3>Step 4 – Confirmation</h3>
              <p>
                Thank you for your purchase! Your order has been received and is
                being processed.
              </p>
              <p>
                You will receive a confirmation email with your order details
                shortly.
              </p>
              <button onClick={() => setStep(1)}>Start a new order</button>
            </div>
          )}
        </section>

        {/* Communication process: survey */}
        {surveyVisible && (
          <section className="survey">
            <h2>We’d love your feedback</h2>
            <p>
              We care about your experience. Could you take a moment to rate
              your visit? Your voice helps us improve.
            </p>
            <form
              className="form"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for your feedback!");
                setSurveyVisible(false);
              }}
            >
              <label>
                Overall experience (1–5)
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={survey.rating}
                  onChange={(e) =>
                    setSurvey({ ...survey, rating: e.target.value })
                  }
                />
              </label>
              <label>
                Comments
                <textarea
                  placeholder="Tell us what worked well and what we could improve."
                  value={survey.comment}
                  onChange={(e) =>
                    setSurvey({ ...survey, comment: e.target.value })
                  }
                />
              </label>
              <button type="submit">Submit survey</button>
            </form>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} TechWave Store — Smart devices, smarter
          experiences.
        </p>
      </footer>
    </div>
  );
}

export default App;

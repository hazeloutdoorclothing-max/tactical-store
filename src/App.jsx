import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Chaqueta Táctica M-65", price: 89.99, category: "chaquetas", image: "/products/product-1.jpg" },
  { id: 2, name: "Chaqueta Cargo Camo", price: 74.99, category: "chaquetas", image: "/products/product-1.jpg" },
  { id: 3, name: "Chaqueta Softshell OD", price: 95.00, category: "chaquetas", image: "/products/product-1.jpg" },
  { id: 4, name: "Pantalón Cargo Táctico", price: 45.99, category: "pantalones", image: "/products/product-1.jpg" },
  { id: 5, name: "Pantalón BDU Woodland", price: 39.99, category: "pantalones", image: "/products/product-1.jpg" },
  { id: 6, name: "Pantalón Ripstop Negro", price: 52.00, category: "pantalones", image: "/products/product-1.jpg" },
  { id: 7, name: "Chaqueta Windbreaker", price: 68.00, category: "chaquetas", image: "/products/product-1.jpg" },
  { id: 8, name: "Pantalón Táctico Slim", price: 58.00, category: "pantalones", image: "/products/product-1.jpg" },
];

const PHONE = "1234567890";

const mobileCSS = `
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 1rem 3rem !important; gap: 1rem !important; }
    .site-header { padding: 1rem !important; }
    .hero-section { padding: 2rem 1rem 1rem !important; }
    .hero-title { font-size: 1.75rem !important; }
    .filter-bar { padding: 0 1rem 1rem !important; gap: 0.5rem !important; }
    .site-footer { padding: 1.5rem 1rem !important; flex-direction: column; gap: 0.75rem; text-align: center; }
  }
`;

export default function App() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const handleProduct = (product) => {
    const msg = encodeURIComponent(`Hola! Me interesa: ${product.name} - $${product.price.toFixed(2)} CAD`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  return (
    <>
      <style>{mobileCSS}</style>
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F0EDE8",
        color: "#1a1a1a",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}>
        {/* Header */}
        <header className="site-header" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 3rem",
          borderBottom: "1px solid #d4d0c8",
        }}>
          <div style={{
            fontSize: "0.85rem",
            fontFamily: "'Courier New', monospace",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: "#2d2d2d",
          }}>
            Hazel Outdoor Clothing
          </div>
          <nav style={{
            display: "flex",
            gap: "2rem",
            fontSize: "0.8rem",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            {[
              { key: "all", label: "Shop" },
              { key: "chaquetas", label: "Jackets" },
              { key: "pantalones", label: "Pants" },
            ].map((f) => (
              <a
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  color: filter === f.key ? "#1a1a1a" : "#888",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                  borderBottom: filter === f.key ? "1px solid #1a1a1a" : "1px solid transparent",
                  paddingBottom: "2px",
                }}
              >
                {f.label}
              </a>
            ))}
          </nav>
        </header>

        {/* Hero */}
        <section className="hero-section" style={{ padding: "3rem 3rem 1rem" }}>
          <h1 className="hero-title" style={{
            fontSize: "2.5rem",
            fontWeight: 400,
            margin: "0 0 1rem 0",
            lineHeight: 1.1,
            maxWidth: "600px",
          }}>
            Hazel Outdoor Clothing
          </h1>
          <p style={{
            fontSize: "0.95rem",
            color: "#666",
            maxWidth: "550px",
            lineHeight: 1.6,
            margin: "0 0 2rem 0",
          }}>
            Tactical and outdoor apparel built for durability, function, and everyday wear. Based in Canada.
          </p>
        </section>

        {/* Filter + count */}
        <div className="filter-bar" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 3rem 1.5rem",
        }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {[
              { key: "all", label: "View All" },
              { key: "chaquetas", label: "Jackets" },
              { key: "pantalones", label: "Pants" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  padding: "0.5rem 1.25rem",
                  border: filter === f.key ? "1px solid #1a1a1a" : "1px solid #ccc",
                  borderRadius: "2px",
                  background: filter === f.key ? "#1a1a1a" : "transparent",
                  color: filter === f.key ? "#F0EDE8" : "#555",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  transition: "all 0.2s",
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          <span style={{ fontSize: "0.8rem", color: "#999", fontFamily: "monospace" }}>
            {filtered.length} products
          </span>
        </div>

        {/* Product Grid */}
        <div className="product-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          padding: "0 3rem 4rem",
        }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              style={{ cursor: "pointer", transition: "opacity 0.3s" }}
              onClick={() => handleProduct(product)}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  aspectRatio: "3/4",
                  objectFit: "cover",
                  display: "block",
                  backgroundColor: "#e5e1da",
                }}
              />
              <p style={{
                fontSize: "0.85rem",
                margin: "0.75rem 0 0.25rem",
                fontFamily: "'Courier New', monospace",
                fontWeight: 400,
                color: "#2d2d2d",
              }}>
                {product.name}
              </p>
              <p style={{ fontSize: "0.85rem", color: "#666", margin: 0 }}>
                ${product.price.toFixed(2)} CAD
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <footer className="site-footer" style={{
          borderTop: "1px solid #d4d0c8",
          padding: "2rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.75rem",
          fontFamily: "'Courier New', monospace",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          <span>© 2026 Hazel Outdoor Clothing</span>
          <span>Canada</span>
          <span>Contact via WhatsApp</span>
        </footer>

        {/* WhatsApp floating button */}
        <a
          href={`https://wa.me/${PHONE}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            backgroundColor: "#25D366",
            color: "#fff",
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
            zIndex: 100,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💬
        </a>
      </div>
    </>
  );
}
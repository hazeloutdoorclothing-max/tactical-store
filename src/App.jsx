import { useState } from "react";
import PRODUCTS from "./products.json";

const PHONE = "1234567890";

const mobileCSS = `
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 1rem 3rem !important; gap: 1rem !important; }
    .site-header { padding: 1rem !important; flex-wrap: wrap; gap: 0.5rem; }
    .hero-section { padding: 2rem 1rem 1rem !important; }
    .hero-title { font-size: 1.75rem !important; }
    .filter-bar { padding: 0 1rem 1rem !important; flex-wrap: wrap; gap: 0.5rem; }
    .site-footer { padding: 1.5rem 1rem !important; flex-direction: column; gap: 0.75rem; text-align: center; }
  }
`;

function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);
  const hasDetails = product.fabric || (product.advantages && product.advantages.length > 0);

  return (
    <div
      style={{ cursor: "pointer", position: "relative" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(product)}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            aspectRatio: "3/4",
            objectFit: "cover",
            display: "block",
            backgroundColor: "#e5e1da",
            transition: "opacity 0.3s",
            opacity: hovered && hasDetails ? 0.3 : 1,
          }}
        />
        {hovered && hasDetails && (
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(26, 26, 26, 0.88)",
            color: "#e8e4df",
            padding: "1.25rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            fontFamily: "'Courier New', monospace",
            fontSize: "0.7rem",
            lineHeight: 1.6,
            overflow: "auto",
          }}>
            {product.fabric && (
              <div style={{ marginBottom: "0.75rem" }}>
                <span style={{ color: "#999" }}>Fabric: </span>{product.fabric}
              </div>
            )}
            {product.season && (
              <div style={{ marginBottom: "0.75rem" }}>
                <span style={{ color: "#999" }}>Season: </span>{product.season}
              </div>
            )}
            {product.advantages && product.advantages.length > 0 && (
              <>
                <div style={{ marginBottom: "0.5rem", color: "#999" }}>Features:</div>
                {product.advantages.map((adv, i) => (
                  <div key={i} style={{ paddingLeft: "0.5rem", marginBottom: "0.2rem" }}>
                    → {adv}
                  </div>
                ))}
              </>
            )}
            <div style={{
              marginTop: "auto",
              paddingTop: "0.75rem",
              color: "#25D366",
              fontSize: "0.7rem",
              textAlign: "center",
            }}>
              Click to order via WhatsApp
            </div>
          </div>
        )}
      </div>
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
        {product.price > 0 ? `$${product.price.toFixed(2)} CAD` : "Contact for price"}
      </p>
    </div>
  );
}

export default function App() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const handleProduct = (product) => {
    const priceText = product.price > 0 ? ` - $${product.price.toFixed(2)} CAD` : "";
    const msg = encodeURIComponent(`Hi! I'm interested in: ${product.name}${priceText}`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  const categories = [
    { key: "all", label: "View All" },
    { key: "tops", label: "Tops" },
    { key: "bottoms", label: "Bottoms" },
    { key: "boots", label: "Boots" },
  ];

  return (
    <>
      <style>{mobileCSS}</style>
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F0EDE8",
        color: "#1a1a1a",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}>
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
            {categories.map((f) => (
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

        <div className="filter-bar" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 3rem 1.5rem",
        }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {categories.map((f) => (
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

        <div className="product-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          padding: "0 3rem 4rem",
        }}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProduct} />
          ))}
        </div>

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
import { useState } from "react";
import PRODUCTS from "./products.json";

const PHONE = "1234567890";

const HERO_IMAGES = [
  "/products/tops/assassin-tactical-jacket_photo.jpg",
  "/products/tops/darkwalker-quick-dry-shirt_photo.jpg",
  "/products/tops/m65-punch-windbreaker_photo.jpg",
];

const mobileCSS = `
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 1rem 3rem !important; gap: 1rem !important; }
    .filter-bar { padding: 0 1rem 1rem !important; flex-wrap: wrap; gap: 0.5rem; }
    .site-footer { padding: 1.5rem 1rem !important; flex-direction: column; gap: 0.75rem; text-align: center; }
    .header-nav { display: none !important; }
    .header-right-nav { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .hero-banner { height: 90vh !important; }
    .hero-grid { display: none !important; }
    .hero-mobile-img { display: block !important; }
    .hero-title { font-size: 2.2rem !important; }
    .hero-subtitle { font-size: 0.8rem !important; max-width: 90% !important; }
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
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

        {/* ── HEADER (floating over hero) ── */}
        <header style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 2rem",
        }}>
          {/* Mobile hamburger (left) */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#F0EDE8",
              fontSize: "1.5rem",
              padding: 0,
            }}
          >
            ☰
          </button>

          {/* Left nav (desktop) */}
          <nav className="header-nav" style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.7rem",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}>
            {categories.map((f) => (
              <a
                key={f.key}
                onClick={() => { setFilter(f.key); scrollToProducts(); }}
                style={{
                  color: filter === f.key ? "#fff" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
              >
                {f.label}
              </a>
            ))}
          </nav>

          {/* Logo center */}
          <div style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            top: "1.5rem",
          }}>
            <img
              src="/hazel-logo.svg"
              alt="Hazel"
              style={{
                height: "100px",
                filter: "brightness(0) invert(1)",
                cursor: "pointer",
              }}
              onClick={() => { setFilter("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            />
          </div>

          {/* Right (desktop) */}
          <div className="header-right-nav" style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.7rem",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.6)",
          }}>
            <span>CAD</span>
          </div>
        </header>

        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(26,26,26,0.95)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2rem",
          }}>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.5rem",
                background: "none",
                border: "none",
                color: "#F0EDE8",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            {categories.map((f) => (
              <a
                key={f.key}
                onClick={() => {
                  setFilter(f.key);
                  setMobileMenuOpen(false);
                  setTimeout(scrollToProducts, 100);
                }}
                style={{
                  color: filter === f.key ? "#F0EDE8" : "rgba(240,237,232,0.5)",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontSize: "1.25rem",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  transition: "color 0.2s",
                }}
              >
                {f.label}
              </a>
            ))}
          </div>
        )}

        {/* ── HERO BANNER ── */}
        <section className="hero-banner" style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "10px",
        }}>
          {/* Desktop: 3 vertical photos side by side */}
          <div className="hero-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            height: "100%",
            gap: 0,
          }}>
            {HERO_IMAGES.map((src, i) => (
              <div key={i} style={{ overflow: "hidden" }}>
                <img src={src} alt="" style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }} />
              </div>
            ))}
          </div>

          {/* Mobile: single image fullscreen */}
          <div className="hero-mobile-img" style={{
            display: "none",
            position: "absolute",
            inset: 0,
          }}>
            <img src={HERO_IMAGES[0]} alt="" style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }} />
          </div>

          {/* Gradient overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.05) 100%)",
            pointerEvents: "none",
          }} />

          {/* Text at bottom-left */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0 2rem 3rem",
            zIndex: 2,
          }}>
            <h1 className="hero-title" style={{
              fontSize: "3rem",
              fontWeight: 700,
              color: "#F0EDE8",
              margin: "0 0 0.75rem 0",
              lineHeight: 1.05,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: "italic",
            }}>
              Built for<br />the Field
            </h1>
            <p className="hero-subtitle" style={{
              fontSize: "0.85rem",
              color: "rgba(240,237,232,0.75)",
              maxWidth: "420px",
              lineHeight: 1.6,
              margin: "0 0 1.5rem 0",
              fontFamily: "'Georgia', serif",
            }}>
              Tactical and outdoor apparel crafted for durability, function, and everyday wear. Based in Canada.
            </p>
            <button
              onClick={scrollToProducts}
              style={{
                padding: "0.7rem 2rem",
                border: "1px solid rgba(240,237,232,0.8)",
                borderRadius: "0",
                background: "rgba(240,237,232,0.1)",
                backdropFilter: "blur(4px)",
                color: "#F0EDE8",
                cursor: "pointer",
                fontSize: "0.7rem",
                fontFamily: "'Courier New', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => {
                e.target.style.background = "#F0EDE8";
                e.target.style.color = "#1a1a1a";
              }}
              onMouseLeave={e => {
                e.target.style.background = "rgba(240,237,232,0.1)";
                e.target.style.color = "#F0EDE8";
              }}
            >
              Shop Now
            </button>
          </div>
        </section>

        {/* ── FILTER BAR ── */}
        <div id="products" className="filter-bar" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 3rem 1.5rem",
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

        {/* ── PRODUCT GRID ── */}
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

        {/* ── FOOTER ── */}
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

        {/* ── WHATSAPP FAB ── */}
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
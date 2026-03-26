import { useState } from "react";
import PRODUCTS from "./products.json";

const PHONE = "15149983001";
const EMAIL = "Hazeloutdoorclosthing@gmail.com";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;

const HERO_IMAGES = [
  "/products/tops/assassin-tactical-jacket_photo.jpg",
  "/products/tops/darkwalker-quick-dry-shirt_photo.jpg",
  "/products/tops/m65-punch-windbreaker_photo.jpg",
];

const mobileCSS = `
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: 1fr !important; padding: 0 1rem 3rem !important; gap: 1.5rem !important; max-width: 420px; margin: 0 auto; }
    .filter-bar { padding: 0 1rem 1rem !important; flex-wrap: wrap; gap: 0.5rem; }
    .site-footer { padding: 1.5rem 1rem !important; flex-direction: column; gap: 0.75rem; text-align: center; }
    .footer-contact-row { flex-direction: column !important; gap: 0.5rem !important; }
    .header-nav { display: none !important; }
    .header-right-nav { display: none !important; }
    .header-contact-bar { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .hero-banner { height: 90vh !important; }
    .hero-grid { display: none !important; }
    .hero-mobile-img { display: block !important; }
    .hero-title { font-size: 2.2rem !important; }
    .hero-subtitle { font-size: 0.8rem !important; max-width: 90% !important; }
    .card-mobile-actions { display: flex !important; }
  }
`;

/* ── SVG Icons ── */
const WhatsAppIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MailIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const InstagramIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill={color} stroke="none"/>
  </svg>
);

const PhoneIcon = ({ size = 18, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

function ProductCard({ product, onClick }) {
  const [showInfo, setShowInfo] = useState(false);
  const hasDetails = product.fabric || (product.advantages && product.advantages.length > 0);

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    const priceText = product.price > 0 ? ` - $${product.price.toFixed(2)} CAD` : "";
    const msg = encodeURIComponent(`Hi! I'm interested in: ${product.name}${priceText}`);
    window.open(`https://wa.me/${PHONE}?text=${msg}`, "_blank");
  };

  return (
    <div
      style={{ cursor: "pointer", position: "relative" }}
      onMouseEnter={() => setShowInfo(true)}
      onMouseLeave={() => setShowInfo(false)}
      onTouchStart={() => setShowInfo(true)}
      onTouchEnd={() => setTimeout(() => setShowInfo(false), 2500)}
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
            opacity: showInfo && hasDetails ? 0.3 : 1,
          }}
        />
        {showInfo && hasDetails && (
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
            {/* Mobile WhatsApp button inside overlay */}
            <div
              className="card-mobile-actions"
              style={{
                display: "none",
                justifyContent: "center",
                marginTop: "auto",
                paddingTop: "0.75rem",
              }}
            >
              <button
                onClick={handleWhatsApp}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.5rem",
                  backgroundColor: "#25D366",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontFamily: "'Courier New', monospace",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                <WhatsAppIcon size={16} color="#fff" />
                Order via WhatsApp
              </button>
            </div>
            {/* Desktop text */}
            <div
              className="card-desktop-cta"
              style={{
                marginTop: "auto",
                paddingTop: "0.75rem",
                color: "#25D366",
                fontSize: "0.7rem",
                textAlign: "center",
              }}
            >
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

/* ── Contact Links Component ── */
function ContactLinks({ color = "rgba(255,255,255,0.6)", hoverColor = "#fff", size = 14, gap = "1rem" }) {
  const linkStyle = {
    color,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    fontSize: "0.65rem",
    fontFamily: "'Courier New', monospace",
    letterSpacing: "0.05em",
    transition: "color 0.2s",
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap, flexWrap: "wrap" }}>
      <a
        href={`mailto:${EMAIL}`}
        style={linkStyle}
        onMouseEnter={e => e.currentTarget.style.color = hoverColor}
        onMouseLeave={e => e.currentTarget.style.color = color}
      >
        <MailIcon size={size} color="currentColor" />
        <span>{EMAIL}</span>
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
        onMouseEnter={e => e.currentTarget.style.color = hoverColor}
        onMouseLeave={e => e.currentTarget.style.color = color}
      >
        <WhatsAppIcon size={size} color="currentColor" />
        <span>+1 (514) 998-3001</span>
      </a>
      <a
        href="#"
        onClick={e => e.preventDefault()}
        style={{ ...linkStyle, opacity: 0.5, cursor: "default" }}
        title="Coming soon"
      >
        <InstagramIcon size={size} color="currentColor" />
        <span style={{ fontSize: "0.6rem" }}>Coming soon</span>
      </a>
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
      <style>{mobileCSS}{`
        @media (max-width: 768px) {
          .card-desktop-cta { display: none !important; }
        }
        @media (min-width: 769px) {
          .card-mobile-actions { display: none !important; }
        }
      `}</style>
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F0EDE8",
        color: "#1a1a1a",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}>

        {/* ── HEADER CONTACT BAR (desktop only) ── */}
        <div className="header-contact-bar" style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 11,
          display: "flex",
          justifyContent: "center",
          padding: "0.5rem 2rem",
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
        }}>
          <ContactLinks
            color="rgba(255,255,255,0.55)"
            hoverColor="#fff"
            size={12}
            gap="1.5rem"
          />
        </div>

        {/* ── HEADER (floating over hero) ── */}
        <header style={{
          position: "absolute",
          top: "1.75rem",
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
            transform: "translateX(100%)",
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
            {/* Contact info in mobile menu */}
            <div style={{
              marginTop: "1rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}>
              <a href={`mailto:${EMAIL}`} style={{
                color: "rgba(240,237,232,0.6)",
                textDecoration: "none",
                fontSize: "0.7rem",
                fontFamily: "'Courier New', monospace",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}>
                <MailIcon size={14} color="currentColor" /> {EMAIL}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
                color: "rgba(240,237,232,0.6)",
                textDecoration: "none",
                fontSize: "0.7rem",
                fontFamily: "'Courier New', monospace",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}>
                <WhatsAppIcon size={14} color="currentColor" /> +1 (514) 998-3001
              </a>
              <span style={{
                color: "rgba(240,237,232,0.3)",
                fontSize: "0.65rem",
                fontFamily: "'Courier New', monospace",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}>
                <InstagramIcon size={14} color="currentColor" /> Coming soon
              </span>
            </div>
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
          flexDirection: "column",
          gap: "1rem",
          fontSize: "0.75rem",
          fontFamily: "'Courier New', monospace",
          color: "#999",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        }}>
          <div className="footer-contact-row" style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            <a href={`mailto:${EMAIL}`} style={{
              color: "#666",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
              textTransform: "none",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#1a1a1a"}
              onMouseLeave={e => e.currentTarget.style.color = "#666"}
            >
              <MailIcon size={14} color="currentColor" />
              {EMAIL}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              color: "#666",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
              onMouseLeave={e => e.currentTarget.style.color = "#666"}
            >
              <WhatsAppIcon size={14} color="currentColor" />
              +1 (514) 998-3001
            </a>
            <span style={{
              color: "#bbb",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              cursor: "default",
            }}
              title="Coming soon"
            >
              <InstagramIcon size={14} color="currentColor" />
              <span style={{ fontSize: "0.65rem" }}>Coming soon</span>
            </span>
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <span>© 2026 Hazel Outdoor Clothing</span>
            <span>Canada</span>
          </div>
        </footer>

        {/* ── WHATSAPP FAB ── */}
        <a
          href={WHATSAPP_URL}
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
            textDecoration: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.2s",
            zIndex: 100,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <WhatsAppIcon size={28} color="#fff" />
        </a>
      </div>
    </>
  );
}
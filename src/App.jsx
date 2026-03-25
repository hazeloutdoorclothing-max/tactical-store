import { useState } from "react";

const PRODUCTS = [
  { id: 1, name: "Assassin Tactical Jacket", price: 89.99, category: "jackets", image: "/products/product-1.jpg",
    fabric: "65% polyester + 35% cotton", season: "Spring, autumn, winter",
    advantages: ["Breathable and sweat-wicking fabric", "Classic fit", "Horseshoe cuff design", "Abrasion and scratch resistant", "Stand-up collar and neat stitching", "Three-dimensional cut to fit the body"] },
  { id: 2, name: "Dragon Armor 2.0 Cotton Robe", price: 95.00, category: "jackets", image: "/products/product-2.jpg",
    fabric: "Polyester", season: "Spring, summer, autumn, winter",
    advantages: ["Zippered chest pocket", "Windproof cuff system", "Hooded drawstring design", "Arm patch with zipper pocket", "Warm design fears no cold outdoors", "Three dimensional cutting that fits the body"] },
  { id: 3, name: "Darkwalker Quick Dry Shirt", price: 42.99, category: "shirts", image: "/products/product-3.jpg",
    fabric: "Nylon spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Stretchy, crease-resistant fabric", "Hidden chest pocket", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Chest pocket reinforced loading", "Classic lapel design"] },
  { id: 4, name: "Hurricane Round Neck Tee", price: 34.99, category: "shirts", image: "/products/product-4.jpg",
    fabric: "Polyester", season: "Spring, summer, autumn, winter",
    advantages: ["Elastic and wrinkle resistant", "Two arm pocket design", "Neat wiring", "Stereoscopic cutting for slimming", "Quick drying fabric", "Classic round neck design"] },
  { id: 5, name: "Hurricane Lapel Quick Dry Tee", price: 36.99, category: "shirts", image: "/products/product-5.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Small pockets on both arms", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Quick-drying, breathable and wicking", "Classic lapel design"] },
  { id: 6, name: "Hurricane Crew Neck Quick Dry Tee", price: 36.99, category: "shirts", image: "/products/product-6.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Small pockets on both arms", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Quick-drying, breathable and wicking", "Classic round neckline design"] },
  { id: 7, name: "G2 Tactical Long Sleeve", price: 54.99, category: "shirts", image: "/products/product-7.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 8, name: "G2 Tactical Short Sleeve", price: 44.99, category: "shirts", image: "/products/product-8.jpg",
    fabric: "65% polyester + 35% cotton / 97% cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Fine workmanship, neatly aligned", "Nylon patch on both arms", "Camouflage waterproof design", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 9, name: "G3 Tactical Long Sleeve", price: 57.99, category: "shirts", image: "/products/product-9.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Waterproof and wear-resistant", "3D cut for a flattering fit", "Classic shape design"] },
  { id: 10, name: "M65 Punch Windbreaker", price: 98.00, category: "jackets", image: "/products/product-10.jpg",
    fabric: "65% polyester + 35% cotton", season: "Spring, autumn, winter",
    advantages: ["Waterproof fabric, neat stitching", "Nylon patch on both arms", "Adjustable cuffs", "Scratch-resistant and breathable", "Classic hooded design", "Three-dimensional cut to fit the body"] },
  { id: 11, name: "Special Ops Tactical Long Sleeve", price: 56.99, category: "shirts", image: "/products/product-11.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 12, name: "Dragon Armor Tactical Long Sleeve", price: 58.99, category: "shirts", image: "/products/product-12.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 13, name: "Special Ops Tactical Short Sleeve", price: 46.99, category: "shirts", image: "/products/product-13.jpg",
    fabric: "65% polyester + 35% cotton / 97% cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Fine workmanship, neatly aligned", "Nylon patch on both arms", "Camouflage waterproof design", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 14, name: "R6 Tactical Base Layer", price: 39.99, category: "shirts", image: "/products/product-14.jpg",
    fabric: "Polyester", season: "Spring, autumn, winter",
    advantages: ["Soft and high elastic fabric", "Patch design on both arms", "Tight-fitting to show off the body", "Moisture-wicking and quick-drying", "Classic shape, three-dimensional cut", "Sweat-wicking and breathable"] },
  { id: 15, name: "Lightweight Cultural T-Shirt", price: 29.99, category: "shirts", image: "/products/product-15.jpg",
    fabric: "Cotton", season: "Summer",
    advantages: ["Pure cotton fabric", "Exquisite printing", "Neat wiring", "Classic round neck design", "Fine workmanship", "Soft and comfortable"] },
  { id: 16, name: "Striker Quick Dry T-Shirt", price: 34.99, category: "shirts", image: "/products/product-16.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Small pockets on both arms", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Quick-drying, breathable and wicking", "Classic round neckline design"] },
  { id: 17, name: "Wilderness Camo T-Shirt", price: 36.99, category: "shirts", image: "/products/product-17.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Small pockets on both arms", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Quick-drying, breathable and wicking", "Classic lapel design"] },
  { id: 18, name: "Vanguard Quick Dry Long Sleeve", price: 44.99, category: "shirts", image: "/products/product-18.jpg",
    fabric: "Polyester", season: "Spring, summer, autumn, winter",
    advantages: ["Stretchy, crease-resistant fabric", "Hidden chest pocket", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Chest pocket reinforced loading", "Classic lapel design"] },
  { id: 19, name: "Vanguard Quick Dry T-Shirt", price: 38.99, category: "shirts", image: "/products/product-19.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Hidden chest pocket", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Chest pocket reinforced loading", "Classic lapel design"] },
  { id: 20, name: "Dragon Armor Short Sleeve", price: 46.99, category: "shirts", image: "/products/product-20.jpg",
    fabric: "65% polyester + 35% cotton / 97% cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Fine workmanship, neatly aligned", "Nylon patch on both arms", "Camouflage waterproof design", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 21, name: "Cold-Proof Hooded Jacket", price: 105.00, category: "jackets", image: "/products/product-21.jpg",
    fabric: "Polyester", season: "Spring, autumn, winter",
    advantages: ["Zippered chest pocket", "Windproof cuff system", "Hooded drawstring design", "Arm patch with zipper pocket", "Warm design fears no cold outdoors", "Three dimensional cutting that fits the body"] },
  { id: 22, name: "Dragon Armor Hard Shell Windbreaker", price: 110.00, category: "jackets", image: "/products/product-22.jpg",
    fabric: "Polyester", season: "Spring, autumn, winter",
    advantages: ["Waterproof fabric, neat stitching", "Nylon patch on both arms", "Adjustable cuffs", "Scratch-resistant and breathable", "Classic hooded design", "Three-dimensional cut to fit the body"] },
  { id: 23, name: "Assassin Tactical Jacket V2", price: 92.00, category: "jackets", image: "/products/product-23.jpg",
    fabric: "65% polyester + 35% cotton", season: "Spring, autumn, winter",
    advantages: ["Breathable and sweat-wicking fabric", "Classic fit", "Horseshoe cuff design", "Abrasion and scratch resistant", "Stand-up collar and neat stitching", "Three-dimensional cut to fit the body"] },
  { id: 24, name: "Assassin Hooded Fleece Jacket", price: 88.00, category: "jackets", image: "/products/product-24.jpg",
    fabric: "65% polyester + 35% cotton", season: "Spring, autumn, winter",
    advantages: ["Warm and cozy fleece fabric", "Classic fit", "Horseshoe cuff design", "Abrasion and scratch resistant", "Hooded design and neat stitching", "Three-dimensional cut to fit the body"] },
  { id: 25, name: "Assassin Stand Collar Fleece", price: 85.00, category: "jackets", image: "/products/product-25.jpg",
    fabric: "65% polyester + 35% cotton", season: "Spring, autumn, winter",
    advantages: ["Warm and cozy fleece fabric", "Classic fit", "Horseshoe cuff design", "Abrasion and scratch resistant", "Stand-up collar and neat stitching", "Three-dimensional cut to fit the body"] },
  { id: 26, name: "Assassin Quick Dry T-Shirt", price: 35.99, category: "shirts", image: "/products/product-26.jpg",
    fabric: "Polyester", season: "Spring, summer",
    advantages: ["Stretchy, crease-resistant fabric", "Small pockets on both arms", "Waterproof fabric, neat stitching", "Three-dimensional cut to fit the body", "Quick-drying, breathable and wicking", "Classic round neckline design"] },
  { id: 27, name: "Assassin Softshell Jacket", price: 99.00, category: "jackets", image: "/products/product-27.jpg",
    fabric: "Polyester", season: "Spring, autumn, winter",
    advantages: ["Zippered chest pocket", "Windproof cuff system", "Hooded drawstring design", "Arm patch with zipper pocket", "Warm design fears no cold outdoors", "Three dimensional cutting that fits the body"] },
  { id: 28, name: "Combat Shirt 1st Gen", price: 52.99, category: "shirts", image: "/products/product-28.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Elasticated body parts", "Classic shape, three-dimensional cut", "Camouflage scratch-resistant"] },
  { id: 29, name: "Combat Shirt 4th Gen", price: 59.99, category: "shirts", image: "/products/product-29.jpg",
    fabric: "65% polyester + 35% cotton / 97% stretch cotton + 3% spandex", season: "Spring, summer, autumn, winter",
    advantages: ["Elbow pads can be fitted", "Nylon patch on both arms", "Adjustable cuffs", "Waterproof and wear-resistant", "3D cut for a flattering fit", "Classic shape design"] },
];

const PHONE = "1234567890";

const HERO_IMAGES = [
  "/products/product-1.jpg",
  "/products/product-3.jpg",
  "/products/product-10.jpg",
  "/products/product-22.jpg",
];

const mobileCSS = `
  @media (max-width: 768px) {
    .product-grid { grid-template-columns: repeat(2, 1fr) !important; padding: 0 1rem 3rem !important; gap: 1rem !important; }
    .site-header { padding: 1rem !important; }
    .header-right { display: none !important; }
    .mobile-menu-btn { display: flex !important; }
    .hero-banner { height: 85vh !important; }
    .hero-images { display: none !important; }
    .hero-mobile-bg { display: block !important; }
    .hero-title { font-size: 2.5rem !important; }
    .hero-subtitle { font-size: 0.8rem !important; max-width: 90% !important; }
    .hero-cta { padding: 0.75rem 2rem !important; }
    .site-footer { padding: 2.5rem 1rem 1.5rem !important; }
    .footer-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
    .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

function ProductCard({ product, onClick }) {
  const [hovered, setHovered] = useState(false);

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
            opacity: hovered ? 0.3 : 1,
          }}
        />
        {hovered && (
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
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "#999" }}>Fabric: </span>{product.fabric}
            </div>
            <div style={{ marginBottom: "0.75rem" }}>
              <span style={{ color: "#999" }}>Season: </span>{product.season}
            </div>
            <div style={{ marginBottom: "0.5rem", color: "#999" }}>Features:</div>
            {product.advantages.map((adv, i) => (
              <div key={i} style={{ paddingLeft: "0.5rem", marginBottom: "0.2rem" }}>
                → {adv}
              </div>
            ))}
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
      <p style={{ fontSize: "0.85rem", color: "#666", margin: 0, fontStyle: product.price === 0 ? "italic" : "normal" }}>
        {product.price > 0 ? `$${product.price.toFixed(2)} CAD` : "Price released soon"}
      </p>
    </div>
  );
}

export default function App() {
  const handleProduct = (product) => {
    const priceText = product.price > 0 ? ` - $${product.price.toFixed(2)} CAD` : "";
    const msg = encodeURIComponent(
      `Hi! I'm interested in: ${product.name}${priceText}`
    );
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

        {/* ── HEADER ── */}
        <header className="site-header" style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.25rem 3rem",
          borderBottom: "1px solid #d4d0c8",
        }}>
          <img
            src="/hazel-logo.svg"
            alt="Hazel"
            style={{
              height: "100px",
              cursor: "pointer",
            }}
          />

          <div className="header-right" style={{
            fontSize: "0.75rem",
            fontFamily: "'Courier New', monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#888",
            display: "flex",
            alignItems: "center",
            gap: "1.5rem",
          }}>
            <span style={{ cursor: "pointer", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#1a1a1a"}
              onMouseLeave={e => e.target.style.color = "#888"}
            >
              CAD
            </span>
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <button className="mobile-menu-btn" style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.25rem",
            color: "#2d2d2d",
            fontSize: "1.25rem",
          }}>
            ☰
          </button>
        </header>

        {/* ── HERO BANNER ── */}
        <section className="hero-banner" style={{
          position: "relative",
          height: "75vh",
          overflow: "hidden",
        }}>
          {/* Desktop: 4 vertical photos side by side */}
          <div className="hero-images" style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            height: "100%",
            gap: "3px",
          }}>
            {HERO_IMAGES.map((src, i) => (
              <div key={i} style={{ overflow: "hidden", position: "relative" }}>
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

          {/* Mobile: single background image */}
          <div className="hero-mobile-bg" style={{
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

          {/* Dark overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.05) 100%)",
            pointerEvents: "none",
          }} />

          {/* Text overlay */}
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "3rem",
            zIndex: 2,
          }}>
            <h1 className="hero-title" style={{
              fontSize: "3.5rem",
              fontWeight: 700,
              color: "#F0EDE8",
              margin: "0 0 1rem 0",
              lineHeight: 1,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}>
              Built for<br />the Field
            </h1>
            <p className="hero-subtitle" style={{
              fontSize: "0.9rem",
              color: "rgba(240,237,232,0.8)",
              maxWidth: "420px",
              lineHeight: 1.6,
              margin: "0 0 1.5rem 0",
              fontFamily: "'Courier New', monospace",
            }}>
              Tactical and outdoor apparel crafted for durability, function, and everyday wear. Based in Canada.
            </p>
            <button
              className="hero-cta"
              onClick={() => {
                document.querySelector(".product-grid")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                padding: "0.75rem 2.5rem",
                border: "1px solid #F0EDE8",
                borderRadius: "2px",
                background: "transparent",
                color: "#F0EDE8",
                cursor: "pointer",
                fontSize: "0.7rem",
                fontFamily: "'Courier New', monospace",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                transition: "all 0.3s",
              }}
              onMouseEnter={e => { e.target.style.background = "#F0EDE8"; e.target.style.color = "#1a1a1a"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#F0EDE8"; }}
            >
              Shop Collection
            </button>
          </div>
        </section>

        {/* ── PRODUCT GRID ── */}
        <div className="product-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5rem",
          padding: "2rem 3rem 4rem",
        }}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProduct} />
          ))}
        </div>

        {/* ── FOOTER ── */}
        <footer className="site-footer" style={{
          borderTop: "1px solid #d4d0c8",
          padding: "3rem 3rem 2rem",
          fontFamily: "'Courier New', monospace",
        }}>
          <div className="footer-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "3rem",
            marginBottom: "2.5rem",
          }}>
            {/* Col 1 — Brand */}
            <div>
              <img
                src="/hazel-logo.svg"
                alt="Hazel"
                style={{ height: "100px", marginBottom: "1rem" }}
              />
              <p style={{
                fontSize: "0.75rem",
                color: "#888",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: "280px",
              }}>
                Tactical and outdoor apparel built for durability, function, and everyday wear.
              </p>
            </div>

            {/* Col 2 — Contact */}
            <div>
              <div style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "#2d2d2d",
                marginBottom: "1rem",
              }}>
                Contact
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noopener noreferrer"
                  style={{
                    fontSize: "0.75rem",
                    color: "#888",
                    textDecoration: "none",
                    cursor: "pointer",
                    transition: "color 0.2s",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                  onMouseEnter={e => e.target.style.color = "#2d2d2d"}
                  onMouseLeave={e => e.target.style.color = "#888"}
                >
                  WhatsApp
                </a>
                <span style={{
                  fontSize: "0.75rem",
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  Montreal, Canada
                </span>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom" style={{
            borderTop: "1px solid #d4d0c8",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.7rem",
            color: "#aaa",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}>
            <span>© 2026 Hazel Outdoor Clothing</span>
            <span>Free shipping on orders over $150 CAD</span>
          </div>
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
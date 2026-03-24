export default function App() {
  const product = {
    name: "Pantalón Cargo Táctico",
    price: 45.99,
    image: "/products/product-1.jpg",
  };

  const whatsappLink = `https://wa.me/1234567890?text=Hola, me interesa: ${product.name} ($${product.price} CAD)`;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: '#e0e0e0',
      fontFamily: 'monospace',
      padding: '2rem',
    }}>
      <h1 style={{
        color: '#556B2F',
        fontSize: '1.5rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '2rem',
      }}>
        // TACTICAL STORE
      </h1>

      <div style={{
        maxWidth: '300px',
        backgroundColor: '#2a2a2a',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: '100%', height: '300px', objectFit: 'cover' }}
        />
        <div style={{ padding: '1rem' }}>
          <h2 style={{ fontSize: '1rem', margin: '0 0 0.5rem 0' }}>{product.name}</h2>
          <p style={{ color: '#556B2F', fontSize: '1.2rem', margin: '0 0 1rem 0' }}>
            ${product.price} CAD
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              textAlign: 'center',
              backgroundColor: '#25D366',
              color: '#fff',
              padding: '0.75rem',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Comprar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
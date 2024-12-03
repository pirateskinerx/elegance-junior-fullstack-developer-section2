import { useState } from 'react';
import { products } from './Data/products';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('overlay')) {
      setSelectedProduct(null);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('th-TH', {
      style: 'currency',
      currency: 'THB'
    }).format(price);
  };

  return (
    <div className="container">
      <h1>Your Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">{formatPrice(product.price)}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="overlay active" onClick={handleOverlayClick}>
          <div className="product-card centered">
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
            <p className="price">{formatPrice(selectedProduct.price)}</p>
          </div>
        </div>
      )}

      {showNotification && selectedProduct && (
        <div className="notification">
          คุณเลือก {selectedProduct.name}
        </div>
      )}
    </div>
  );
}

export default App;
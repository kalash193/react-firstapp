import React from 'react'
import products from '../data/products'
import './card.css'

const Card = ({ addToCart }) => {
  return (
    <div className="items">
      {products.map((product, index) => (
        <article
          className="product-card"
          key={product.id}
          style={{ '--card-delay': `${index * 90}ms` }}
        >
          <div className="product-media">
            <img
              className="product-image"
              src={product.image}
              alt={product.name}
              loading="lazy"
            />
            <span className="product-badge">{product.badge}</span>
            <div className="product-orb" />
            <div className="product-ring" />
          </div>

          <div className="product-content">
            <div className="product-meta">
              <span>{product.category}</span>
              <span>{product.rating} star</span>
            </div>

            <h3>{product.name}</h3>
            <p>{product.description}</p>

            <div className="product-footer">
              <div className="product-price">
                <strong>Rs. {product.price}</strong>
                <span>Rs. {product.originalPrice}</span>
              </div>

              <button
                type="button"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                  })
                }
              >
                Add to cart
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default Card

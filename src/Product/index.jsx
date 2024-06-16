import React, { useState, useRef, useEffect } from "react";

const Product = ({ products, addToCart }) => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const [clickedDetails, setClickedDetails] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const descriptionRef = useRef(null);

  const handleClick = (product) => {
    setClickedProduct(clickedProduct === product ? null : product);
    setClickedDetails(false); // Close details when clicking on product image or title
    setShowReviews(false); // Close reviews when clicking on product image or title
  };

  const handleMoreDetails = (product) => {
    setClickedDetails(clickedDetails === product ? null : product);
    setClickedProduct(false); // Close product description when clicking on more details
    setShowReviews(false); // Close reviews when clicking on more details
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        descriptionRef.current &&
        !descriptionRef.current.contains(event.target)
      ) {
        setClickedProduct(null);
        setClickedDetails(false);
        setShowReviews(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="product-container" style={styles.productContainer}>
      {products.map((product, index) => (
        <div
          className="product-wrapper"
          key={index}
          style={styles.productWrapper}
        >
          <img
            onClick={() => handleClick(product)}
            style={styles.productImage}
            src={product.thumbnail}
            alt={product.title}
          />
          <div style={styles.productInfo}>
            <div
              onClick={() => handleClick(product)}
              style={styles.productTitle}
            >
              {product.title}
            </div>
            {clickedProduct === product && (
              <div ref={descriptionRef} style={styles.descriptionCard}>
                <div>{product.description}</div>
              </div>
            )}
            <div style={styles.productPrice}>${product.price}</div>
            <div
              style={styles.moreDetails}
              onClick={() => handleMoreDetails(product)}
            >
              More details
            </div>
            {clickedDetails === product && (
              <div ref={descriptionRef} style={styles.detailsCard}>
                <div>Warranty: {product.warrantyInformation}</div>
                <div>ShippingInfo: {product.shippingInformation}</div>
                <div>Status: {product.availabilityStatus}</div>
                <div>MinOrderQ: {product.minimumOrderQuantity}</div>

                <div>
                  <div style={styles.toggleReviews} onClick={toggleReviews}>
                    {showReviews ? "Hide Reviews" : "Show Reviews"}
                  </div>
                  {showReviews && (
                    <div style={styles.reviewsContainer}>
                      <h3>Reviews:</h3>
                      <div style={styles.reviewsList}>
                        {product.reviews.map((review, idx) => (
                          <div key={idx} style={styles.reviewItem}>
                            <p>Rating: {review.rating}</p>
                            <p>Comment: {review.comment}</p>
                            <p>Date: {review.date}</p>
                            <p>Reviewer: {review.reviewerName}</p>
                            {/* Include reviewerEmail if needed */}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div>
              <button
                style={styles.addToCartButton}
                onClick={() => {
                  console.log("Add to cart clicked:", product);
                  addToCart(product);
                }}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  productContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
    backgroundColor: "black",
    borderRadius: "8px",
  },
  productWrapper: {
    position: "relative",
    width: "300px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "black",
  },
  productImage: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  productInfo: {
    padding: "10px",
  },
  productTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "5px",
    cursor: "pointer",
    position: "relative",
    color: "white",
  },
  productPrice: {
    fontSize: "16px",
    color: "#888",
    marginBottom: "10px",
  },
  moreDetails: {
    fontSize: "14px",
    color: "#007bff",
    cursor: "pointer",
    marginTop: "10px",
  },
  toggleReviews: {
    fontSize: "14px",
    color: "#007bff",
    cursor: "pointer",
    marginTop: "10px",
  },
  reviewsContainer: {
    marginTop: "10px",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    maxHeight: "200px", // Limit height to enable scrolling
    overflowY: "auto", // Enable vertical scrollbar
  },
  reviewsList: {
    marginTop: "5px",
  },
  reviewItem: {
    marginBottom: "10px",
    padding: "5px",
    border: "1px solid #e9ecef",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  addToCartButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 16px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  },
  descriptionCard: {
    position: "absolute",
    top: "40px", // Adjust this value as needed to position below the title
    left: "50%",
    transform: "translateX(-50%)",
    width: "250px",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
  detailsCard: {
    position: "absolute",
    top: "40px", // Adjust this value as needed to position below the title
    left: "50%",
    transform: "translateX(-50%)",
    width: "300px",
    padding: "10px",
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    zIndex: 10,
  },
};

export default Product;

import React from "react";

const Cart = ({ cart, removeProduct, increaseQuantity, decreaseQuantity }) => {
  return (
    <div style={styles.cartContainer}>
      <h2 style={styles.cartTitle}>Cart</h2>
      {cart.length === 0 && (
        <p style={styles.emptyCartMessage}>Cart is Empty ...</p>
      )}
      {cart.map((item, index) => (
        <div key={index} style={styles.cartWrapper}>
          <img style={styles.cartImage} src={item.thumbnail} alt="" />
          <div style={styles.cartInfo}>
            <div style={styles.cartItemTitle}>{item.title}</div>
            <div style={styles.right}>
              <div
                onClick={() => increaseQuantity(item)}
                style={styles.cartAction}
              >
                +
              </div>
              <div style={styles.cartQuantity}>{item.quantity}</div>
              <div
                onClick={() => decreaseQuantity(item)}
                style={styles.cartAction}
              >
                -
              </div>
              <div style={styles.cartTotalPrice}>
                ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <button
            onClick={() => removeProduct(item)}
            style={styles.removeProductButton}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

const styles = {
  cartContainer: {
    padding: "20px",
    backgroundColor: "black",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cartTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "white",
  },
  emptyCartMessage: {
    fontSize: "18px",
    color: "#777",
  },
  cartWrapper: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "black",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  cartImage: {
    width: "100px",
    height: "100px",
    borderRadius: "8px",
    objectFit: "cover",
    marginRight: "20px",
  },
  cartInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  cartAction: {
    fontSize: "18px",
    cursor: "pointer",
    padding: "5px 10px",
    margin: "0 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
  },
  cartQuantity: {
    fontSize: "16px",
    margin: "0 10px",
  },
  cartTotalPrice: {
    fontSize: "18px",
    fontWeight: "bold",
    marginLeft: "10px",
  },
  removeProductButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default Cart;

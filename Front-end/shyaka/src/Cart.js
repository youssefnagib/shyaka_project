import { useState, useEffect } from "react";
import "./Cart.css";
const Cart = () => {
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setOrderItems(storedCart);
  }, []);
  console.log(orderItems);

  const updateQuantity = (id, quantity) => {
    const updatedCart = orderItems.map((item) =>
      item.product === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
    );
    setOrderItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      const updatedCart = orderItems.filter((item) => item.product !== id);
      setOrderItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <header>
        <h1>Your Shopping Cart</h1>
      </header>
      <div className="container">
        {orderItems.length > 0 ? (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {orderItems.map((item) => (
                  <tr key={item.product}>
                    <td>{item.name}</td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td>{item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "EGP",
                    })}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.product, parseInt(e.target.value))
                        }
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>
                      {(item.price * item.quantity).toLocaleString("en-US", {
                        style: "currency",
                        currency: "EGP",
                      })}
                    </td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => removeItem(item.product)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total">
              <strong>Total: {calculateTotal().toLocaleString("en-US", {
                style: "currency",
                currency: "EGP",
              })}</strong>
            </div>
          </>
        ) : (
          <div className="empty-cart">
            <h2>Your cart is empty!</h2>
            <a href="/menproducts" className="btn">Continue Shopping</a>
          </div>
        )}
        <div className="actions">
          <a href="/checkout" className="btn">Checkout</a>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Cart;
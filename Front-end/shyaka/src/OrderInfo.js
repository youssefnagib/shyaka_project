import { useParams } from "react-router-dom";
import OrderInfoModel from "./OrderInfoModel";

const OrderInfo = () => {
  const { id } = useParams(); // Retrieve the order ID from the URL parameters
  const { isWaiting, serverError, order } = OrderInfoModel(
    `http://localhost:8000/api/orders/${id}/`
  );

  console.log(order); // Logs the order information for debugging purposes
  
  return (
    <div className="order-info-container">
      <br />
      {isWaiting && <h1>Loading...</h1>}
      {serverError && <h1 className="error">{serverError}</h1>}
      <br />
      {order ? (
        <div className="card container">
          <div className="card-body">
            <h5 className="card-title">Order ID: {order.id}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Payment Status: {order.payment_status}
            </h6>
            <p className="card-text">
              <strong>Address:</strong> {order.address}, {order.city}, {order.country} <br />
              <strong>Zip Code:</strong> {order.zip_code} <br />
              <strong>Phone Number:</strong> {order.phone_number} <br />
              <strong>Order Status:</strong> {order.status}
            </p>

            <h5>Order Items</h5>
            {Array.isArray(order.orderItem) && order.orderItem.length > 0 ? (
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Size</th>
                    <th>Color</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItem.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name || "N/A"}</td>
                      <td>{item.quantity || "N/A"}</td>
                      <td>{item.price || "N/A"}</td>
                      <td>{item.size || "N/A"}</td>
                      <td>{item.color || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No order items available.</p>
            )}

            <div>
              <strong>Total Amount:</strong> {order.total_amount} <br />
              <strong>Payment Method:</strong> {order.payment_method}
            </div>
            <a href="#" className="card-link">
              Card link
            </a>
            <a href="#" className="card-link">
              Another link
            </a>
          </div>
        </div>
      ) : (
        !isWaiting && <p>No order details available.</p> // If no order data and not loading, show message
      )}
    </div>
  );
};

export default OrderInfo;

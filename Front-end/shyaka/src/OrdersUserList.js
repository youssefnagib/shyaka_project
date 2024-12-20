import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

const OrdersUserList = ({ orders, name }) => {  
    return (
      <div className="profile-container">
        <h1>Orders for {name}</h1>
        <div className="table-container">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Created At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id}>
                    <th scope="row">{order.id}</th>
                    <td>{order.payment_status}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <Link to={`/order/${order.id}`} className="btn btn-info">
                        More
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No orders available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default OrdersUserList;

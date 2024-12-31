import React from "react";
import ProductModel from "./ProductModel";
import { Link } from "react-router-dom";
import LOADING from "./loading.gif"
import { useNavigate } from "react-router-dom";


const AdminProducts = () => {
const { isWaiting, serverError, setServerError, products, setProducts} = ProductModel(
    "http://127.0.0.1:8000/api/products/"
);

const navigate = useNavigate();


// IF not admin return to products page
    if (localStorage.getItem("role") !== "Admin") {
        navigate("/");
        return null;
    }

// Delete product function




// Conditional rendering based on loading state and errors
if (isWaiting) {
    return <div style={loading}><img src={LOADING} alt="loading" style={loadingImageStyles} /></div>;
}

if (serverError) {
    return <div>Error: {serverError}</div>
}
const token = localStorage.getItem("access_token");


    // Delete product function

    const deleteProduct = async (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    if (!isConfirmed) {
        return;
    }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/products/delete/${productId}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                console.error('Delete failed:', errorDetails);
                throw new Error(`Failed to delete product: ${response.status}`);
            }
    
            setProducts(products.filter(product => product.id !== productId));
        } catch (err) {
            console.error('Error deleting product:', err);
            setServerError('Error deleting product');
        }
    };

return (
    <div className="container">
    <header style={headerStyles}>
        <h1>admin</h1>
    </header>
    <div style={containerStyles}>
        <h2 style={sectionTitleStyles}>Explore Our Latest Fashion <Link to="/addproduct" className="btn btn-success">Add Product</Link></h2>
        <div style={productsContainerStyles}>
        {products.length > 0 ? (
            products.map((product) => (
            <div key={product.id} style={productCardStyles}>
                <img
                src={'http://127.0.0.1:8000'+product.image}
                alt={product.name}
                style={productImageStyles}
                />
                <h3 style={productNameStyles}>{product.name}</h3>
                <p style={productDescriptionStyles}>{product.description}</p>
                <p style={productPriceStyles}>{product.price} LE</p>
                <Link to={"/product/" + product.id + "/"} href="#" style={productLinkStyles}>
                                View Details
                                </Link>
                <button type="button" onClick={() => deleteProduct(product.id)} className="btn btn-danger" style={border}>Delete </button>
                <Link to={"/updateproduct/" + product.id + "/"} className="btn btn-primary">Update</Link>
                {console.log(product.id)}
            </div>
            ))
        ) : (
            <p>No products available.</p>
        )}
        </div>
    </div>
    <footer style={footerStyles}>
        <p>&copy; 2024 Shyaka. All Rights Reserved.</p>
    </footer>
    </div>
);
};

const border ={
    border: "none",
    borderRadius: "5px",
    color: "white",
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    margin:"10px",
    
    ":hover": {
        backgroundColor: "#c82333"
    }
}

const headerStyles = {
backgroundColor: "#858282",
color: "white",
textAlign: "center",
padding: "20px 0",
};

const containerStyles = {
padding: "20px",
maxWidth: "1200px",
margin: "0 auto",
};

const sectionTitleStyles = {
textAlign: "center",
fontSize: "28px",
marginBottom: "20px",
color: "#5a5252",
};

const productsContainerStyles = {
display: "flex",
flexWrap: "wrap",
gap: "20px",
justifyContent: "center",
};

const productCardStyles = {
backgroundColor: "white",
borderRadius: "8px",
boxShadow: "0 4px 10px rgba(117, 111, 111, 0.1)",
width: "300px",
textAlign: "center",
padding: "15px",
transition: "transform 0.3s, boxShadow 0.3s",
};

const productImageStyles = {
width: "100%",
borderRadius: "8px",
height: "auto",
};
const loadingImageStyles = {
justifyContent: "center",
alignSelf: "center",
width: "25%",
textAlign: "center",
borderRadius: "8px",
height: "auto",
};
const loading = {
alignItems: "center",
justifyContent: "center",
display: "flex",
height: "550px",
}

const productNameStyles = {
fontSize: "20px",
color: "#222",
margin: "15px 0 10px",
};

const productDescriptionStyles = {
fontSize: "16px",
color: "#777",
marginBottom: "10px",
};

const productPriceStyles = {
fontSize: "18px",
color: "#e74c3c",
fontWeight: "bold",
marginBottom: "15px",
};

const productLinkStyles = {
display: "inline-block",
padding: "10px 20px",
backgroundColor: "#333",
color: "white",
textDecoration: "none",
borderRadius: "5px",
transition: "backgroundColor 0.3s",
};

const footerStyles = {
backgroundColor: "#a8a2a2",
color: "white",
textAlign: "center",
padding: "10px 0",
marginTop: "20px",
};
  
export default AdminProducts;

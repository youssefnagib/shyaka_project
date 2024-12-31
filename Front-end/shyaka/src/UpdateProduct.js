import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProductInfoModel from "./ProductInfoModel";
import LOADING from "./loading.gif"


const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: null,
    category: "",
    gender: "",
    stock: ""
  });

  const [previewImage, setPreviewImage] = useState(null);

  const { isWaiting, serverError, product } = ProductInfoModel(
    `http://localhost:8000/api/products/${id}/`
  );

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        image: product.image || "",
        category: product.category || "",
        gender: product.gender || "",
        stock: product.stock || ""
      });
      setPreviewImage(product.image ? `http://localhost:8000/${product.image}` : null);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0])); // Display new image preview
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/products/update/${id}/`,
        {
          method: "PUT",
          body: formDataToSend,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      alert("Product updated successfully!");
      navigate("/adminproducts");
    } catch (error) {
      console.error("Error updating product:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  if (isWaiting) {
    return <div style={loading}><img src={LOADING} alt="loading" style={loadingImageStyles} /></div>;
  }

  if (serverError) {
    return <div>Error: {serverError}</div>;
  }

  return (
    <div className="container">
      <h1>Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span htmlFor="name" className="input-group-text">Name:</span>
          <input
            className="form-control"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span htmlFor="price" className="input-group-text">Price:</span>
          <input
            className="form-control"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group mb-3">
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Tops">Tops</option>
            <option value="Pants">Pants</option>
            <option value="Jackets">Jackets</option>
            <option value="Dress">Dress</option>
            <option value="Hoodies">Hoodies</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <span htmlFor="stock" className="input-group-text">Stock:</span>
          <input
            className="form-control"
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" htmlFor="description">Description:</span>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="card" style={card}>
          {previewImage ? (
            <img
              src={previewImage}
              alt={formData.name || "Product"}
              className="img-thumbnail"
            />
          ) : (
            <p>No image selected</p>
          )}
          <span className="input-group-text" htmlFor="image">Image:</span>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <button className="btn btn-primary" type="submit">Update Product</button>
      </form>
    </div>
  );
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
  

const card = {
  width: "18rem",
};

export default UpdateProduct;

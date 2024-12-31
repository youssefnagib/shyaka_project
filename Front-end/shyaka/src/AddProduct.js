import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
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
      const response = await fetch("http://localhost:8000/api/products/new/", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create product");
      }

      alert("Product added successfully!");
      navigate("/adminproducts"); // Navigate to the products page
    } catch (error) {
      console.error("Error adding product:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text" htmlFor="name">Name:</span>
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
          <span className="input-group-text" htmlFor="price">Price:</span>
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
          <span className="input-group-text" htmlFor="category">Category:</span>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="tops">Tops</option>
            <option value="pants">Pants</option>
            <option value="jackets">Jackets</option>
            <option value="dress">Dress</option>
            <option value="hoodies">Hoodies</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" htmlFor="gender">Gender:</span>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text" htmlFor="stock">Stock:</span>
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

        <div className="card" style={{ width: "18rem" }}>
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

        <button className="btn btn-primary" type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

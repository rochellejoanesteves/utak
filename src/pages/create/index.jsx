import React, { useState } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, set, push } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import "./create.scss";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    cost: "",
    stock: "",
    options: [{ size: "", price: "", cost: "", stock: "" }],
  });
  const [enableOptions, setEnableOption] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let filteredData = {};

    if (enableOptions) {
      filteredData = {
        name: formData.name,
        options: formData.options,
      };
    } else {
      filteredData = {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        cost: formData.cost,
        stock: formData.stock,
      };
    }
    const db = getDatabase(app);
    const newDocRef = push(ref(db, "menu"));
    set(newDocRef, filteredData)
      .then(() => {
        alert("data saved successfully");
        navigate("/")
      })
      .catch((error) => {
        alert("error: ", error.message);
      });

    setFormData({
      category: "",
      name: "",
      price: "",
      cost: "",
      stock: "",
      options: [{ size: "", price: "", cost: "", stock: "" }],
    });
    setEnableOption(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [
        ...formData.options,
        { size: "", price: "", cost: "", stock: "" },
      ],
    });
  };

  const handleOptionChange = (index, event) => {
    const { name, value } = event.target;
    const newOptions = [...formData.options];
    newOptions[index][name] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...formData.options];
    newOptions.splice(index, 1);
    setFormData({ ...formData, options: newOptions });
  };

  const handleOptions = (event) => {
    setEnableOption(event.target.checked);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        {enableOptions === false ? (
          <div>
            <div>
              <label htmlFor="price">Price ($):</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cost">Cost ($):</label>
              <input
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="stock">Stock:</label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        ) : null}

        <div>
          <label>Enable Options:</label>
          <input
            type="checkbox"
            checked={enableOptions}
            onChange={handleOptions}
          />
        </div>
        {enableOptions && (
          <div>
            <label>Options:</label>
            {formData.options.map((option, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Size"
                  name="size"
                  value={option.size}
                  onChange={(e) => handleOptionChange(index, e)}
                  required
                />
                <input
                  type="number"
                  placeholder="Price"
                  name="price"
                  value={option.price}
                  onChange={(e) => handleOptionChange(index, e)}
                  required
                />
                <input
                  type="number"
                  placeholder="Cost"
                  name="cost"
                  value={option.cost}
                  onChange={(e) => handleOptionChange(index, e)}
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  name="stock"
                  value={option.stock}
                  onChange={(e) => handleOptionChange(index, e)}
                  required
                />
                <button type="button" onClick={() => handleRemoveOption(index)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddOption}>
              Add Option
            </button>
          </div>
        )}
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default Create;

import React, { useState } from "react";
import app from "../../firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";
import { Box, Modal } from "@mui/material";

function ModalComponent({ showModal, setShowModal, item }) {
  const [formData, setFormData] = useState({ ...item });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/" + item.id);
    set(dbRef, {
      ...formData,
    })
      .then(() => {
        alert("Updated");
        setShowModal(false);
      })
      .catch((error) => {
        alert(error.message);
      });
    window.location.reload();
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

  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        px={{
          background: "white",
          height: "50%",
          width: "50%",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit} style={{ height: "100%"}}>
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
          {!!!formData?.options ? (
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
          {!!formData.options && (
            <div>
              <label>Options:</label>
              {formData.options?.map((option, index) => (
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
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddOption}>
                Add Option
              </button>
            </div>
          )}
          <button type="submit">Update Item</button>
        </form>
      </Box>
    </Modal>
  );
}

export default ModalComponent;

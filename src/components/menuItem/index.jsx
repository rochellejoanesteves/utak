import React, { useState } from "react";
import "./menuItem.scss";
import app from "../../firebaseConfig";
import { getDatabase, ref, remove } from "firebase/database";
import { CiCircleRemove, CiEdit } from "react-icons/ci";
import ModalComponent from "../modal";

function MenuItem({ item }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/" + id);
    await remove(dbRef);
    window.location.reload();
  };
  return (
    <div className="card-item">
      <div className="icons">
        <CiEdit onClick={() => setShowModal(true)} />
        <CiCircleRemove onClick={() => handleDelete(item.id)} />
      </div>
      <div>
        <h2>Name: {item.name}</h2>
        <h3>Category: {item.category}</h3>
        {!!item?.options ? (
          <table>
            <thead>
              <tr>
                <th>Size</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {item.options?.map((option, index) => (
                <tr key={index}>
                  <td>{option.size}</td>
                  <td>${option.price}</td>
                  <td>${option.cost}</td>
                  <td>{option.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p>Price: ${item.price}</p>
            <p>Cost: ${item.cost}</p>
            <p>Stock: {item.stock}</p>
          </div>
        )}

        {showModal && (
          <ModalComponent
            showModal={showModal}
            setShowModal={setShowModal}
            item={item}
          />
        )}
      </div>
    </div>
  );
}

export default MenuItem;

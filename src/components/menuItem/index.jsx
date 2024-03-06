import React from "react";
import "./menuItem.scss";
import app from "../../firebaseConfig";
import { getDatabase, ref, remove } from "firebase/database";
import { CiCircleRemove } from "react-icons/ci";

function MenuItem({ item }) {
  const handleDelete = async (id) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "menu/" + id);
    await remove(dbRef);
    window.location.reload();
  };
  return (
    <div className="card-item">
      <CiCircleRemove
        onClick={() => handleDelete(item.id)}
        className="delete-icon"
      />
      <div>
        <h2>Name: {item.name}</h2>
        <h3>Category: {item.category}</h3>
        <table>
          {item.options?.length > 0 ? (
            <thead>
              <tr>
                <th>Size</th>
                <th>Price</th>
                <th>Cost</th>
                <th>Stock</th>
              </tr>
            </thead>
          ) : (
            <div>
              <p>Price: ${item.price}</p>
              <p>Cost: ${item.cost}</p>
              <p>Stock: {item.stock}</p>
            </div>
          )}
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
      </div>
    </div>
  );
}

export default MenuItem;

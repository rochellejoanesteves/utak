import React from "react";
import "./menuItem.scss";

function MenuItem({ item }) {
  return (
    <div className="card-item">
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

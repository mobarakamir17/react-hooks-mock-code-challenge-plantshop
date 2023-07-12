import React from "react";

function PlantCard({ plant, toggleSoldOut }) {
  const { id, name, image, price, soldOut } = plant;

  const handleSoldOutToggle = () => {
    toggleSoldOut(id);
  };

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>Price: ${price.toFixed(2)}</p>
      <button
        className={soldOut ? "primary" : ""}
        onClick={handleSoldOutToggle}
      >
        {soldOut ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
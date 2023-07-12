import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, toggleSoldOut }) {
  return (
    <ul className="cards">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          plant={plant}
          toggleSoldOut={toggleSoldOut}
        />
      ))}
    </ul>
  );
}

export default PlantList;
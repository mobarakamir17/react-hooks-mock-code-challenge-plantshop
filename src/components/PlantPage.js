import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    try {
      const response = await fetch("http://localhost:6001/plants");
      if (response.ok) {
        const data = await response.json();
        const plantsWithStockStatus = data.map((plant) => ({
          ...plant,
          soldOut: true, // Set the initial stock status to true (sold out)
        }));
        setPlants(plantsWithStockStatus);
        setFilteredPlants(plantsWithStockStatus);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  };

  const addPlant = async (newPlant) => {
    try {
      const response = await fetch("http://localhost:6001/plants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPlant),
      });
      if (response.ok) {
        const data = await response.json();
        setPlants([...plants, data]);
        setFilteredPlants([...plants, data]);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("Error adding plant:", error);
    }
  };

  const toggleSoldOut = async (plantId) => {
    const updatedPlants = plants.map((plant) => {
      if (plant.id === plantId) {
        return {
          ...plant,
          soldOut: !plant.soldOut,
        };
      }
      return plant;
    });
    setPlants(updatedPlants);
    setFilteredPlants(updatedPlants);
  };

  const handleSearch = (searchTerm) => {
    const filteredPlants = plants.filter((plant) =>
      plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlants(filteredPlants);
  };

  return (
    <main>
      <NewPlantForm addPlant={addPlant} />
      <Search handleSearch={handleSearch} />
      <PlantList plants={filteredPlants} toggleSoldOut={toggleSoldOut} />
    </main>
  );
}

export default PlantPage;
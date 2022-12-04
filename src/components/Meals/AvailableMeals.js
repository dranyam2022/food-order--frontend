import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

function AvailableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://react-practice01-2a758-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
        );
        if (response.ok) {
          const responseData = await response.json();
          setIsLoading(false);

          const responseDataArray = [];
          for (const key in responseData) {
            responseDataArray.push({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
            });
          }
          setMeals((prevState) => {
            return responseDataArray;
          });
        } else {
          throw new Error("Something went wrong!!!");
        }
      } catch (e) {
        setIsLoading(false);
        setError(e.message);
      }
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content = "";
  if (isLoading) {
    content = <p>Loading Content...</p>;
  }
  if (!isLoading && !error) {
    content = <ul>{mealsList}</ul>;
  }
  if (!isLoading && error) {
    content = <p>Something went wrong...</p>;
  }
  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
}

export default AvailableMeals;

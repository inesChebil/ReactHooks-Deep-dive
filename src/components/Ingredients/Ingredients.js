import React, { useState } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);

  // It's not a good option to send a request like the following because it leads to an infinite loop,
  // why we have to use useEffect
  // fetch("https://oshop-e9b68.firebaseio.com/ingredients.json")
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((responseData) => {
  //     const loadedIngredients = [];
  //     for (const key in responseData) {
  //       loadedIngredients.push({
  //         id: key,
  //         title: responseData[key].title,
  //         amount: responseData[key].amount,
  //       });
  //     }
  //     setUserIngredients(loadedIngredients);
  //   });
  const addIngredientHandler = (ingredient) => {
    fetch("https://oshop-e9b68.firebaseio.com/ingredients.json", {
      method: "POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log({ response1: response });
        return response.json();
      })
      .then((responseData) => {
        console.log({ response2: responseData });
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ]);
      });
  };
  const removeIngredientHandler = (id) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== id)
    );
    // const ingId = userIngredients.indexOf(id);
    // const userIng = userIngredients.filter((val, i) => i === ingId);
    // setUserIngredients(userIng);
  };
  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;

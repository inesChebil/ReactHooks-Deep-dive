import React, { useState, useEffect, useCallback } from "react";

import IngredientForm from "./IngredientForm";
import Search from "./Search";
import IngredientList from "./IngredientList";
const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([]);
  // There is no extaernal dependencies , that's why we added [],
  // useEffect in this case acts like componentDidMount : It runs only Once (After the first render)
  // I need to memorize this: with an empty array as a second argument to useEffect, the function i pass
  // to useEffect is like "ComponentDidMount"
  // useEffect(() => {
  //   fetch("https://oshop-e9b68.firebaseio.com/ingredients.json")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((responseData) => {
  //       const loadedIngredients = [];
  //       for (const key in responseData) {
  //         loadedIngredients.push({
  //           id: key,
  //           title: responseData[key].title,
  //           amount: responseData[key].amount,
  //         });
  //       }
  //       setUserIngredients(loadedIngredients);
  //     });
  // }, []);
  // We can use useEffect many times
  // The function inside of useEffect will run only if userIngredients change
  useEffect(() => {
    console.log("Rendering Ingredients", userIngredients);
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients);
  }, []);
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
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;

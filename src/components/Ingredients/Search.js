<<<<<<< HEAD
import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo((props) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  useEffect(() => {
    const query =
      enteredFilter.length === 0
        ? ""
        : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch("https://oshop-e9b68.firebaseio.com/ingredients.json" + query)
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        onLoadIngredients(loadedIngredients);
      });
  }, [enteredFilter, onLoadIngredients]);
=======
import React from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
>>>>>>> 34e7bbb99afb40953921cc4e50ea825953b7206b
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
<<<<<<< HEAD
          <input
            type="text"
            value={enteredFilter}
            onChange={(event) => setEnteredFilter(event.target.value)}
          />
=======
          <input type="text" />
>>>>>>> 34e7bbb99afb40953921cc4e50ea825953b7206b
        </div>
      </Card>
    </section>
  );
});

export default Search;

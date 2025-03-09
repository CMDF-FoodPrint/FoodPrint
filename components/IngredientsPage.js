import React, { useState } from "react";
import Input from "../styles/Input.css";

const IngredientsPage = () => {
    const [ingredients, setIngeredients] = useState([]);
    const [input, setInput] = useState("");

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key == "Enter" && input.trim() !== "") {
            setIngeredients([...ingredients, input.trim()]);
            setInput("");
        }
    };

    const handleRemoveIngredients = (ingredient) => {
        setIngeredients(ingredients.filter((item) => item !== ingredient));
    };

    return (
        <div className="ingredients-container">
            <h1>ingredients</h1>
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="type an ingredient"
            />
      <div className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <div
            key={index}
            className="ingredient-bubble"
            onClick={() => handleRemoveIngredient(ingredient)}
          >
            {ingredient}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsPage;
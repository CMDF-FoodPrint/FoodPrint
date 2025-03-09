import React, { useState } from "react";
import "../styles/IngredientsPage.css";
import "../styles/generateButton.css";

const IngredientsPage = () => {
    const [ingredients, setIngeredients] = useState([]);
    const [input, setInput] = useState("");


    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key == "Enter" && input.trim() !== "") {
            setIngeredients([input.trim(), ...ingredients, ]);
            setInput("");
        }
    };

    const handleSaveClick = () => {
        //call query function in libs
        window.location.href = "/next-page"; 
    }


    return (
        <div className="ingredients-container">
          <h1>Fill your fridge</h1>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter an ingredient"
            className="input"
          />
          <section className="section">
            {ingredients.map((ingredient, index) => (
                <div key={index} className="card">
                    <div className="card-content">
                        <img src={"/red-apple-transparent-png.webp"} alt="apple" style={{ width: '30px', height: '30px' }}/>      
                        <div className="card-top">
                            {ingredient}
                        </div>
                    </div>
                </div>
            ))}
          </section>
          <button className="button" onClick={handleSaveClick}>
          <div className="shadow"></div>
                <div className="edge"></div>
                <div className="front">
                    <span>Generate</span>
                </div>
                </button>
        </div>
    );
};
    
export default IngredientsPage;

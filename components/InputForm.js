import React, { useState } from 'react';
import {Button} from "react-bootstrap";

const InputForm = () => {
    // Define two pieces of state using the useState hook.
    // 'input' stores the value of the input field.
    // 'item' stores an array of items.
    const [input, setInput] = useState("");
    const [item, setItem] = useState([]);
  
    // When the input value changes, update the 'input' state.
    const inputHandler = (e) => {
      setInput(e.target.value);
    }
  
    // When the button is clicked, add the 'input' value to the 'item' array.
    const clickHandler = (e) => {
      // Use array spread syntax to create a new array that includes the 'input' value.
      setItem([...item, input]);
    }
  
    return (
      <div>
        {/* Input field with an 'onChange' event handler to update 'input' state. */}
        <input type="text" onChange={inputHandler} />
  
        {/* Button with an 'onClick' event handler to add 'input' to the 'item' array. */}
        <button onClick={clickHandler}>新增</button>
      </div>
    )
  }
//https://www.digitalocean.com/community/tutorials/how-to-build-forms-in-react

import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";

function formReducer(state, action) {
  const { name, value, reset } = action.payload;

  if (reset) {
    return {
      name: "",
      count: 0,
      giftWrap: false,
      fruits: "Apple"
    };
  }
  return { ...state, [name]: value };
}

export default function App() {
  const [formData, dispach] = useReducer(formReducer, {
    name: "",
    count: 0,
    giftWrap: false
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      dispach({ payload: { reset: true } });
    }, 3000);
  };

  const handleChange = (event) => {
    const isCheckBox = event.target.type === "checkbox";
    dispach({
      payload: {
        name: event.target.name,
        value: isCheckBox ? event.target.checked : event.target.value
      }
    });
  };

  useEffect(() => {
    console.log(formData);
  });

  return (
    <div className="wrapper">
      <h1>Hello CodeSandbox</h1>
      <form>
        <fieldset>
          <label>
            {submitting && (
              <div>
                You are submitting {formData.name},{formData.fruits},{" "}
                {formData.count}
              </div>
            )}
            <p>name:</p>
            <input
              name="name"
              value={formData.name}
              type="email"
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <fieldset>
          <label>
            <p>Fruits</p>
            <select
              name="fruits"
              value={formData.fruits}
              onChange={handleChange}
            >
              <option value="apple">Apple</option>
              <option value="Pear">Pear</option>
              <option value="Orange">Orange</option>
              <option value="Berry">Berry</option>
            </select>
          </label>
          <label>
            <p>Count</p>
            <input
              name="count"
              type="number"
              step="1"
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Gift Wrap</p>
            <input
              type="checkbox"
              checked={formData.giftWrap}
              name="giftWrap"
              onChange={handleChange}
            />
          </label>
        </fieldset>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

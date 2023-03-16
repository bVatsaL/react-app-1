import React, { useState } from "react";
import "./App.css";

const API_URL = process.env.API_URL || 'https://app1-92ca.onrender.com';

const App = () => {
  const [itemName, setItemName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleItemSubmit = (e) => {
    setIsSubmitting(true);
    e?.preventDefault?.();
    const data = { item: itemName };
    fetch(`${API_URL}/api`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setItemName('');
        setSuccessMessage(result.data);
        setIsSubmitting(false);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      });
  };

  const handleItemNameChange = (e) => setItemName(e.target.value);
  const clearItems = () => {
    setIsClearing(true);
    fetch(`${API_URL}/api/clear`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setIsClearing(false);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleItemSubmit}>
          <div>
            <div style={{ margin: '10px' }}>Create an item</div>
            <input
              className="inputStyle"
              type="text"
              name="itemName"
              id="itemName"
              value={itemName}
              onChange={handleItemNameChange}
            />
            <button className="buttonStyle" type="submit" disabled={!itemName}>{isSubmitting ? 'Submitting...' : 'Submit'}</button>
            <button className="buttonStyle" type="button" onClick={clearItems}>{isClearing ? 'Cleaning...' : 'Clear'}</button>
          </div>
        </form>
        {!!successMessage && (
          <span style={{margin: '10px'}}>{successMessage}</span>
        )}
      </header>
    </div>
  );
};

export default App;

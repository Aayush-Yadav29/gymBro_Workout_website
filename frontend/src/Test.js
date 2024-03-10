import React, { useState } from 'react';

const Test = ({ onSubmit }) => {
  const [currentCard, setCurrentCard] = useState(1);
  const [formData, setFormData] = useState({});
  const totalCards = 3;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextClick = () => {
    if (currentCard <= totalCards) {
      setCurrentCard((prevCard) => prevCard + 1);
    }
  };

  const handleSubmit = () => {
    // You can submit the formData or perform any other action here
    console.log(formData);
    // onSubmit(formData);
  };

  return (
    <div>
      {currentCard <= totalCards ? (
        <div>
          <h2>Card {currentCard}</h2>
          <form>
            <label>
              Input Field:
              <input
                type="text"
                name={`inputField${currentCard}`}
                value={formData[`inputField${currentCard}`] || ''}
                onChange={handleInputChange}
              />
            </label>
          </form>
          <button onClick={handleNextClick}>Next</button>
        </div>
      ) : (
        <div>
          <h2>All Cards Submitted</h2>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Test;

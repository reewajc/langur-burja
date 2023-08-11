import React, { useState, useEffect } from 'react';
import '../style/DiceGrid.css'; // You can create a CSS file for styling
import { Button } from 'react-bootstrap';

import king from '../../src/assets/images/KING.png';
import diamond from '../../src/assets/images/DIAMOND.png';
import heart from '../../src/assets/images/HEART.png';
import spade from '../../src/assets/images/SPADE.png';
import club from '../../src/assets/images/CLUB.png';
import queen from '../../src/assets/images/QUEEN.png';

const DiceGrid = () => {
  const images = [king, diamond, heart, spade, club, queen];
  const [imageGrid, setImageGrid] = useState([]);
  const [randomNumbers, setRandomNumbers] = useState([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [rolling, setRolling] = useState(false); // State to control rolling animation

  const imageMap = {
    1: images[0],
    2: images[1],
    3: images[2],
    4: images[3],
    5: images[4],
    6: images[5],
  };

  useEffect(() => {
    // Hide the welcome message after a delay
    if (showWelcome) {
      setTimeout(() => {
        setShowWelcome(false);
      }, 1000); // 2000 milliseconds (2 seconds)
    }
  }, [showWelcome]);

  const handleClick = () => {
    if (rolling) return; // Prevent rolling while animation is active

    setShowWelcome(false); // Hide the welcome message
    setRolling(true); // Start rolling animation

    // Simulate rolling animation
    setTimeout(() => {
      if (shouldDisplayAllUniqueImages()) {
        // Display all unique images
        setImageGrid(images);
      } else {
        // Display random images
        const newRandomNumbers = generateRandomNumbers(6);
        const shuffledImages = newRandomNumbers.map(number => imageMap[number]);
        setImageGrid(shuffledImages);
        setRandomNumbers(newRandomNumbers);
      }

      setRolling(false); // End rolling animation
    }, 3000); // 3000 milliseconds (3 seconds)
  };

  const shouldDisplayAllUniqueImages = () => Math.random() < 0.3; // Adjust the probability as needed

  const generateRandomNumbers = (count) => {
    const randomNumbers = [];
    for (let i = 0; i < count; i++) {
      randomNumbers.push(getRandomNumber());
    }
    return randomNumbers;
  };

  const getRandomNumber = () => {
    const availableNumbers = [1, 2, 3, 4, 5, 6].filter(num => !randomNumbers.includes(num));
    if (availableNumbers.length === 0) {
      setRandomNumbers([]);
      return getRandomNumber();
    }
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  return (
    <div className="dice-container">
      <div className="welcome-message-container">
        {showWelcome && <p className="welcome-message">Welcome!</p>}
      </div>
      <div className="image-grid">
        {imageGrid.map((image, index) => (
          <div className={`image-grid-item ${rolling ? 'rolling' : ''}`} key={index}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
      <Button className='btn-lg' variant="success" onClick={handleClick} disabled={rolling}>
        {rolling ? 'Rolling...' : 'Roll'}
      </Button>
    </div>
  );
};

export default DiceGrid;

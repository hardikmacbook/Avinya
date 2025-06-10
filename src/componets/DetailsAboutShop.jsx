import React from 'react';
import styled from 'styled-components';

const cardData = [
  { number: '3+', label: 'Years of experience' },
  { number: '1000+', label: 'Our Products' },
  { number: '50+', label: 'Our Happy Customers' },
  { number: '1+', label: 'xyz' },
];

const Card = ({ number, label }) => {
  return (
    <StyledWrapper>
      <div className="outer">
        <div className="dot" />
        <div className="card">
          <div className="ray" />
          <div className="text">{number}</div>
          <div>{label}</div>
          <div className="line topl" />
          <div className="line leftl" />
          <div className="line bottoml" />
          <div className="line rightl" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .outer {
    width: 275px;
    height: 250px;
    border-radius: 10px;
    padding: 1px;
    background: radial-gradient(circle 230px at 0% 0%, #ffffff, #0c0d0d);
    position: relative;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .dot {
    width: 7px;
    aspect-ratio: 1;
    position: absolute;
    background-color: #8b2727;
    box-shadow: 0 0 10px #ffffff;
    border-radius: 100px;
    z-index: 2;
    right: 20%;
    top: 20%;
    animation: moveDot 6s linear infinite;
  }

  @keyframes moveDot {
    0%,
    100% {
      top: 10%;
      right: 10%;
    }
    25% {
      top: 10%;
      right: calc(100% - 35px);
    }
    50% {
      top: calc(100% - 30px);
      right: calc(100% - 35px);
    }
    75% {
      top: calc(100% - 30px);
      right: 10%;
    }
  }

  .card {
    z-index: 1;
    width: 275px;
    height: 100%;
    border-radius: 9px;
    border: solid 1px #202222;
    background-size: 20px 20px;
    background: radial-gradient(circle 280px at 0% 0%, #444444, #0c0d0d);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    flex-direction: column;
    color: #d2af6f;
  }

  .card .text {
    font-weight: bolder;
    font-size: 2rem;
    background: linear-gradient(45deg, #000000 4%, #d2af6f, #000);
    background-clip: text;
    color: transparent;
  }

  .line {
    width: 100%;
    height: 1px;
    position: absolute;
    background-color: #d2af6f;
  }
  .topl {
    top: 10%;
    background: linear-gradient(90deg, #888888 30%, #d2af6f 70%);
  }
  .bottoml {
    bottom: 10%;
  }
  .leftl {
    left: 10%;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, #747474 30%, #d2af6f 70%);
  }
  .rightl {
    right: 10%;
    width: 1px;
    height: 100%;
  }
`;

const App = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cardData.map((item, index) => (
        <Card key={index} number={item.number} label={item.label} />
      ))}
    </div>
  );
};

export default App;

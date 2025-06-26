import React from 'react';
import styled from 'styled-components';

const Card = () => {
  const statusData = [
    { id: 1, count: "3+", label: 'Years of experience ' },
    { id: 2, count: "500+", label: 'Products' },
    { id: 3, count: "75+", label: 'Our Happy Customers' },
    { id: 4, count: "1+", label: 'demo' }
  ];

  return (
    <StyledWrapper>
      <div className="status-container">
        {statusData.map((item) => (
          <div key={item.id} className="status">
            <div className="mac-header">
              <span className="brown" />
              <span className="yellow" />
              <span className="brown" />
            </div>
            <span>{item.count}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top:100px;

  .status-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    width: 100%;
  }

  .status {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #222533;
    color: #fbebe2;
    padding: 24px;
    width: 250px;
    height: 220px;
    border-radius: 26px;
    margin: 10px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    transition: all 0.3s ease-in-out;
    border: transparent 1px solid;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }

  .status span {
    font-size: 3.5rem;
    font-weight: 900;
    transition: all 0.3s ease-in-out;
  }

  .status p {
    font-size: 12px;
    transition: all 0.3s ease-in-out;
  }

  .status:hover {
    background-color: #1d1d1d;
    transform: scale(1.1);
    border: #5e63ff 1px solid;
  }

  .status:hover p {
    font-size: 15px;
    font-weight: 500;
    color: #b1cbf6;
  }

  .status:hover span {
    font-size: 4rem;
    color: #5e63ff;
  }

  .mac-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding-bottom: 8px;
  }

  .mac-header span {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  .mac-header .brown {
    background-color: #8b2727;
  }

  .mac-header .yellow {
    background-color: #d2af6f;
  }

  @media (max-width: 768px) {
    .status-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
    }
  }
`;

export default Card;
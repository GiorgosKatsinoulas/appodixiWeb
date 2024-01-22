import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  max-height: 80%;
  width: 40vh;
  max-width: 80%; /* Adjust the max-width as needed */
  margin: 10vh auto; /* Center the box horizontally and add space at the top */
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh; /* Ensure the container takes at least the full viewport height */
  background-color: #1d90c2;
`;

export const Header = styled.header`
  font-size: 2rem;
  height: 10vh;
  padding-top: 2vh;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  color: #112c6b;
  text-align: center;
`;

export const HeaderImage = styled.img`
  max-width: 100%;
  height: 10vh;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  max-width: 100%;
  width: 100%;
  border-radius: 12px;
  border-color: #477dfc;
  border-width: 1px;
  background-color: white;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box; /* Include padding and border in the width */
`;
export const Button = styled.button`
  border: none;
  border-radius: 12px;
  background-color: #477dfc;
  color: white;
  padding: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #345aa5;
  }
`;

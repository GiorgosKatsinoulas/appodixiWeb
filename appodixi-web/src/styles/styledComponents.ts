import styled from 'styled-components';
import { COLORS } from './colors';

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
  background-color: ${COLORS.AADE_WHITE};
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
  background-color: ${COLORS.AADE_LIGHT_BLUE};
`;

export const Header = styled.header`
  font-size: 2rem;
  height: 10vh;
  padding-top: 2vh;
`;

export const Paragraph = styled.p`
  font-size: 1rem;
  color: ${COLORS.AADE_DARK_BLUE};
  text-align: center;
`;

export const HeaderImage = styled.img`
  max-width: 100%;
  height: 10vh;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input<{ emptied: boolean }>`
  max-width: 100%;
  width: 100%;
  border-radius: 12px;
  border-color: ${({ emptied }) =>
    emptied ? COLORS.AADE_RED : COLORS.AADE_BLUE};
  border-width: 1px;
  background-color: ${COLORS.AADE_WHITE};
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box; /* Include padding and border in the width */
`;
export const Button = styled.button`
  border: none;
  width: 30vh;
  border-radius: 12px;
  background-color: ${COLORS.AADE_BLUE};
  color: white;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease-in-out;
  align-self: 'center';
  &:hover {
    background-color: ${COLORS.AADE_LIGHT_BLUE};
  }
`;

export const FormImageContainer = styled.div`
  display: flex;
  max-width: 70%;
  max-width: 70%;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  /* Add space between child elements */
  & > * {
    margin-bottom: 15px; /* Adjust the value as needed */
  }
`;
export const ResponsiveImage = styled.img`
  max-width: 100%;
  height: auto;
`;

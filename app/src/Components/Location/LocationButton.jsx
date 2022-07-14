import styled from "styled-components";
import "../../vars.css";

//Styled components
const Button = styled.button`
  padding: 3px 6px;
  background: var(--text-color);
  color: dark-grey;
  border: 1px solid white;
  border-radius: 5px;
`;

export default function LocationButton(){
  return( 
      <Button>+ Location</Button>
  );
}
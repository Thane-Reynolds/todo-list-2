import * as React from 'react';
import styled from "styled-components";
import { ACTIONS } from "../../Pages/Todos"; 
import.meta.env.VITE_API_ENDPOINT;

//Styled components
const CardWrapper = styled.section`
  padding: 5px 10px;
  background-color:var(--background-lighter);
  margin: 10px 7px;
  border-radius: 5px;
  border: 1px solid white;
  max-width: 600px;
`

const Form = styled.form`
  display: flex;
  align-items:center;
  justify-content: flex-start;
  gap; 15px;
  width: 100%;
`

const Todo = styled.input`
  background-color: var(--background-lightgrey);
  color: var(--text-color-darker);
  width: 100%;
  text-align: left;
  margin-left: 10px;
`

const ButtonRowDiv = styled.div`
  display: flex;
  flex-wrap: no-wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
  padding: 1px 1px;
`;
const DeleteButton = styled.button`
  background-color: var(--text-color);
  color: var(--background);
  border: 1px solid var(--background-lightgrey);
  border-radius: 5px;
  padding: 3px 6px;
  :hover {
    background-color: red;
    color: white;
  }
`;

export default function TodoSlide({todo, dispatch, locations, categories}){
  const { createdAt, todoName, category, updatedAt, completed, location, id} = todo;
  const [formData, setFormData] = React.useState({
    todoName: todoName,
    completed: completed
  });

  const currentLocation = locations.find(loc => loc.id === location)
  const myCategory = categories.find(cat => cat.id === category)

  
  //update state on change, this will be submitted
  function handleChange(e){
    switch (e.target.type) {
      case "text":
        setFormData({
          todoName: e.target.value,
          completed: formData.completed
        })
        break;
        
        case "checkbox":
          setFormData({
            todoName: formData.todoName,
            completed: e.target.checked
          })
          break;
        }
      }

  // send state to update API
  function handleSubmit(event){
    event.preventDefault()
    const init = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
      "completed": event.target[0].checked,
      "todoName": event.target[1].value,
      "id": id
      })
    }
      fetch(`${import.meta.env.VITE_API_ENDPOINT}todos/${id}`, init)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error! ${response.status}`);
          }
          dispatch({ type: ACTIONS.PUT });
        })
        
  }

  // delete a todo from api
  function handleDelete(e){
    const init = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    fetch(`${import.meta.env.VITE_API_ENDPOINT}todos/${id}`, init)
      .then((response) =>{
        if(!response){
          throw new Error(`Shits broken yo ${response.status}`)
        }
        fetchTodos();
        return
      })

  };

  // fetch new todos, this is for when a new todo is added or a todo is deleted
  function fetchTodos(){
     const init = {
       headers: {
         Accept: "application/json",
       },
     };

     fetch(`${import.meta.env.VITE_API_ENDPOINT}todos`, init)
       .then((response) => {
         if (!response) {
           throw new Error(`Error! ${response.status}`);
         }
         return response.json();
       })
       .then((response) => {
         dispatch({ type: ACTIONS.GET, payload: response });
       });
   };

  return (
    <CardWrapper>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <input
          type="checkbox"
          onChange={(e) => handleChange(e)}
          checked={formData.completed}
        />
        <Todo
          onChange={(e) => handleChange(e)}
          type="text"
          value={formData.todoName}
        />
        {(formData.todoName !== todoName ||
          formData.completed !== completed) && (
          <button type="submit">Save</button>
        )}
      </Form>
      <ButtonRowDiv>
        {myCategory && <div><p>{myCategory.categoryName}</p></div>}
        {myCategory && currentLocation && <div><p>|</p></div>}
        {currentLocation && <div><p>{currentLocation.locationName}</p></div>}
        <DeleteButton onClick={(e) => handleDelete(e)}>Delete</DeleteButton>
      </ButtonRowDiv>
    </CardWrapper>
  );
}
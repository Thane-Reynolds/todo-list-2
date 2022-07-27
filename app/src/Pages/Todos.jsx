import * as React from 'react'
import styled from 'styled-components'
import TodoCard from '../Components/Todo/TodoCard'
import "../vars.css"
import CategoryButton from '../Components/Category/CategoryButton'
import LocationButton from '../Components/Location/LocationButton'
import NewTaskButton from '../Components/NewTask/NewTaskButton'
import { Link } from "react-router-dom"
import NewTask from '../Components/NewTask/NewTask'
import Portal from '../Components/Modal/Portal'

export const ACTIONS = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  TOGGLE_COMPLETE: 'togglecomplete'
}

// for update useReducer state
function reducer(todos, action) {
  switch (action.type){
    case ACTIONS.GET:
      return [...action.payload.todos]
    case ACTIONS.TOGGLE_COMPLETE:
      return todos.map(todo => {
        if(todo.id === action.payload.id){
          return{...todo, completed: !todo.completed}
        }
        return todo
      })
    case ACTIONS.PUT:
      function fetchTodos(){
        const init = {
          headers:{
            Accept: "application/json"
          }
        };
        console.log("put action",action)
        
        fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/todos/${action.payload.userID}`, init)
          .then((response) => {
            if (!response) {
              throw new Error(`Error! ${response.status}`);
            }
            return response.json();
          })
          .then((response) => {
            return [...response.todos];
          })
        };
        fetchTodos();
    default:
      return todos
  }
}

//Styled components
// page is in progress, deciding if I want it to wrap with the todos next to each other at 
// a certain width or not
const Page = styled.section`
  flex-direction: row;
`

const ToDo = styled.div`
   background-color: var(--background);
   min-width: 360px;
   max-width: 1400px;
   border: 2px solid grey;
   border-radius: 5px;
   text-align: center;
   @media screen and (min-width: 800px){
    min-width: 500px;
   }
 `;
const ButtonRowDiv = styled.div`
   display: flex;
   flex-wrap: no-wrap;
   align-items: center;
   justify-content: flex-end;
   gap: 15px;
   padding-right: 10px;
   padding-bottom: 10px;
 `;



export default function Todos (){
  const [todos, dispatch] = React.useReducer(reducer, []);
  const [showModal, setShowModal] = React.useState(false);
  const [categories, setCategories] = React.useState([]);
  const [locations, setLocations] = React.useState([]);
  const [user, setUser] = React.useState({
    id: 1,
    username: 'Thane',
  });

  // in callback so this doesn't keep running
  const fetchTodos = React.useCallback(() => {
    const init = {
      headers: {
        Accept: "application/json",
      },
    };

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/todos/${user.id}`, init)
      .then((response) => {
        if (!response) {
          throw new Error(`Error! ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        dispatch({ type: ACTIONS.GET, payload: response });
      });
  }, []);

  //calls the fetchTodos function that is part of a callback on change
  React.useEffect(fetchTodos, []);

  //fetches categories from api
  const fetchCategories = React.useCallback(() => {
    const init = {
      headers: {
        Accept: "application/json",
      },
    };

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/categories/${user.id}`, init)
      .then((response) => {
        if (!response) {
          throw new Error(`Error! ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setCategories([...response.categories]));
  });

  //calls the fetchCategories function on change
  React.useEffect(fetchCategories, []);

  //fetches locations from api
  const fetchLocations = React.useCallback(() => {
    const init = {
      headers: {
        Accept: "application/json",
      },
    };

    fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/locations/${user.id}`, init)
      .then((response) => {
        if (!response) {
          throw new Error(`Error! ${response.status}`);
        }
        return response.json();
      })
      .then((response) => setLocations([...response.locations]));
  });

  //calls the fetchLocations function on change
  React.useEffect(fetchLocations, []);

  // changes modal state between true and false for conditional rendering
  function handleModal(e) {
    setShowModal((priorShow) => !priorShow);
  }

  return (
    <div>
      {showModal && (
        <Portal>
          <NewTask
            locations={locations}
            categories={categories}
            dispatch={dispatch}
            setShowModal={setShowModal}
            user={user}
          />
        </Portal>
      )}
      <ToDo>
        <h1>To-Do</h1>
        {todos.map((todo) => {
          return (
            <TodoCard
              key={todo.id}
              todo={todo}
              dispatch={dispatch}
              user={user}
            />
          );
        })}
        <ButtonRowDiv>
          <NewTaskButton handleModal={handleModal} />
          <Link to="/category">
            <CategoryButton categories={categories} />
          </Link>
          <Link to="/location">
            <LocationButton locations={locations} />
          </Link>
        </ButtonRowDiv>
      </ToDo>
    </div>
  );
}
import * as React from 'react'
import styles from './newTask.module.css'
import { ACTIONS } from '../../Pages/Todos';
import { Combobox } from '@headlessui/react';


export default function NewTaskModal({setShowModal, dispatch, locations, categories }) {
  const [newTodo, setNewTodo] = React.useState({
    todoName: "",
    category: 0,
    completed: false,
    location: 0,
  });

  // state for Category combobox
  const [selectedCategory, setSelectedCategory] = React.useState(categories[0]);
  const [catQuery, setCatQuery] = React.useState("");

  const filteredCategory =
    catQuery === ""
      ? categories
      : categories.filter((category) => {
          return category.categoryName
            .toLowerCase()
            .includes(catQuery.toLowerCase());
        });

  // state for Location combobox
  const [selectedLocation, setSelectedLocation] = React.useState(locations[0]);
  const [locQuery, setLocQuery] = React.useState("");

  const filteredlocation =
    catQuery === ""
      ? locations
      : locations.filter((location) => {
          return location.locationName
            .toLowerCase()
            .includes(locQuery.toLowerCase());
        });

  // sets show modal state from the close button, this is passed down from todos
  function handleModal() {
    setShowModal((priorShow) => !priorShow);
  }

  // handles changes in form based on which form is updatedv -> currently only todo
  function handleChange(event) {
    setNewTodo({
      ...newTodo,
      todoName: event.target.value,
    });
  }

  // handles location change
  function handleLocationChange(event){
    const tempLoc = locations.find((loc) => {
      return loc.locationName.toLowerCase().includes(selectedLocation.locationName.toLowerCase())
    })
    setNewTodo({
      ...newTodo,
      location: tempLoc.id,
    });
  }

  // handles category change
   function handleCategoryChange(event) {
     const tempCat = categories.find((cat) => {
       return cat.categoryName
         .toLowerCase()
         .includes(selectedCategory.categoryName.toLowerCase());
     });
     setNewTodo({
       ...newTodo,
       category: tempCat.id,
     });
   }

  // handles submit of form, posts, clears component state,
  //calls a fetch to update state for page, calls handle modal to close modal after submit
  function handleSubmit(event) {
    event.target.disabled = true; // turn off button while running this
    event.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newTodo),
    };
    fetch(`${import.meta.env.VITE_API_ENDPOINT}todos/`, init)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error! ${response.status}`);
        }
        fetchTodos();
      })
      .then(() => {
        setNewTodo({
          todoName: "",
          category: 0,
          completed: false,
          location: 0,
        });
        handleModal();
      });
    event.target.disabled = false; // turn on button after running
  }

  // to fetch updated todos after submit
  function fetchTodos() {
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
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Enter your New To-do item</h1>
        </div>
        <div className={styles.closeContainer}>
          <button onClick={handleModal} className={styles.closeButton}>
            X
          </button>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.todoEntry}>
        <div className={styles.inputHolder}>
          <label htmlFor="todoName" className={styles.label}>
            Task Name
          </label>
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            name="todoName"
            className={styles.input}
            value={newTodo.todoName}
            required
          />
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="category" className={styles.label}>
            Category
          </label>
          <div className={styles.dropDown}>
            <Combobox value={selectedCategory} onChange={setSelectedCategory}>
              <Combobox.Input
                name="category"
                displayValue={(category) => category.categoryName}
                onChange={(event) => {
                  setCatQuery(event.target.value);
                }}
                onSelect={(e) => handleCategoryChange(e)}
              />
              <Combobox.Options>
                {filteredCategory.map((cat) => (
                  <Combobox.Option
                    key={cat.id}
                    value={cat}
                  >
                    {cat.categoryName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>
        <div className={styles.inputHolder}>
          <label htmlFor="location" className={styles.label}>
            Location
          </label>
          <div className={styles.dropDown}>
            <Combobox value={selectedLocation} onChange={setSelectedLocation}>
              <Combobox.Input
                name="location"
                displayValue={(location) => location.locationName}
                onChange={(event) => {
                  setLocQuery(event.target.value);
                }}
                onSelect={(e) => handleLocationChange(e)}
              />
              <Combobox.Options>
                {filteredlocation.map((loc) => (
                  <Combobox.Option
                    key={loc.id}
                    value={loc}
                  >
                    {loc.locationName}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </Combobox>
          </div>
        </div>
        <div className={styles.submitDiv}>
          <button type="submit">Add Task</button>
        </div>
      </form>
    </div>
  );
}
import * as React from 'react'
import {Link, useParams} from 'react-router-dom'
import styles from '../Components/Category/newCategory.module.css'
export default function Categories(){
  const {userID} = useParams();
  const id = parseInt(userID);
  const [newCategory, setNewCategory] = React.useState({
    name: "",
    userID: id
  })

  // to handle form submission
  async function handleSubmit(e){
    e.preventDefault();
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    };
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/category`, init)
      .then((response) => {
        if(!response.ok){
          throw new Error(`Error! You broke it! ${response.status}`)
        } else {
          setNewCategory({
            name: "",
            userID: id
          })
        }
      })
  }

  // to handle updating newCategory state
  function handleChange(e){
    setNewCategory({
      name: e.target.value,
      userID: id
    })
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.topBar}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Add a new Category</h1>
        </div>
        <div className={styles.closeContainer}>
          <Link to="/">
            <button className={styles.closeButton}>X</button>
          </Link>
        </div>
      </div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.todoEntry}>
        <div className={styles.inputHolder}>
          <label htmlFor="name" className={styles.label}>
            Category Name:
          </label>
          <input
            name="name"
            onChange={(e) => handleChange(e)}
            value={newCategory.name}
            className={styles.input}
          />
        </div>
        <div className={styles.buttonDiv}>
          <button type="submit" className={styles.button}>
            Submit Category
          </button>
        </div>
      </form>
    </section>
  );
}
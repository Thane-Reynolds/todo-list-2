import * as React from 'react'
import styles from '../Components/Location/newLocation.module.css'
import { Link, useParams } from 'react-router-dom';
import Portal from '../Components/Modal/Portal';
import SuccessOrFail from '../Components/Location/SuccessOrFail';

export default function Location(props){
  const { userID } = useParams();
  const id = parseInt(userID)
  const [newLocation, setNewLocation] = React.useState({
    name: "",
    userID: id,
    streetadd: "",
    city: "",
    state: "",
    country: "",
    postal: ""
  });
  const [requestStatus, setRequestStatus] = React.useState()

  console.log("id", id, typeof(id))
 
  // handle submit of form
  async function handleSubmit(e) {
    e.preventDefault();
    const init ={
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLocation)
    }
    await fetch(`${import.meta.env.VITE_API_ENDPOINT}/api/location`, init)
      .then((response) => {
        if (!response.ok) {
          setRequestStatus(false);
          throw new Error(`Error! ${response.status}`);
        } else {
        setNewLocation({
          name: "",
          userID: id,
          streetadd: "",
          city: "",
          state: "",
          country: "",
          postal: "",
        })
      }
    })
    .then(setRequestStatus(true));
    console.log("request status", requestStatus)
  }
  // to set state
  function handleChange(e){
    switch (e.target.name) {
      case 'name':
        setNewLocation({
          ...newLocation,
          name: e.target.value,
        });
        break;
      case 'streetadd':
        setNewLocation({
          ...newLocation,
          streetadd: e.target.value,
        });
        break;
      case 'city':
        setNewLocation({
          ...newLocation,
          city: e.target.value,
        });
        break;
      case 'state':
        setNewLocation({
          ...newLocation,
          state: e.target.value,
        });
        break;
      case 'country':
        setNewLocation({
          ...newLocation,
          country: e.target.value,
        });
        break;
      case 'postal':
        setNewLocation({
          ...newLocation,
          postal: e.target.value,
        });
        break;
      default:
        break;
    }
  }


  return (
    <div>
      {(requestStatus === true || requestStatus === false) && (
        <Portal>
          <SuccessOrFail status={requestStatus} />
        </Portal>
      )}
      <section className={styles.wrapper}>
        <div className={styles.topBar}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Add a new Location</h1>
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
              Location Name:
            </label>
            <input
              name="name"
              onChange={(e) => handleChange(e)}
              value={newLocation.name}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="streetadd" className={styles.label}>
              Street Address:
            </label>
            <input
              name="streetadd"
              onChange={(e) => handleChange(e)}
              value={newLocation.streetadd}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="city" className={styles.label}>
              City:
            </label>
            <input
              name="city"
              onChange={(e) => handleChange(e)}
              value={newLocation.city}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="state" className={styles.label}>
              State (2 letter code):
            </label>
            <input
              name="state"
              onChange={(e) => handleChange(e)}
              value={newLocation.state}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="country" className={styles.label}>
              Country:
            </label>
            <input
              name="country"
              onChange={(e) => handleChange(e)}
              value={newLocation.country}
              className={styles.input}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="postal" className={styles.label}>
              postal:
            </label>
            <input
              name="postal"
              onChange={(e) => handleChange(e)}
              value={newLocation.postal}
              className={styles.input}
            />
          </div>
          <div className={styles.buttonDiv}>
            <button type="submit" className={styles.button}>
              Submit Location
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
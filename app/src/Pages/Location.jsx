import * as React from 'react'
import styles from '../Components/Location/newLocation.module.css'
import { Link } from 'react-router-dom';
import Portal from '../Components/Modal/Portal';
import SuccessOrFail from '../Components/Location/SuccessOrFail';

export default function Location(){
  const [newLocation, setNewLocation] = React.useState({
    locationName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipcode: ""
  });
  const [requestStatus, setRequestStatus] = React.useState('')
 
  // handle submit of form
  function handleSubmit(e) {
    e.preventDefault();
    const init ={
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newLocation)
    }
    fetch(`${import.meta.env.VITE_API_ENDPOINT}locations`, init)
      .then((response) => {
        if (!response.ok) {
          setRequestStatus('false');
          throw new Error(`Error! ${response.status}`);
        } else {
        setNewLocation({
          locationName: "",
          streetAddress: "",
          city: "",
          state: "",
          zipcode: "",
        });
        setRequestStatus("true");
      }
      })
      console.log("request status", requestStatus)
  }
  // to set state
  function handleChange(e){
    switch(e.target.name){
      case "locationName":
        setNewLocation({
          ...newLocation,
          locationName: e.target.value
        })
        break;
      case "streetAddress":
        setNewLocation({
          ...newLocation,
          streetAddress: e.target.value
        })
        break;
      case "city":
        setNewLocation({
          ...newLocation,
          city: e.target.value
        })
        break;
      case "state":
        setNewLocation({
          ...newLocation,
          state: e.target.value
        })
        break;
      case "zipcode":
        setNewLocation({
          ...newLocation,
          zipcode: e.target.value
        })
        break;
      default:
        break;
    }
  }


  return (
    <div>
      {(requestStatus === 'true' || requestStatus === 'false') && (
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
            <button className={styles.closeButton}>
              X
            </button>
          </Link>
          </div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className={styles.todoEntry}>
          <div className={styles.inputHolder}>
            <label htmlFor="locationName" className={styles.label}>
              Location Name:
            </label>
            <input
              name="locationName"
              onChange={(e) => handleChange(e)}
              value={newLocation.locationName}
              className={styles.input}
              />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="streetAddress" className={styles.label}>
              Street Address:
            </label>
            <input
              name="streetAddress"
              onChange={(e) => handleChange(e)}
              value={newLocation.streetAddress}
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
            <label htmlFor="zipcode" className={styles.label}>
              Zipcode:
            </label>
            <input
              name="zipcode"
              onChange={(e) => handleChange(e)}
              value={newLocation.zipcode}
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
import * as React from 'react'
import { Link } from 'react-router-dom'
import styles from './successOrFail.module.css'

export default function SuccessOrFail(status){
  return (
    <div className={styles.wrapper}>
      {status === 'true' && (
        <div className={styles.topBar}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Added a new Location</h1>
          </div>
          <div className={styles.closeContainer}>
            <Link to="/">
              <button className={styles.return}>
                Click here to return to Todos
              </button>
            </Link>
          </div>
        </div>
      )}
      {status === 'false' && (
        <div className={styles.topBar}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Failed to a new Location</h1>
          </div>
          <div className={styles.closeContainer}>
            <Link to="/location">
              <button className={styles.return}>
                Click here to try again
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
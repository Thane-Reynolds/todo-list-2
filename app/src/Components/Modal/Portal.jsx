import * as React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Portal ({ children }){
  const modalEl = document.getElementById('modal');
  const el = document.createElement('div');

  el.classList.add(styles.modalContainer);
 
  
  React.useEffect(() => {
    modalEl.appendChild(el);

    return () => {
      modalEl.removeChild(el);
    }
  }, [el, modalEl]);

  return createPortal(children, el)
 ;
}


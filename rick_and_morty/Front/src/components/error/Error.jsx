import React from 'react';
import s from './Error.module.css';

export default function Error() {
  return (
    <div className={s.divError}>
        <h1 className={s.title}>Error 404</h1>
        <h2 className={s.title}>La Pagina No Existe!</h2>
    </div>
  )
}

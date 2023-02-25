import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import s from './Detail.module.css';

export default function Detail() {
    
    
    const [character, setCharacter]= useState({});
    

    const {detailId} = useParams();
    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/${detailId}`)
          .then((response) => response.json())
          .then((char) => {
            if (char.name) {
              setCharacter(char);
            } else {
              window.alert("No hay personajes con ese ID");
            }
          })
          .catch((err) => {
            window.alert("No hay personajes con ese ID");
          });
        return setCharacter({});
      }, [detailId]);

  return (
    
    <div className={s.container}>
     
      <img className={s.image} src={character.image} alt='imagen not found' />        
        
    <div >
    <h1 className={s.title}>{character.name}</h1> 
       <h2 className={s.detail}>{character.status}
         {character.specie}</h2>
         <h2 className={s.detail}>{character.gender}</h2>
         <h2 className={s.detail}>{character.origin?.name}</h2>
         <h2 className={s.detail}>{character.location?.name}</h2>
      </div>
      
    <Link to='/home'><button className={s.button}>Volver</button></Link>
    </div>
        
        
         
   
  )
}

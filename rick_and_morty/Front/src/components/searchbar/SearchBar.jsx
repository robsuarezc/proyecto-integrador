import { useState } from 'react'

import s from './SearchBar.module.css'

export default function SearchBar(props) {
   const { onSearch } =props;
   const [character, setCharacter] = useState(" "); 
   const handleChange = (e) => {
      setCharacter(e.target.value);
   }; 

   
   return (
      <div >
         <input type="search" placeholder= "Buscar" value={character} onChange={handleChange} className={s.input}/>
      <button onClick={()=> onSearch(character)} className={s.button}>Agregar</button> 
      </div>
   );
}

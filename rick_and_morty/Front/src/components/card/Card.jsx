import s from './card.module.css';
import { Link } from 'react-router-dom';

export default function Card(props) {
   return (
      
      <div className={s.div}> 
      <button onClick={()=>props.onClose()} className={s.close}>X</button>   
      <img className={s.imgRedonda} src={props.image} alt=" " />
      
      
       <Link to={`/detail/${props.id}`}>
         <h2 className={s.name}>{props.name}</h2>
         </Link>
      
        <div  className={s.divH2} >
          <h2 className={s.h2}>{props.species} </h2>
          <h2 className={s.h2}>{props.gender}</h2>
          </div>
      </div>
   );
}

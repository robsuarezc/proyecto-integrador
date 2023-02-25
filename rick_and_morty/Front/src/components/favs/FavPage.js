import React from 'react';
import styles from './favs.module.css';
import Card from '../card/Card';
import { connect } from 'react-redux';
import { changeFavsRedux } from '../../redux/charsDuck';
import Swal from 'sweetalert2'

const FavPage = ({ FAVS,changeFavsRedux }) => {

const erase = () => {
  if(FAVS && FAVS.characters && FAVS.characters.favorites){
    Swal.fire({
      title: 'Vas a borrar a todos tus favoritos, ¿estas seguro?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('se borraron todos!', '', 'success')

        let arrRedux = FAVS.characters.favorites
        let filtrado = arrRedux.filter(point => point.length === 0)
        changeFavsRedux(filtrado)

      } else if (result.isDenied) {
        Swal.fire('bien pensado!', '', 'info')
      }
    })
  }
}
    return (
      <>
      {FAVS.characters.favorites.length > 0 ? (

        <div className={styles.container}>
            <h2>Favoritos</h2>
            <div className={styles.cardContent}>
              {FAVS.characters.favorites.map((point,i) => {
                return (
                  <Card
                    name={point.name}
                    image={point.image}
                    hide
                    key={i} />
                )
              })}
            </div>
            <button className={styles.buttonDelete} onClick={erase}> borrar todo </button>
        </div>
      ):(
        <div className={styles.container}>
            <h2>No hay personajes agregados</h2>
        </div>
      )}
      </>
    )
}

const mapStateToProps = (state) =>{
  return {
    FAVS: state
  }
}

export default connect(mapStateToProps,{ changeFavsRedux })(FavPage);

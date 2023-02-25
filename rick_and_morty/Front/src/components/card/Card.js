import React from 'react';
import styles from './card.module.css';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { db } from '../../firebase';
import { changeFavsRedux } from '../../redux/charsDuck';
import 'firebase/firestore';
import Swal from 'sweetalert2';
import loading from '../../assets/images/spinner.gif'

let rick = "https://rickandmortyapi.com/api/character/avatar/1.jpeg";

function onClick(side) {
    return () => console.log(side)
}

const Card = ({ name, image, rightClick, leftClick, hide, FAVS, changeFavsRedux,CHARS }) => {

  let idUser = JSON.parse(localStorage.getItem('user'))

  const deleteFav = (name) => {

    if(idUser && idUser.user && idUser.user.id){
      var uid = idUser.user.id
      db.doc(uid).get()
      .then(snap => {
        let arr = snap.data().array
        for(let i = 0; i < arr.length; i++){
          for(let j = 0; j < FAVS.length; j++){
            if(arr[i].name === name && FAVS[i].name === name){
              Swal.fire({
                title: '¿Estas seguro que lo queres borrar?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
              }).then((result) => {
           
                if (result.isConfirmed) {
                  Swal.fire('borrado!', '', 'success')

                  let newFav = FAVS.filter(point => point.name !== name)
                  db.doc(uid).update({
                    array: newFav
                  })
                  changeFavsRedux(newFav)

                } else if (result.isDenied) {
                  Swal.fire('bien pensado!', '', 'info')
                }
              })
            }
          }
        }
      })
    }
  }

    return (
      <>
      {CHARS && CHARS.loadingChars ? (
        <>
        {!hide && <>
          <p className={styles.number}>Pagina:{CHARS.nextPage - 1}</p>
          <p className={styles.number}>Personaje nº: {CHARS.array.length}</p>
        </>}
        <div className={styles.container}>
            <div className={styles.card}>
                {hide && <button className={styles.deleteOne} onClick={()=> deleteFav(name)}>x</button>}
                <img alt="character" src={image} />
                <p className={styles.name}>
                    {name}
                </p>
            {!hide && <div className={styles.actions}>
                <div
                    onClick={leftClick || onClick("left")}
                    className={styles.left}>
                    <FontAwesome
                        name="thumbs-down"
                        size="2x"
                    />
                </div>
                <div
                    onClick={rightClick || onClick("right")}
                    className={styles.right}>
                    <FontAwesome
                        name="heart"
                        size="2x"
                    />
                </div>
            </div>}
            </div>
        </div>
        </>
      ): (
        <img src={loading} alt="loading..."/>
      )}
      </>
    )
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    leftClick: PropTypes.func,
    rightClick: PropTypes.func,
}

Card.defaultProps = {
    name: "Rick Sanches",
    image: rick,
}

const mapStateToProps = (state) => {
  return {
    FAVS: state.characters.favorites,
    CHARS: state.characters
  }
}

export default connect(mapStateToProps,{changeFavsRedux})(Card);

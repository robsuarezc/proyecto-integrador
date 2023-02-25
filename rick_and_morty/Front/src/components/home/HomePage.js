import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacter,addToFavorites  } from '../../redux/charsDuck.js'

const Home = ({ CHARACTERS, removeCharacter,addToFavorites }) => {

    function nextChar() {
      removeCharacter()
    }

    const addFav = () => {
      addToFavorites()
    }

    function renderCharacter() {
        let char = CHARACTERS[0]
        return (
            <Card rightClick={addFav} leftClick={nextChar} {...char} />
        )
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
  return {
    CHARACTERS: state.characters.array
  }
}

export default connect(mapStateToProps,{ removeCharacter,addToFavorites })(Home);

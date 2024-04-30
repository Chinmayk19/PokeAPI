import React from 'react'
import styles from "./style.module.css"

const pokemonDetails = (props) => {
  // const colors=[
  //  "#f8d5a3",
  //  "#f5b7b1",
  //  "#c39bd3",
  //  "#aed6f1",
  //  "#f9e79f"
  // ]
  // const randomcolor=colors[Math.floor(Math.random()*colors.length)];
  // console.log(randomcolor);
  return (
    <div className={styles.pokemonDetails_Card} >
        <div className={styles.poke_Img}>
            <img src={props.image} alt={`${props.name}.img`} />
            <h5>{props.name}</h5>
        </div>
        <div className={styles.About_Pokemon}>
            <p>Abilities: {props.abilities}</p>
            <p>Weight: {props.weight}</p>
            <p>Height: {props.height}</p>
            <p>Experience: {props.experience}</p>
            <p>Moves: {props.moves}</p>
        </div>

    </div>
  )
}

export default pokemonDetails
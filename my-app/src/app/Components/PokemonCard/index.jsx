"use client"
import React from 'react';
import style from "./style.module.css";
import Link from 'next/link';

const PokemonCard = (props) => {
  // Slice the abilities array to contain only the first two abilities
  const abilities = props.abilities.slice(0, 2);
  const name={
    name:props.name,
    id:props.index,
  }

  return (
    <>
    <Link href={{
      pathname:"/Pokemon",
      query:{name:JSON.stringify(name)}
    }}>
    <div className={style.Card} key={props.index}>
      <div className={style.Pokemon_Details}>
        <img src={props.image} alt={props.name}  />
        <p>{props.name}</p>
      </div>
      <div className={style.Pokemon_Ability}>
        <h5>Abilities</h5>
        <div className={style.Abilities}>
          {abilities.map((ability, index) => (
            <p key={index}>{ability}</p>
          ))}
        </div>
      </div>
    </div>
    </Link>
    </>
  );
};

export default PokemonCard;

"use client"
import { useParams } from "next/navigation";
// import styles from "./style.module.css";
import { useEffect, useState } from "react";
import PokemonDetails from "@/app/Components/PokemonDetails";

const Page = () => {
  const params = useParams();
  const {name} =params ;

  useEffect(() => {
    if (name) {
      fetchPokemon();
    }
  }, []); 

  const [pokemonDetails, setPokemonDetails] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      console.log(data);
      const firstFiveMoves = data.moves.slice(0, 5).map(move => move.move.name);
      const image=data.sprites.other.home.front_shiny;
      const abilities=data.abilities.map(poke => poke.ability.name).join(", ")
      setPokemonDetails({ ...data, moves: firstFiveMoves,image:image ,abilities:abilities}); 
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }
  };

  return (
    <div>
      {pokemonDetails && (
        <>
          <PokemonDetails  name={pokemonDetails.name} abilities={pokemonDetails.abilities} image={pokemonDetails.image}
          weight={pokemonDetails.weight} height={pokemonDetails.height} experience={pokemonDetails.base_experience} moves={pokemonDetails.moves.join(", ")}/>
        </>
      )}
    </div>
  );
};

export default Page;

"use client"
import React, { createContext, useEffect, useMemo, useState } from "react";

export const PokemonContext = createContext(null);

const PokemonContextProvider = (props) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?")
      .then((resp) => resp.json())
      .then((data) => setPokemon(data.results));
  }, []);
  // Memoize context value
  const contextValue = useMemo(() => ({ pokemon }), [pokemon]);

  return (
    <PokemonContext.Provider value={contextValue}>
      {props.children}
    </PokemonContext.Provider>
  );
};

export default PokemonContextProvider;

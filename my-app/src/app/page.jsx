"use client"
import React, { useEffect, useState } from 'react';
import "./globals.css"
import styles from "./style.module.css"
import PokemonCard from './Components/PokemonCard';

const Page = () => {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPokemons();
    }, []); 
  
    useEffect(() => {
      const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 100) {
          fetchMorePokemons();
        }
      };
    
      window.addEventListener('scroll', handleScroll);
    
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [page]);
    
  
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            return {
              name: pokemon.name,
              image: detailsData.sprites.other.home.front_shiny,
              abilities: detailsData.abilities.map(ability => ability.ability.name)
            };
          }));
        setPokemon(prevPokemon => [...prevPokemon, ...pokemonDetails.filter(newPokemon => !prevPokemon.some(oldPokemon => oldPokemon.name === newPokemon.name))]);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const fetchMorePokemons = async () => {
      if (loading) return;
      setLoading(true);
  
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`);
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(async (pokemon) => {
            const detailsResponse = await fetch(pokemon.url);
            const detailsData = await detailsResponse.json();
            return {
              name: pokemon.name,
              image: detailsData.sprites.other.home.front_shiny,
              abilities: detailsData.abilities.map(ability => ability.ability.name)
            };
          }));
        setPokemon(prevPokemon => [...prevPokemon, ...pokemonDetails.filter(newPokemon => !prevPokemon.some(oldPokemon => oldPokemon.name === newPokemon.name))]);
        setPage(page + 1);
      } catch (error) {
        console.error('Error fetching more pokemons:', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
      <h4 className={styles.heading}>Pokemons</h4>
      <div className={styles.Card_Container}>
        {pokemon.map((poke, index) => (
          <PokemonCard key={index} name={poke.name} image={poke.image} index={index} abilities={poke.abilities}/>
        ))}
      </div>
        {loading && <div style={{textAlign:"center"}}>Loading....</div>}
      </div>
    );
};

export default Page;
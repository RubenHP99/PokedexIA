import React, { use, useEffect } from 'react';
import BackButton from './BackButton';
import { Link } from 'react-router-dom';

export default function PokemonList(){

  const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: -20}}>
          <BackButton />
          <h2 style={{ margin: 0 }}>Lista Pokémon</h2>
      </div>
      
      <div className='container'>
        <ul className="pokemon-list">

          {Object.keys(pokemonList).map((key) => {
            const pokemon = pokemonList[key];
            
            const handleClick = (e) => {
              if (!pokemon.detected) {
                e.preventDefault();
              }
            };
            
            return (
              <li key={key} className="pokemon-list-item">
                <Link to={`/pokemonInfo`} 
                  state={{ pokemonData: pokemon }}
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={handleClick}
                  >
                  <img src={pokemon.sprite} style={{ width: 90, height: 90 }} />
                  <p style={{fontSize: 20}}>#{key} {pokemon.name}</p>
                </Link>
              </li>
            );
          })}
          
        </ul>
      </div>
    </div>
  );

};
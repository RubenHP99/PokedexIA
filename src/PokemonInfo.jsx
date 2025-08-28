import React, { useState, useEffect } from 'react';
import BackButton from './BackButton.jsx';
import { useLocation } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

const POKEMON_TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
};

export default function PokemonInfo() {

  const location = useLocation();
  const pokemon = location.state?.pokemonData;

  const type1Color = POKEMON_TYPE_COLORS[pokemon.types[0].type.name];
  const type2Color = pokemon.types.length > 1 ? POKEMON_TYPE_COLORS[pokemon.types[1].type.name] : type1Color;
  
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  function getDescription() {
    alert("DESCRIPCION")
  }


  return (
    <div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: -20}}>
          <BackButton />
          <h2 style={{ margin: 0 }}>{pokemon.name} #{pokemon.id}</h2>
      </div>
    
      <div className='container'>
        <div style={{
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${type1Color}, ${type2Color})`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '2rem',
          boxShadow: `0 0 15px ${type1Color}80`
        }}>
          <img 
            src={pokemon.animatedSprite} 
            style={{ 
              width: 150,
              height: 150,
              objectFit: 'contain',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              borderRadius: '50%',
              padding: 10
            }} 
          />
        </div>

        <button className='pixelMenuButton' onClick={getDescription}> Descripción </button>

        <p style={{fontSize: '2rem'}}>TIPO: {JSON.stringify(pokemon.types.map(typeObject => typeObject.type.name))}</p>
        <hr width={"80%"}/>

        <p style={{fontSize: '2rem'}}>HABILIDADES: {JSON.stringify(pokemon.abilities.map(abilityObject => abilityObject.ability.name))}</p>
        <hr width={"80%"}/>

        <p style={{fontSize: '2rem'}}>ESTADÍSTICAS</p>
        <div style={{ width: '17rem', height: '17rem', padding: '0.5rem', marginTop: '-2rem'}}>
          <Radar 
            data={{
              labels: Object.keys(pokemon.stats),
              datasets: [
                {
                  data: Object.values(pokemon.stats),
                  backgroundColor: pokemon.types.length > 1
                    ? POKEMON_TYPE_COLORS[pokemon.types[1].type.name] + '80'
                    : POKEMON_TYPE_COLORS[pokemon.types[0].type.name] + '80',                  
                  borderColor: POKEMON_TYPE_COLORS[pokemon.types[0].type.name],
                  borderWidth: 5,
                },
              ],
            }}
            options={{
              scales: {
                r: {
                  beginAtZero: true,
                  pointLabels: {
                    color: 'black',
                    font: {
                      size: 15,
                      family: 'Pixel'
                    },
                  },
                  ticks: {
                    color: 'black',
                    font: {
                      size: 15, 
                      family: 'Pixel'
                    },
                    backdropColor: 'rgba(255, 255, 255, 0)'
                  }
                },
              },
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>

        <hr width={"80%"}/>
        <p style={{fontSize: '2rem'}}>MOVIMIENTOS</p>

        <div style={{overflowX: 'auto', width: '100%', marginTop: '-2rem'}}>
          <table style={{margin: '1rem', border: '2px solid black', borderCollapse: 'collapse'}}>
            <thead style={{ backgroundColor: '#222', color: 'white', border: '2px solid black' }}>
              <tr>
                <th style={{ padding: '10px', textAlign: 'left', width: '25%'}}>Movimiento</th>
                <th style={{ padding: '10px', textAlign: 'left', width: '25%' }}>Forma</th>
                <th style={{ padding: '10px', textAlign: 'left', width: '25%' }}>Nivel</th>
                <th style={{ padding: '10px', textAlign: 'left', width: '25%' }}>Versión</th>
              </tr>
            </thead>
            <tbody>
              {/* Aquí se usa el map anidado para rellenar la tabla con los datos del JSON */}
              {pokemon.moves && pokemon.moves.map((move, index) => {
                return move.details.map((detail, detailIndex) => (
                  <tr key={`${index}-${detailIndex}`} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white', border: '1px solid black' }}>
                    <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{move.moveName.replace(/-/g, ' ')}</td>
                    <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{detail.learnMethod.replace(/-/g, ' ')}</td>
                    <td style={{ padding: '10px', borderRight: '1px solid #ddd' }}>{detail.levelLearnedAt !== 0 ? detail.levelLearnedAt : '-'}</td>
                    <td style={{ padding: '10px' }}>{detail.versionGroup.replace(/-/g, ' ')}</td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  
  );
}
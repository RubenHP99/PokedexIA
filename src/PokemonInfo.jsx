import React, { useState, useEffect } from 'react';
import BackButton from './BackButton.jsx';
import { useLocation } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from 'sweetalert2';

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
  fairy: '#CFB7C5',
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

  const type1Color = POKEMON_TYPE_COLORS[pokemon.types[0].name];
  const type2Color = pokemon.types.length > 1 ? POKEMON_TYPE_COLORS[pokemon.types[1].name] : type1Color;
  
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


  function speakText(textToSpeak) {
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    utterance.rate = 1.5;
    utterance.pitch = 1.5;
    utterance.lang = 'es-ES';

    window.speechSynthesis.speak(utterance);
  }


  async function geminiAPIRequest(){

    try {
        const genAI = new GoogleGenerativeAI("AIzaSyB1C0tFYY54MSv_l41vKYB9xl5DZSWuZk0");
        const model = genAI.getGenerativeModel({ model: "gemma-3-27b-it" });

        const prompt = `Dame la descripción de la pokedex del pokemon ${pokemon.name} en español del juego pokemon esmeralda.\
        Solo quiero la descripción de la pokedex, nada más.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        
        speakText(text);
        
        Swal.fire({
            text: text,
            confirmButtonText: 'Aceptar',
                customClass: {
                popup: 'alertPopup',
                confirmButton: 'alertConfirmButton',
                }
        }); 


    } catch (err) {
      console.error("Error al conectar con la API de Gemini:", err);
      alert(err.message);
    } finally {
    }
  };


  return (
    <div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: -20}}>
          <BackButton/>
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

        <button className='pixelMenuButton' onClick={geminiAPIRequest}> Descripción IA </button>

        <p style={{fontSize: '2rem', marginBottom: 0}}>TIPO/S</p>

        <div>
          {pokemon.types.map((type, index) => (
            <div key={index}>
              <img src={type.sprite.name_icon}  style={{width: '10rem', marginTop: '1rem'}}/>
            </div>
          ))}
        </div>

        <hr width={"80%"} style={{marginTop: '2rem'}}/>

        <p style={{fontSize: '2rem', marginBottom: 0}}>HABILIDADES</p>
        <div style={{fontSize: '1.5rem'}}>
          {JSON.stringify(pokemon.abilities.map(abilityObject => abilityObject.ability.name))}
        </div>
        <hr width={"80%"} style={{marginTop: '2rem'}}/>

        <p style={{fontSize: '2rem', marginBottom: 0}}>ESTADÍSTICAS</p>
        <div style={{ width: '17rem', height: '17rem', padding: '0.5rem'}}>
          <Radar 
            data={{
              labels: Object.keys(pokemon.stats),
              datasets: [
                {
                  data: Object.values(pokemon.stats),
                  backgroundColor: type2Color + '80',                  
                  borderColor: type1Color,
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

        <hr width={"80%"} style={{marginTop: '2rem'}}/>
        <p style={{fontSize: '2rem', marginBottom: 0}}>MOVIMIENTOS</p>

        <div style={{overflowX: 'auto', width: '100%'}}>
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
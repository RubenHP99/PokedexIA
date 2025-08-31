import React, { useRef, useState, useEffect, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import Swal from 'sweetalert2'
import BackButton from './BackButton.jsx';
import { ModelContext } from './App.jsx';


const pokemonDict = {0: 'Abra', 1: 'Aerodactyl', 2: 'Alakazam', 3: 'Arbok', 4: 'Arcanine', 5: 'Articuno', 6: 'Beedrill', 7: 'Bellsprout', 8: 'Blastoise', 9: 'Bulbasaur', 10: 'Butterfree', 11: 'Caterpie', 12: 'Chansey', 13: 'Charizard', 14: 'Charmander', 15: 'Charmeleon', 16: 'Clefable', 17: 'Clefairy', 18: 'Cloyster', 19: 'Cubone', 20: 'Dewgong', 21: 'Diglett', 22: 'Ditto', 23: 'Dodrio', 24: 'Doduo', 25: 'Dragonair', 26: 'Dragonite', 27: 'Dratini', 28: 'Drowzee', 29: 'Dugtrio', 30: 'Eevee', 31: 'Ekans', 32: 'Electabuzz', 33: 'Electrode', 34: 'Exeggcute', 35: 'Exeggutor', 36: 'Farfetchd', 37: 'Fearow', 38: 'Flareon', 39: 'Gastly', 40: 'Gengar', 41: 'Geodude', 42: 'Gloom', 43: 'Golbat', 44: 'Goldeen', 45: 'Golduck', 46: 'Graveler', 47: 'Grimer', 48: 'Growlithe', 49: 'Gyarados', 50: 'Haunter', 51: 'Hitmonchan', 52: 'Hitmonlee', 53: 'Horsea', 54: 'Hypno', 55: 'Ivysaur', 56: 'Jigglypuff', 57: 'Jolteon', 58: 'Jynx', 59: 'Kabutops', 60: 'Kadabra', 61: 'Kakuna', 62: 'Kangaskhan', 63: 'Kingler', 64: 'Koffing', 65: 'Lapras', 66: 'Lickitung', 67: 'Machamp', 68: 'Machoke', 69: 'Machop', 70: 'Magikarp', 71: 'Magmar', 72: 'Magnemite', 73: 'Magneton', 74: 'Mankey', 75: 'Marowak', 76: 'Meowth', 77: 'Metapod', 78: 'Mew', 79: 'Mewtwo', 80: 'Moltres', 81: 'Mr. Mime', 82: 'MrMime', 83: 'Nidoking', 84: 'Nidoqueen', 85: 'Nidorina', 86: 'Nidorino', 87: 'Ninetales', 88: 'Oddish', 89: 'Omanyte', 90: 'Omastar', 91: 'Parasect', 92: 'Pidgeot', 93: 'Pidgeotto', 94: 'Pidgey', 95: 'Pikachu', 96: 'Pinsir', 97: 'Poliwag', 98: 'Poliwhirl', 99: 'Poliwrath', 100: 'Ponyta', 101: 'Porygon', 102: 'Primeape', 103: 'Psyduck', 104: 'Raichu', 105: 'Rapidash', 106: 'Raticate', 107: 'Rattata', 108: 'Rhydon', 109: 'Rhyhorn', 110: 'Sandshrew', 111: 'Sandslash', 112: 'Scyther', 113: 'Seadra', 114: 'Seaking', 115: 'Seel', 116: 'Shellder', 117: 'Slowbro', 118: 'Slowpoke', 119: 'Snorlax', 120: 'Spearow', 121: 'Squirtle', 122: 'Starmie', 123: 'Staryu', 124: 'Tangela', 125: 'Tauros', 126: 'Tentacool', 127: 'Tentacruel', 128: 'Vaporeon', 129: 'Venomoth', 130: 'Venonat', 131: 'Venusaur', 132: 'Victreebel', 133: 'Vileplume', 134: 'Voltorb', 135: 'Vulpix', 136: 'Wartortle', 137: 'Weedle', 138: 'Weepinbell', 139: 'Weezing', 140: 'Wigglytuff', 141: 'Zapdos', 142: 'Zubat'}


export default function DetectPokemon() {

  const model = useContext(ModelContext)

  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [photoVisible, setPhotoVisible] = useState(false);

  useEffect(() => {
    startCamera();

    // Parar la camara de forma ordenada al desmontar el componente
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        console.log('Deteniendo la cámara...');
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);


  // Convertir la imagen a formato valido para el modelo
  const imageToTensor = async (imageElement) => {
    const tensor = tf.browser.fromPixels(imageElement);
    const resized = tf.image.resizeBilinear(tensor, [640, 640]);
    const normalized = resized.div(255.0);
    const expanded = normalized.expandDims(0);
    return expanded;
  };


  async function getPokemonAPITypes(urls) {
    try {
      const fetchPromises = urls.map(url => fetch(url));
      const responses = await Promise.all(fetchPromises);

      for (const response of responses) {
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status} en la URL: ${response.url}`);
        }
      }

      const dataPromises = responses.map(response => response.json());
      const data = await Promise.all(dataPromises);

      const spriteTypes = data.map(type => {
        return {'name': type.name, 'sprite': type.sprites['generation-viii']['sword-shield']};
      });

      return spriteTypes;

    } catch (error) {
      console.error("Fallo al obtener los datos de una o más URLs:", error);
      return null;
    }
  }


  async function runInference(){

    if (!model) {
      console.error('El modelo no está cargado.');
      return;
    }

    if (!videoRef.current) {
      console.error('El elemento de video no está disponible.');
      return;
    }

    try {

      const inputTensor = await imageToTensor(videoRef.current);
      const predictions = model.predict(inputTensor);

      const predictionData = await predictions.array();

      const max = Math.max(...predictionData[0]);
      const index = predictionData[0].indexOf(max);
      const pokemonName = pokemonDict[index];
      const prob = (max * 100).toFixed(2);

      var alertText = `No se ha detectado ningún Pokémon con una precisión suficiente.`;
      var alertImage = 'question.png';

      if (prob > 98){
        
        // Conectarse a pokeAPI y obtener los datos del Pokémon
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
          if (response.ok) {
            const data = await response.json();

            const sprite = data.sprites.other.home.front_default;
            const animatedSprite = data.sprites.versions['generation-v']['black-white'].animated.front_default;
            const pokedexNumber = data.id;

            const stats = {};
            data.stats.forEach(stat => {  
              if (stat.stat.name === 'special-attack') {
                stats['s-attack'] = stat.base_stat;
              } else if (stat.stat.name === 'special-defense') {
                stats['s-defense'] = stat.base_stat;
              }else{
                stats[stat.stat.name] = stat.base_stat;
              }
            });

            // Obtener el nombre del movimiento, forma de obtención y generación
            const AllMoves = data.moves.map(move => {
              const details = move.version_group_details.map(detail => ({
                levelLearnedAt: detail.level_learned_at,
                learnMethod: detail.move_learn_method.name,
                versionGroup: detail.version_group.name,
              }));
          
              return {
                moveName: move.move.name,
                details: details,
              };
            });

            const moves = AllMoves.map(move => {
                  // Filtrar los movimientos por la condición
                  const filteredDetails = move.details.filter(detail =>
                      detail.learnMethod === 'level-up' && detail.versionGroup === 'emerald'
                  );
                  
                  // Si no cumple la condición, details = vacio
                  return {
                      ...move,
                      details: filteredDetails
                  };
              }).filter(move => move.details.length > 0)
              .sort((a, b) => a.details[0].levelLearnedAt - b.details[0].levelLearnedAt);


            alertText = `Has detectado a un <u>${pokemonName}</u> #${pokedexNumber} con un <u>${prob}%</u> de precisión.`;
            alertImage = sprite || 'question.png';

            const typeURLs = data.types.map(typeObject => typeObject.type.url);
            const types = await getPokemonAPITypes(typeURLs);

            const pokemonInfo = {
              id: pokedexNumber,
              detected: true,
              name: pokemonName,
              sprite: sprite,
              animatedSprite: animatedSprite,
              abilities: data.abilities,
              types: types,
              stats: stats,
              moves: moves
            };

            addInfoToPokemonList(pokemonInfo);
  
          } else {
            console.warn('No se encontró el Pokémon en PokeAPI.');
          }
        } catch (err) {
          console.error('Error al conectar con PokeAPI:', err);
        }
      }

      Swal.fire({
        html: alertText,
        imageUrl: alertImage,
        imageWidth: 200,
        customClass: {
          popup: 'alertPopup',
          confirmButton: 'alertConfirmButton',
        }
      });
      
      // Liberar recursos de los tensores
      inputTensor.dispose();
      predictions.dispose();
    } catch (error) {
      console.error('Error durante la inferencia:', error);
    }
  };

  function addInfoToPokemonList(pokemonInfo) {
    const pokemonList = JSON.parse(localStorage.getItem('pokemonList'));
    pokemonList[pokemonInfo.id] = pokemonInfo;
    localStorage.setItem('pokemonList', JSON.stringify(pokemonList));
  }

  const startCamera = async () => {
    console.log('Intentando activar la cámara...');
    const constraints = {
      audio: false,
      video: { facingMode: "environment", width: 360, height: 300 }
    };

    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        console.log('Cámara activada correctamente.');
      }
    }).catch(error => {
      console.error('Error al acceder a la cámara:', error);
    });
  };


  return (
    <>
      <div className="camera-container-wrapper">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: -100}}>
              <BackButton />
              <h2 style={{ margin: 0 }}>Escanear</h2>
          </div>

        <video
          ref={videoRef}
          autoPlay
          className={`camera-video ${photoVisible ? 'hidden' : 'block'}`}
        />
        <canvas
          ref={photoRef}
          className={`camera-photo ${photoVisible ? 'block' : 'hidden'}`}
        ></canvas>

        <button className='pixelMenuButton' onClick={runInference} disabled={model === null}>
          <img src='camera.svg'/>
          Identificar con IA
        </button>
      </div>
    </>
  );
}
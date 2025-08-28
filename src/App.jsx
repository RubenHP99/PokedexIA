import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import './index.css'
import MainMenu from './MainMenu.jsx'
import DetectPokemon from './DetectPokemon.jsx';
import PokemonList from './PokemonList.jsx';
import Configuration from './Configuration.jsx';
import PokemonInfo from './PokemonInfo.jsx';

export const ModelContext = createContext(null);

export default function App() {

  const [model, setModel] = useState(null);

  const modelJsonPath = '/webModel/model.json';

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadGraphModel(modelJsonPath);
        setModel(loadedModel);
      } catch (error) {
        console.error('Error al cargar el modelo:', error);
      } 
    };
    loadModel();

    return () => {
      if (model) {
        console.log('Modelo de TensorFlow.js liberado de la memoria.');
        model.dispose();
      }
    };

  }, []);


  return(
    <ModelContext.Provider value={model}>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/detectPokemon" element={<DetectPokemon />} />
        <Route path="/pokemonList" element={<PokemonList />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/pokemonInfo" element={<PokemonInfo />} />
      </Routes>
    </ModelContext.Provider>
  );
}


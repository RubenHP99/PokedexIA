import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();

  // Inicializar el localStorage para la lista de Pokémon
  if (!localStorage.getItem('pokemonList')) {
    localStorage.setItem('pokemonList', JSON.stringify({
    "1": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "2": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "3": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "4": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "5": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "6": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "7": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "8": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "9": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "10": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "11": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "12": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "13": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "14": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "15": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "16": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "17": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "18": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "19": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "20": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "21": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "22": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "23": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "24": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "25": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "26": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "27": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "28": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "29": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "30": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "31": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "32": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "33": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "34": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "35": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "36": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "37": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "38": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "39": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "40": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "41": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "42": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "43": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "44": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "45": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "46": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "47": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "48": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "49": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "50": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "51": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "52": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "53": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "54": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "55": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "56": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "57": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "58": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "59": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "60": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "61": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "62": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "63": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "64": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "65": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "66": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "67": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "68": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "69": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "70": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "71": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "72": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "73": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "74": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "75": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "76": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "77": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "78": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "79": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "80": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "81": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "82": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "83": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "84": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "85": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "86": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "87": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "88": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "89": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "90": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "91": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "92": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "93": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "94": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "95": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "96": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "97": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "98": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "99": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "100": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "101": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "102": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "103": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "104": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "105": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "106": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "107": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "108": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "109": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "110": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "111": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "112": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "113": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "114": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "115": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "116": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "117": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "118": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "119": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "120": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "121": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "122": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "123": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "124": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "125": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "126": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "127": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "128": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "129": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "130": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "131": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "132": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "133": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "134": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "135": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "136": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "137": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "138": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "139": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "140": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "141": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "142": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "143": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "144": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "145": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "146": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "147": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "148": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "149": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "150": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    },
    "151": {
      "name": "????",
      "sprite": "question.png",
      "detected": false
    }
    }));
  }

  return (
    <div>
      <h1>Pokédex IA</h1>
    
      <div className="container">

        <button className='pixelMenuButton' onClick={() => navigate('/pokemonList')}>
          <img src='list.svg' />
          Lista de Pokémon
        </button>

        <button className='pixelMenuButton' onClick={() => navigate('/detectPokemon')}>
          <img src='camera.svg' />
          Escanear Pokémon
        </button>

        <button className='pixelMenuButton' onClick={() => navigate('/configuration')}>
          <img src='config.svg' />
          Configuración
        </button>

      </div>
        
    </div>
  
  );
}
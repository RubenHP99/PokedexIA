import React from 'react';
import BackButton from './BackButton.jsx';
import Swal from 'sweetalert2';

export default function Configuration() {

  // Función para borrar los datos del localStorage
  const clearData = () => {
    localStorage.removeItem('pokemonList');
    console.log('Datos de Pokémon borrados del localStorage.');

    Swal.fire({
        icon: 'success',
        text: 'La lista de Pokémon ha sido eliminada.',
        confirmButtonText: 'Aceptar',
            customClass: {
            popup: 'alertPopup',
            confirmButton: 'alertConfirmButton',
            }
    }); 


  };

  // Función para activar/desactivar la pantalla completa
  const toggleFullscreen = () => {
    // Si la pantalla ya está en modo completo, salimos de él
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      // Si no, entramos en modo completo
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error al intentar activar la pantalla completa: ${err.message}`);
      });
    }
  };

  return (
    <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
            <BackButton />
            <h2 style={{ margin: 0 }}>Configuración</h2>
        </div>

        <div className='container'>
            <button className="pixelMenuButton" onClick={toggleFullscreen}>
            Pantalla Completa
            </button>

            <button className="pixelMenuButton" onClick={clearData}>
            Borrar Datos
            </button>
        </div>

    </div>
  );
}
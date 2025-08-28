import React, { useEffect, useState, useRef } from 'react';

// Componente PokedexTransition
// Este componente muestra una animación de "apertura de Pokedex"
// y luego revela un contenido fijo integrado en el mismo.
export default function PokedexTransition() {
    
  // Estado para controlar si la animación de las cortinas está activa
  const [isAnimating, setIsAnimating] = useState(false);
  // Estado para controlar si el contenido principal ya debe ser visible
  const [showContent, setShowContent] = useState(false);

  // Referencias a los elementos de las cortinas para controlar sus clases y eventos
  const topCurtainRef = useRef(null);
  const bottomCurtainRef = useRef(null);

  useEffect(() => {
    // Esta función se ejecuta una vez cuando el componente se monta.
    // Simula el 'DOMContentLoaded' de HTML puro.

    // Pequeño retraso para que las cortinas sean visibles antes de la animación
    const animationStartDelay = 1000; // ms

    // Duración de la animación de las cortinas (debe coincidir con la CSS transition)
    const transitionDuration = 1000; // ms

    const timer = setTimeout(() => {
      setIsAnimating(true); // Activa la animación de las cortinas

      // Una vez que la animación de las cortinas comienza, esperamos a que termine
      // antes de mostrar el contenido principal.
      const transitionTimer = setTimeout(() => {
        setShowContent(true); // El contenido principal se hace visible
        // Opcional: Deshabilita los eventos del ratón en las cortinas
        // para que no interfieran con la interacción del usuario
        if (topCurtainRef.current) {
          topCurtainRef.current.style.pointerEvents = 'none';
        }
        if (bottomCurtainRef.current) {
          bottomCurtainRef.current.style.pointerEvents = 'none';
        }
      }, transitionDuration); // Espera a que la transición CSS de 1.8s termine

      return () => clearTimeout(transitionTimer); // Limpia el timer si el componente se desmonta
    }, animationStartDelay); // Retraso inicial

    return () => clearTimeout(timer); // Limpia el timer principal si el componente se desmonta
  }, []); // El array vacío asegura que este efecto se ejecute solo una vez al montar

  return (
    <div className="pokedex-transition-wrapper">
      {/* Estilos CSS del componente PokedexTransition */}
        <style jsx="true">{`

        @font-face {
            font-family: 'Pixel';
            src: url('/Jersey10-Regular.ttf');
        }

        /* Estilos generales del cuerpo de la página (esto afectará al body global) */
        body {
            font-family: 'Pixel', sans-serif;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            // background-color: #f3f4f6;
            color: #1f2937;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        /* Estilos base para las cortinas (las dos mitades de la Pokedex) */
        .curtain {
            position: fixed;
            left: 0;
            width: 100%;
            height: 50vh;
            transition: transform 1s ease-out, opacity 1s ease-out;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-sizing: border-box;
            border: 8px solid #000; /* Borde negro más grueso */
            background-color: #DC0A2D; /* Rojo clásico de Pokedex */
            border-radius: 0;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        /* Estilo específico para la cortina superior */
        .top-curtain {
            top: 0;
        }

        /* Estilo específico para la cortina inferior */
        .bottom-curtain {
            bottom: 0;
        }

        /* Clases para iniciar la animación de las cortinas */
        .top-curtain.slide-up {
            transform: translateY(-100%);
            opacity: 0;
        }

        .bottom-curtain.slide-down {
            transform: translateY(100%);
            opacity: 0;
        }

        /* Estilos para el "panel" o "pantalla" dentro de las cortinas */
        .curtain-panel {
            background-color: #333;
            color: #fff;
            padding: 1rem 2rem; /* Reducido para móviles */
            border-radius: 0.75rem;
            font-size: 1.8rem; /* Reducido para móviles */
            font-weight: 800;
            text-align: center;
            box-shadow: inset  0 0 15px rgba(0,0,0,0.5);
            // animation: pulse-glow 1.5s infinite alternate;
            border: 3px solid #000;
            max-width: 80%;
            box-sizing: border-box;
        }

        /* Animación de pulsación para el panel */
        @keyframes pulse-glow {
            0% {
                box-shadow: inset 0 0 15px rgba(0,0,0,0.5), 0 0 5px rgba(255,255,255,0.4);
                transform: scale(1);
            }
            100% {
                box-shadow: inset 0 0 25px rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.7);
                transform: scale(1.02);
            }
        }

        /* --- Estilos para los botones y elementos decorativos de Pokedex --- */

        .pokedex-light, .pokedex-speaker-grill, .pokedex-small-round-button {
            position: absolute;
            border: 2px solid #000;
            border-radius: 50%;
            box-sizing: border-box;
        }

        /* Luces pequeñas en la parte superior derecha */
        .pokedex-light {
            width: 15px; /* Más pequeño para móviles */
            height: 15px; /* Más pequeño para móviles */
            top: 15px; /* Ajuste de posición */
        }
        .small-red-light {
            background-color: #FF0000;
            right: 90px; /* Ajuste de posición */
        }
        .small-green-light {
            background-color: #00FF00;
            right: 60px; /* Ajuste de posición */
        }
        .small-blue-light {
            background-color: #0000FF;
            right: 30px; /* Ajuste de posición */
        }

        /* Rejilla de altavoz en la parte superior izquierda */
        .pokedex-speaker-grill {
            width: 25px; /* Más pequeño para móviles */
            height: 25px; /* Más pequeño para móviles */
            background-color: #555;
            top: 15px; /* Ajuste de posición */
            left: 30px; /* Ajuste de posición */
        }

        /* Botones pequeños redondos en la parte inferior (a la derecha) */
        .pokedex-small-round-button {
            width: 30px; /* Más pequeño para móviles */
            height: 30px; /* Más pequeño para móviles */
            bottom: 30px; /* Ajuste de posición */
        }
        .blue-round {
            background-color: #007BFF;
            right: 70px; /* Ajuste de posición */
        }
        .yellow-round {
            background-color: #FFC107;
            right: 30px; /* Ajuste de posición */
        }

        /* --- Estilos para la Pokeball --- */
        .pokeball-container {
            position: absolute;
            bottom: 25px; /* Ajuste de posición */
            left: 50%;
            transform: translateX(-50%);
            width: 60px; /* Más pequeño para móviles */
            height: 60px; /* Más pequeño para móviles */
            border-radius: 50%;
            border: 4px solid #000; /* Borde más delgado para móviles */
            display: flex;
            flex-direction: column;
            overflow: hidden;
            box-shadow: 0 3px 10px rgba(0,0,0,0.3); /* Sombra más suave */
        }

        .pokeball-top-half {
            height: 50%;
            background-color: #DC0A2D;
            border-bottom: 1px solid #000; /* Borde más delgado */
        }

        .pokeball-bottom-half {
            height: 50%;
            background-color: #fff;
            border-top: 1px solid #000; /* Borde más delgado */
        }

        .pokeball-center-button {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px; /* Más pequeño para móviles */
            height: 20px; /* Más pequeño para móviles */
            background-color: #fff;
            border-radius: 50%;
            border: 3px solid #000; /* Borde más delgado */
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: inset 0 0 3px rgba(0,0,0,0.3); /* Sombra más suave */
        }

        /* Estilos para el contenido principal de la página */
        .main-content {
            opacity: 0;
            transition: opacity 1s ease-in;
            padding: 1.5rem; /* Reducido para móviles */
            width: 100%;
            box-sizing: border-box;
            max-width: 56rem;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        /* Clase para hacer el contenido principal visible */
        .main-content.fade-in {
            opacity: 1;
        }

        /* Estilos para el contenedor del contenido principal */
        .content-wrapper {
            background-color: #fff;
            padding: 1.5rem; /* Reducido para móviles */
            border-radius: 0.75rem; /* Menos redondeado para móviles */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* Sombra más ligera */
            border: 1px solid #e5e7eb;
            margin-left: auto;
            margin-right: auto;
        }

        /* Estilos del título principal del contenido */
        .main-title {
            font-size: 1.8rem; /* Reducido para móviles */
            font-weight: 800;
            text-align: center;
            color: #111827;
            margin-bottom: 1rem; /* Reducido para móviles */
        }

        /* Estilos del párrafo principal del contenido */
        .main-paragraph {
            font-size: 0.95rem; /* Reducido para móviles */
            text-align: center;
            color: #374151;
            line-height: 1.5; /* Ajuste de interlineado */
            margin-bottom: 1.5rem; /* Reducido para móviles */
        }

        /* Estilos de la rejilla de secciones */
        .sections-grid {
            gap: 1rem; /* Reducido para móviles */
            margin-bottom: 1.5rem; /* Reducido para móviles */
        }

        /* Estilos de las tarjetas de sección */
        .section-card {
            padding: 1rem; /* Reducido para móviles */
            border-radius: 0.5rem; /* Menos redondeado para móviles */
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.06); /* Sombra más ligera */
        }

        /* Estilos del título de sección */
        .section-title {
            font-size: 1.25rem; /* Reducido para móviles */
            margin-bottom: 0.5rem; /* Reducido para móviles */
        }

        /* Estilos del párrafo de sección */
        .section-paragraph {
            font-size: 0.875rem; /* Reducido para móviles */
        }

        /* Estilos del texto de copyright/nota inferior */
        .footer-text {
            font-size: 0.8rem; /* Reducido para móviles */
            margin-top: 0.75rem; /* Reducido para móviles */
        }

        /* Estilos del botón */
        .action-button {
            margin-top: 1.5rem; /* Reducido para móviles */
            padding: 0.75rem 1.5rem; /* Reducido para móviles */
            font-size: 1rem; /* Reducido para móviles */
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1); /* Sombra más suave */
        }

        /* Media queries para responsividad */
        @media (min-width: 768px) {
            /* Restablece a tamaños originales de escritorio */
            .curtain-panel {
                padding: 1.5rem 3rem;
                font-size: 2.5rem;
            }

            .pokedex-light {
                width: 20px;
                height: 20px;
                top: 20px;
            }
            .small-red-light { right: 120px; }
            .small-green-light { right: 80px; }
            .small-blue-light { right: 40px; }

            .pokedex-speaker-grill {
                width: 30px;
                height: 30px;
                top: 20px;
                left: 40px;
            }

            .pokedex-small-round-button {
                width: 40px;
                height: 40px;
                bottom: 40px;
            }
            .blue-round { right: 100px; }
            .yellow-round { right: 40px; }

            .pokeball-container {
                bottom: 30px;
                width: 80px;
                height: 80px;
                border: 5px solid #000;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .pokeball-top-half { border-bottom: 2px solid #000; }
            .pokeball-bottom-half { border-top: 2px solid #000; }
            .pokeball-center-button {
                width: 30px;
                height: 30px;
                border: 4px solid #000;
                box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
            }

            .main-content {
                padding: 4rem;
            }

            .content-wrapper {
                padding: 3rem;
                border-radius: 1rem;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }

            .main-title {
                font-size: 3rem;
                margin-bottom: 1.5rem;
            }

            .main-paragraph {
                font-size: 1.25rem;
                line-height: 1.625;
                margin-bottom: 2rem;
            }

            .sections-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
                margin-bottom: 2rem;
            }

            .section-card {
                padding: 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }

            .section-title {
                font-size: 1.5rem;
                margin-bottom: 0.75rem;
            }

            .section-paragraph {
                font-size: 1rem;
            }

            .footer-text {
                font-size: 1rem;
                margin-top: 1rem;
            }

            .action-button {
                margin-top: 2rem;
                padding: 1rem 2rem;
                font-size: 1.25rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            }
        }
      `}</style>

      {/* Las dos cortinas de la Pokedex */}
      <div
        id="topCurtain"
        ref={topCurtainRef}
        className={`curtain top-curtain ${isAnimating ? 'slide-up' : ''}`}
      >
        <div className="curtain-panel">
          ¡Pokédex!
        </div>
        {/* Elementos decorativos de Pokedex en la parte superior */}
        <div className="pokedex-speaker-grill"></div>
        <div className="pokedex-light small-red-light"></div>
        <div className="pokedex-light small-green-light"></div>
        <div className="pokedex-light small-blue-light"></div>
      </div>

      <div
        id="bottomCurtain"
        ref={bottomCurtainRef}
        className={`curtain bottom-curtain ${isAnimating ? 'slide-down' : ''}`}
      >
        <div className="curtain-panel">
          Cargando Datos...
        </div>
        {/* Pokeball en la parte inferior */}
        <div className="pokeball-container">
          <div className="pokeball-top-half"></div>
          <div className="pokeball-bottom-half"></div>
          <div className="pokeball-center-button"></div>
        </div>
        {/* Botones pequeños redondos en la parte inferior (a la derecha) */}
        <div className="pokedex-small-round-button blue-round"></div>
        <div className="pokedex-small-round-button yellow-round"></div>
      </div>
    </div>
  );
};


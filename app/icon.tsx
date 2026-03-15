import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* ROMBO INFERIOR - MORADO PROFUNDO */}
          <g transform="translate(0,140) scale(1,0.65)">
            <polygon points="256,120 420,256 256,392 92,256" fill="#4C1D95" /> {/* Superior */}
            <polygon points="420,256 256,392 256,430 420,294" fill="#2E1065" /> {/* Derecha */}
            <polygon points="92,256 256,392 256,430 92,294" fill="#1E1035" /> {/* Izquierda */}
          </g>

          {/* ROMBO MEDIO - MORADO VIBRANTE */}
          <g transform="translate(0,70) scale(1,0.65)">
            <polygon points="256,120 420,256 256,392 92,256" fill="#7C3AED" />
            <polygon points="420,256 256,392 256,430 420,294" fill="#5B21B6" />
            <polygon points="92,256 256,392 256,430 92,294" fill="#4C1D95" />
          </g>

          {/* ROMBO SUPERIOR - VIOLETA/LAVANDA BRILLANTE (FRENTE) */}
          <g transform="translate(0,0) scale(1,0.65)">
            <polygon points="256,120 420,256 256,392 92,256" fill="#A78BFA" /> {/* Lavanda Claro */}
            <polygon points="420,256 256,392 256,430 420,294" fill="#8B5CF6" /> {/* Violeta Medio */}
            <polygon points="92,256 256,392 256,430 92,294" fill="#6D28D9" /> {/* Violeta Oscuro */}
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
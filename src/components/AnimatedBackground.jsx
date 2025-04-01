import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../context/ThemeContext';

const AnimatedBackground = ({ children }) => {
  const { mode } = useTheme();
  
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: mode === 'dark' 
          ? 'linear-gradient(135deg, #1a1c2a 0%, #2d2f45 100%)'
          : 'linear-gradient(135deg, #3B82F6 0%, #6366F1 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '200%',
          height: '200%',
          top: '-50%',
          left: '-50%',
          background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          animation: 'backgroundMove 20s linear infinite',
          opacity: 0.5,
          zIndex: 1,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 50% 50%, ${mode === 'dark' ? 'rgba(83,99,255,0.15)' : 'rgba(255,255,255,0.2)'} 0%, transparent 50%)`,
          animation: 'pulseEffect 4s ease-in-out infinite',
        },
        '@keyframes backgroundMove': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          }
        },
        '@keyframes pulseEffect': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.8 }
        }
      }}
    >
      {children}
    </Box>
  );
};

export default AnimatedBackground;

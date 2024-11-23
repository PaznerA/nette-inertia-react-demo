import { useState, useEffect, useCallback } from 'react';
import './../../../css/index.css';

const GRID_SIZE = 40; // Zvětšeno pro zobrazení kódu
const INITIAL_PLAYER = { x: 5, y: 5 };
const FRAME_TIME = 5000;
const DAMAGE = 10;
const INITIAL_HEALTH = 100;
const MAX_SNAKES = 2;

// Samotný kód hry rozdělený na řádky pro hrací plochu
const GAME_CODE = `
import React, { useState, useEffect } from 'react';
const VimGame = () => {
  const [player, setPlayer] = useState({ x: 5, y: 5 });
  const [health, setHealth] = useState(100);
  const [snakes, setSnakes] = useState([]);
  const [score, setScore] = useState(0);
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      switch(e.key) {
        case 'h': setPlayer(p => ({...p, x: p.x - 1}));
        case 'l': setPlayer(p => ({...p, x: p.x + 1}));
        case 'j': setPlayer(p => ({...p, y: p.y + 1}));
        case 'k': setPlayer(p => ({...p, y: p.y - 1}));
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="game-container">
      <div className="player" />
      {snakes.map(snake => (
        <div key={snake.id} className="snake" />
      ))}
    </div>
  );
};
export default VimGame;`.split('\n');

const Demo = () => {
  const [player, setPlayer] = useState(INITIAL_PLAYER);
  const [health, setHealth] = useState(INITIAL_HEALTH);
  const [snakes, setSnakes] = useState([]);
  const [vimMode, setVimMode] = useState('normal');
  const [vimBuffer, setVimBuffer] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedRange, setSelectedRange] = useState(null);

  // Zpracování VIM příkazů
  const processVimCommand = useCallback((command) => {
    const motions = {
      'dd': (lineNum) => ({ start: lineNum, end: lineNum }), // Delete line
      'dap': (lineNum) => ({ start: lineNum - 1, end: lineNum + 1 }), // Delete around paragraph
      'dw': (lineNum) => ({ start: lineNum, end: lineNum }), // Delete word
      'D': (lineNum) => ({ start: lineNum, end: lineNum }), // Delete to end of line
      'yy': (lineNum) => ({ start: lineNum, end: lineNum }), // Yank line
    };

    // Kontrola, zda příkaz existuje
    const motion = Object.keys(motions).find(m => command.endsWith(m));
    if (!motion) return null;

    // Získání aktuálního řádku hráče
    const currentLine = Math.floor(player.y);
    
    // Výpočet rozsahu pro příkaz
    const range = motions[motion](currentLine);
    
    // Kontrola, zda některý had není v rozsahu
    snakes.forEach(snake => {
      const snakeLine = Math.floor(snake.y);
      if (snakeLine >= range.start && snakeLine <= range.end) {
        setSnakes(prev => prev.filter(s => s.id !== snake.id));
        setScore(prev => prev + 20);
      }
    });

    return range;
  }, [player.y, snakes]);

  const spawnSnake = useCallback(() => {
    if (snakes.length >= MAX_SNAKES) return;
    
    const line = Math.floor(Math.random() * GAME_CODE.length);
    const newSnake = {
      id: Date.now(),
      x: Math.random() < 0.5 ? 0 : GRID_SIZE - 1,
      y: line,
      text: GAME_CODE[line].trim(),
      line: line
    };
    setSnakes(prev => [...prev, newSnake]);
  }, [snakes.length]);

  // Pohyb hadů
  useEffect(() => {
    if (gameOver) return;
    
    const moveInterval = setInterval(() => {
      setSnakes(prev => prev.map(snake => {
        const dx = player.x - snake.x;
        const dy = player.y - snake.y;
        return {
          ...snake,
          x: snake.x + Math.sign(dx) * 0.5,
          y: snake.y + Math.sign(dy) * 0.5
        };
      }));
    }, 500);

    return () => clearInterval(moveInterval);
  }, [player, gameOver]);

  // Spawn hadů
  useEffect(() => {
    if (gameOver) return;
    const spawnInterval = setInterval(spawnSnake, 3000);
    return () => clearInterval(spawnInterval);
  }, [spawnSnake, gameOver]);

  // Kolize
  useEffect(() => {
    const checkCollisions = () => {
      snakes.forEach(snake => {
        const dx = Math.abs(snake.x - player.x);
        const dy = Math.abs(snake.y - snake.y);
        if (dx < 1 && dy < 1) {
          setHealth(prev => {
            const newHealth = prev - DAMAGE;
            if (newHealth <= 0) setGameOver(true);
            return newHealth;
          });
        }
      });
    };

    const collisionInterval = setInterval(checkCollisions, 100);
    return () => clearInterval(collisionInterval);
  }, [player, snakes]);

  // Ovládání a VIM příkazy
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      // Základní pohyb
      switch(e.key) {
        case 'h':
          setPlayer(p => ({ ...p, x: Math.max(0, p.x - 1) }));
          break;
        case 'l':
          setPlayer(p => ({ ...p, x: Math.min(GRID_SIZE - 1, p.x + 1) }));
          break;
        case 'j':
          setPlayer(p => ({ ...p, y: Math.min(GAME_CODE.length - 1, p.y + 1) }));
          break;
        case 'k':
          setPlayer(p => ({ ...p, y: Math.max(0, p.y - 1) }));
          break;
        case 'Escape':
          setVimMode('normal');
          setVimBuffer('');
          setSelectedRange(null);
          break;
        default:
          // VIM příkazy
          if (vimMode === 'normal') {
            setVimBuffer(prev => {
              const newBuffer = prev + e.key;
              const range = processVimCommand(newBuffer);
              if (range) {
                setSelectedRange(range);
                setTimeout(() => {
                  setSelectedRange(null);
                  setVimBuffer('');
                }, 500);
                return '';
              }
              return newBuffer;
            });
          }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, processVimCommand, vimMode]);

  return (
    <div className="w-full h-full bg-gray-900 text-white p-4">
      <div className="mb-4">
        Health: {health} | Score: {score} | VIM Buffer: {vimBuffer} | Mode: {vimMode}
      </div>
      
      <div className="relative w-full h-screen border border-gray-700">
        {/* Čísla řádků */}
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gray-800 text-gray-500 text-sm overflow-y-auto">
          {GAME_CODE.map((_, i) => (
            <div 
              key={i} 
              className={`h-6 text-right pr-1 ${
                selectedRange && i >= selectedRange.start && i <= selectedRange.end 
                ? 'bg-gray-700' 
                : ''
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Hrací plocha s kódem */}
        <div className="absolute left-12 right-0 top-0 bottom-0 overflow-auto font-mono text-sm">
          {GAME_CODE.map((line, i) => (
            <div 
              key={i} 
              className={`h-6 ${
                selectedRange && i >= selectedRange.start && i <= selectedRange.end 
                ? 'bg-gray-700' 
                : ''
              }`}
            >
              {line}
            </div>
          ))}

          {/* Hráč */}
          <div 
            className="absolute w-2 h-6 bg-green-500"
            style={{ 
              left: `${(player.x / GRID_SIZE) * 100}%`,
              top: `${player.y * 24}px`,
            }}
          />

          {/* Hadi */}
          {snakes.map(snake => (
            <div
              key={snake.id}
              className="absolute flex items-center"
              style={{
                left: `${(snake.x / GRID_SIZE) * 100}%`,
                top: `${snake.y * 24}px`,
                transform: 'translate(-50%, 0)'
              }}
            >
              <span className="text-red-500 whitespace-nowrap bg-gray-800 px-1">
                {snake.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded">
            <h2 className="text-xl mb-4">Game Over!</h2>
            <p>Final Score: {score}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 rounded"
              onClick={() => window.location.reload()}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
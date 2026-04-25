#!/bin/bash
# setup_games.sh — Crée la structure de tous les jeux YOPY

# FIX 1: Set ROOT to current directory since you are already inside yopy-platform
ROOT="."

# FIX 2: Create the main frontend and JS directories before creating files
mkdir -p "$ROOT/views/child/games"
mkdir -p "$ROOT/public/js/games"

GAMES=(
  "memory_game" 
  "simon_says" 
  "sudoku_pro" 
  "tic_tac_toe" 
  "whack_a_mole" 
  "snake_retro" 
  "math_sprint" 
  "word_scramble" 
  "spelling_bee" 
  "tetris_block" 
  "maze_runner" 
  "tile_puzzle" 
  "hangman_quest" 
  "tower_blocks" 
  "canon_defender" 
  "cut_the_rope" 
  "synonym_challenge" 

)

for game in "${GAMES[@]}"; do
  # Frontend
  touch "$ROOT/views/child/games/${game}.php"
  
  # Backend
  mkdir -p "$ROOT/games/${game}"
  touch "$ROOT/games/${game}/${game}_backend.php"
  
  # JS engine
  touch "$ROOT/public/js/games/${game}.js"
done

# Shared JS files
touch "$ROOT/public/js/games/BehaviorCollector.js"
touch "$ROOT/public/js/games/GameEngine.js"

echo "✓ Structure créée : ${#GAMES[@]} jeux × 3 fichiers"
// public/js/games/GameEngine.js
// Classe de base pour tous les jeux YOPY
// Gère les états, le score, le chronomètre et la collecte de signaux

class GameEngine {
    /**
     * @param {string} gameId - Identifiant du jeu
     * @param {BehaviorCollector} collector - Instance du collecteur de signaux
     * @param {Object} options - Options de configuration
     * @param {number} options.maxScore - Score maximum (optionnel)
     * @param {boolean} options.autoTimer - Démarrer automatiquement le chronomètre
     */
    constructor(gameId, collector, options = {}) {
        this.gameId = gameId;
        this.collector = collector;
        this.options = options;
        
        // États possibles
        this.STATES = {
            LOADING: 'loading',
            READY: 'ready',
            PLAYING: 'playing',
            PAUSED: 'paused',
            ENDED: 'ended',
            RESETTING: 'resetting'
        };
        
        this.state = this.STATES.LOADING;
        this.score = 0;
        this.startTime = null;
        this.timerInterval = null;
        this.elapsedSeconds = 0;
        
        // Callbacks
        this.onStateChange = null;
        this.onScoreUpdate = null;
        this.onTimerUpdate = null;
        this.onGameEnd = null;
        
        if (options.autoTimer) {
            this.startTimer();
        }
    }
    
    // ==================== Gestion des états ====================
    setState(newState) {
        if (this.state === newState) return;
        const oldState = this.state;
        this.state = newState;
        if (this.onStateChange) {
            this.onStateChange(newState, oldState);
        }
    }
    
    isPlaying() {
        return this.state === this.STATES.PLAYING;
    }
    
    isEnded() {
        return this.state === this.STATES.ENDED;
    }
    
    // ==================== Score ====================
    addScore(points) {
        this.score += points;
        if (this.options.maxScore && this.score > this.options.maxScore) {
            this.score = this.options.maxScore;
        }
        if (this.onScoreUpdate) {
            this.onScoreUpdate(this.score);
        }
        if (this.collector) {
            this.collector.record('score', this.score);
        }
        return this.score;
    }
    
    setScore(score) {
        this.score = Math.max(0, score);
        if (this.options.maxScore && this.score > this.options.maxScore) {
            this.score = this.options.maxScore;
        }
        if (this.onScoreUpdate) {
            this.onScoreUpdate(this.score);
        }
    }
    
    resetScore() {
        this.setScore(0);
    }
    
    // ==================== Chronomètre ====================
    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.startTime = Date.now();
        this.elapsedSeconds = 0;
        this.timerInterval = setInterval(() => {
            if (this.isPlaying() && this.startTime) {
                const now = Date.now();
                this.elapsedSeconds = Math.floor((now - this.startTime) / 1000);
                if (this.onTimerUpdate) {
                    this.onTimerUpdate(this.elapsedSeconds);
                }
                if (this.collector) {
                    this.collector.record('session_duration', this.elapsedSeconds);
                }
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    resetTimer() {
        this.stopTimer();
        this.elapsedSeconds = 0;
        if (this.startTime) {
            this.startTime = Date.now();
        }
        if (this.onTimerUpdate) {
            this.onTimerUpdate(0);
        }
    }
    
    getElapsedSeconds() {
        if (this.startTime && this.isPlaying()) {
            return Math.floor((Date.now() - this.startTime) / 1000);
        }
        return this.elapsedSeconds;
    }
    
    // ==================== Game flow ====================
    start() {
        if (this.state === this.STATES.LOADING || this.state === this.STATES.READY) {
            this.setState(this.STATES.PLAYING);
            this.startTimer();
            if (this.collector) {
                this.collector.record('game_start', 1);
            }
        }
    }
    
    pause() {
        if (this.isPlaying()) {
            this.setState(this.STATES.PAUSED);
            this.stopTimer();
        }
    }
    
    resume() {
        if (this.state === this.STATES.PAUSED) {
            this.setState(this.STATES.PLAYING);
            this.startTimer();
        }
    }
    
    end() {
        if (this.isPlaying()) {
            this.setState(this.STATES.ENDED);
            this.stopTimer();
            if (this.collector) {
                this.collector.record('game_end', 1);
                this.collector.record('final_score', this.score);
                this.collector.flush();
            }
            if (this.onGameEnd) {
                this.onGameEnd(this.score, this.getElapsedSeconds());
            }
        }
    }
    
    reset() {
        this.setState(this.STATES.RESETTING);
        this.stopTimer();
        this.resetScore();
        this.resetTimer();
        if (this.collector) {
            this.collector.record('game_reset', 1);
        }
        this.setState(this.STATES.READY);
    }
    
    // ==================== Signaux utiles ====================
    recordError() {
        if (this.collector) {
            this.collector.record('errors', 1);
        }
    }
    
    recordAttempt() {
        if (this.collector) {
            this.collector.record('attempts', 1);
        }
    }
    
    recordHelp() {
        if (this.collector) {
            this.collector.record('help_requests', 1);
        }
    }
    
    recordMove() {
        if (this.collector) {
            this.collector.record('move_count', 1);
        }
    }
    
    // ==================== Nettoyage ====================
    destroy() {
        this.stopTimer();
        if (this.collector) {
            this.collector.destroy();
        }
    }
}

// Rendre la classe disponible globalement
if (typeof window !== 'undefined') {
    window.GameEngine = GameEngine;
}
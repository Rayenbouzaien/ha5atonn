// public/js/games/BehaviorCollector.js
const VALID_SIGNALS = new Set([
    'reaction', 'error', 'success', 'abandon',
    'pace_change', 'retry', 'hint', 'timeout'
]);

class BehaviorCollector {
    constructor(gameId, signalMap, { flushThreshold = 60, idleTimeout = 8000 } = {}) {
        this.gameId         = gameId;
        this.signalMap      = signalMap;
        this.flushThreshold = flushThreshold;
        this.idleTimeout    = idleTimeout;

        this._events     = [];
        this._lastTs     = Date.now();
        this._startTime  = Date.now();
        this._idleTimer  = null;
        this._lastReact  = null;
        this.sessionId   = null;                    // ← NEW
    }

    /** Called from memory_game.js after startGame succeeds */
    setSessionId(id) {
        this.sessionId = parseInt(id, 10) || 0;
        console.log('%c[Behavior] Session ID set to ' + this.sessionId, 'color:#00F5FF');
    }

    record(gameEvent, value = null) {
        const signal = this.signalMap[gameEvent];
        if (!signal || !VALID_SIGNALS.has(signal)) return;

        const now = Date.now();

        if (signal === 'reaction' && this._lastReact !== null) {
            const delta = value - this._lastReact;
            if (Math.abs(delta) > 200) {
                this._push('pace_change', delta, now);
            }
        }
        if (signal === 'reaction') this._lastReact = value;

        this._push(signal, value, now);

        clearTimeout(this._idleTimer);
        this._idleTimer = setTimeout(() => {
            const idleSec = (Date.now() - this._lastTs) / 1000;
            this._push('abandon', idleSec, Date.now());
        }, this.idleTimeout);

        this._lastTs = now;

        if (this._events.length >= this.flushThreshold) this.flush();
    }

    _push(signal, value, ts) {
        this._events.push({ signal, value, ts });
    }

    _aggregate() {
        const reactions = this._events
            .filter(e => e.signal === 'reaction' && e.value != null)
            .map(e => e.value);
        const errors  = this._events.filter(e => e.signal === 'error').length;
        const total   = this._events.length || 1;

        return {
            latency_avg:      reactions.length ? reactions.reduce((a, b) => a + b, 0) / reactions.length : null,
            error_rate:       errors / total,
            session_duration: (Date.now() - this._startTime) / 1000,
            event_count:      this._events.length,
        };
    }

    async flush() {
        if (!this._events.length) return;
        clearTimeout(this._idleTimer);

        const payload = {
            game_id:     this.gameId,
            session_id:  this.sessionId,               // ← THIS WAS MISSING
            signals:     this._aggregate(),
            events:      this._events,
        };

        this._events    = [];
        this._lastReact = null;

        const url = '../../../../api/behavior_api.php';

        if (navigator.sendBeacon) {
            if (typeof Blob !== 'undefined') {
                navigator.sendBeacon(
                    url,
                    new Blob([JSON.stringify(payload)], { type: 'application/json' })
                );
            } else {
                // Blob unsupported (Node/test environment) — send raw JSON string
                try { navigator.sendBeacon(url, JSON.stringify(payload)); } catch (e) {}
            }
        } else {
            await fetch(url, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(payload),
                keepalive: true,
            }).catch(() => {});
        }

        console.log('%c[Behavior] Flushed to /api/behavior_api.php with session_id=' + this.sessionId, 'color:#00F5FF');
    }
}
// Export for Node.js/Jest testing, but ignore in the browser
// Expose the class globally so testHelpers.loadScript can capture it
if (typeof globalThis !== 'undefined') {
    globalThis.BehaviorCollector = BehaviorCollector;
} else if (typeof window !== 'undefined') {
    window.BehaviorCollector = BehaviorCollector;
}
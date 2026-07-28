// api.js - Centralized API manager for MRC Track Stat
// Connects to Cloudflare Worker backend
// Base URL can be changed for different games

const API_CONFIG = {
    saber: 'https://mrc-saber-api.sakahr315.workers.dev',
    // Future games:
    // ps99: 'https://mrc-ps99-api.sakahr315.workers.dev',
    // growagarden: 'https://mrc-garden-api.sakahr315.workers.dev',
};

const API = {
    // Get base URL for a game
    base(game = 'saber') {
        return API_CONFIG[game] || API_CONFIG.saber;
    },

    // Generic fetch helper with error handling
    async fetchJSON(url) {
        const res = await fetch(url);
        if (!res.ok) {
            const error = await res.json().catch(() => ({ error: 'Request failed' }));
            throw new Error(error.error || `HTTP ${res.status}`);
        }
        return res.json();
    },

    // ─── Saber Simulator ───
    async getSaberOverview() {
        return this.fetchJSON(`${API_CONFIG.saber}/api/saber/overview`);
    },

    async getSaberAccounts() {
        return this.fetchJSON(`${API_CONFIG.saber}/api/saber/accounts`);
    },

    async getSaberAccount(username) {
        return this.fetchJSON(`${API_CONFIG.saber}/api/saber/account/${encodeURIComponent(username)}`);
    },

    async searchSaberPet(name) {
        return this.fetchJSON(`${API_CONFIG.saber}/api/saber/search-pet?name=${encodeURIComponent(name)}`);
    },

    // ─── Future: Pet Simulator 99 ───
    // async getPS99Overview() { ... }
    // async getPS99Accounts() { ... }
};

// Export for use in other scripts
if (typeof module !== 'undefined') module.exports = API;
// api.js - Centralized API manager for MRC Track Stat
// Connects to Cloudflare Worker backend

const API_CONFIG = {
    saber: 'https://mrc-saber-api.sakahr315.workers.dev',
    // Future games:
    // ps99: 'https://mrc-ps99-api.sakahr315.workers.dev',
};

const API = {
    base(game = 'saber') {
        return API_CONFIG[game] || API_CONFIG.saber;
    },

    async fetchJSON(url, options = {}) {
        const res = await fetch(url, options);
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

    // ─── API Key Management (for tracker generator) ───
    async generateTrackerKey(userId) {
        return this.fetchJSON(`${API_CONFIG.saber}/api/generate-key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId || 'test_user_123' }),
        });
    },

    async resetTrackerKey(userId) {
        return this.fetchJSON(`${API_CONFIG.saber}/api/reset-key`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId || 'test_user_123' }),
        });
    },
};

// Export for use in other scripts
if (typeof module !== 'undefined') module.exports = API;

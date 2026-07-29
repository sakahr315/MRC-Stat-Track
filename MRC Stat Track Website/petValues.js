// petValues.js - Local pet value definitions
// Update this file to adjust pet values
// Format: "PetName": value_in_gems

const PET_VALUES = {
    // ─── Secret Pets ───
    "Void Angel": 0,
    "Shadow Dominus": 0,
    "Celestial Dragon": 0,
    "Ethereal Phoenix": 0,

    // ─── Mythical Pets ───
    "Mythic Griffin": 0,
    "Mythic Unicorn": 0,
    "Mythic Dragon": 0,

    // ─── Legendary Pets ───
    "Rainbow Dominus": 0,
    "Golden Dominus": 0,
    "Diamond Dragon": 0,
    "Crystal Pegasus": 0,
    "Storm Titan": 0,
    "Inferno Lord": 0,
    "Frost Giant": 0,

    // ─── Epic Pets ───
    "Shadow Wolf": 0,
    "Thunder Eagle": 0,
    "Blaze Hound": 0,
    "Aqua Serpent": 0,

    // ─── Rare Pets ───
    "Dark Knight": 0,
    "Fire Sprite": 0,
    "Ice Golem": 0,

    // ─── Default fallback ───
    "default": 0,
};

// Rarity hierarchy (higher = rarer)
const RARITY_RANK = {
    "Secret": 6,
    "Mythical": 5,
    "Legendary": 4,
    "Epic": 3,
    "Rare": 2,
    "Common": 1,
};

// Get pet value (with fallback)
function getPetValue(petName) {
    return PET_VALUES[petName] || PET_VALUES["default"] || 0;
}

// Get rarity rank (with fallback)
function getRarityRank(rarity) {
    return RARITY_RANK[rarity] || 0;
}

// Format large numbers
function formatNumber(num) {
    if (num === undefined || num === null) return '0';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
}

// Calculate total inventory value
function calculateInventoryValue(pets) {
    if (!pets || !Array.isArray(pets)) return 0;
    return pets.reduce((total, pet) => {
        return total + (getPetValue(pet.name) * (pet.amount || 1));
    }, 0);
}

// Check if pet is rare (Secret or Mythical)
function isRarePet(rarity) {
    return rarity === 'Secret' || rarity === 'Mythical';
}
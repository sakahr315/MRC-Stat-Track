// petValues.js - Local pet value definitions
// Update this file to adjust pet values
// Format: "PetName": value_in_gems

const PET_VALUES = {
    // ─── Secret Pets ───
    "Void Angel": 500000000,
    "Shadow Dominus": 450000000,
    "Celestial Dragon": 600000000,
    "Ethereal Phoenix": 550000000,

    // ─── Mythical Pets ───
    "Mythic Griffin": 200000000,
    "Mythic Unicorn": 180000000,
    "Mythic Dragon": 220000000,

    // ─── Legendary Pets ───
    "Rainbow Dominus": 150000000,
    "Golden Dominus": 120000000,
    "Diamond Dragon": 100000000,
    "Crystal Pegasus": 95000000,
    "Storm Titan": 85000000,
    "Inferno Lord": 80000000,
    "Frost Giant": 75000000,

    // ─── Epic Pets ───
    "Shadow Wolf": 50000000,
    "Thunder Eagle": 45000000,
    "Blaze Hound": 40000000,
    "Aqua Serpent": 38000000,

    // ─── Rare Pets ───
    "Dark Knight": 20000000,
    "Fire Sprite": 15000000,
    "Ice Golem": 12000000,

    // ─── Default fallback ───
    "default": 5000000,
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
    return PET_VALUES[petName] || PET_VALUES["default"] || 5000000;
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
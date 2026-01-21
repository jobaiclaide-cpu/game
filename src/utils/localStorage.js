// LocalStorage utility for game data persistence
// All data is stored with a prefix to avoid conflicts

const STORAGE_PREFIX = 'winter_fishing_';

// Storage keys
const KEYS = {
  PLAYER_DATA: 'player_data',
  INVENTORY: 'inventory',
  EQUIPPED_ITEMS: 'equipped_items',
  BALANCE: 'balance',
  CHAT_MESSAGES: 'chat_messages',
  GAME_STATE: 'game_state',
  SETTINGS: 'settings',
  FISH_NET: 'fish_net',
  STATISTICS: 'statistics',
};

// Helper to get full key with prefix
const getKey = (key) => `${STORAGE_PREFIX}${key}`;

// Generic get/set functions
export const storage = {
  // Get item from localStorage
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(getKey(key));
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  // Set item in localStorage
  set: (key, value) => {
    try {
      localStorage.setItem(getKey(key), JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove: (key) => {
    try {
      localStorage.removeItem(getKey(key));
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  // Clear all game data
  clearAll: () => {
    try {
      Object.values(KEYS).forEach((key) => {
        localStorage.removeItem(getKey(key));
      });
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Specific functions for each data type

// Player data
export const playerStorage = {
  get: () => storage.get(KEYS.PLAYER_DATA, {
    playerId: '200',
    nickname: 'Player #200',
    avatar: 'vite.svg',
  }),
  set: (playerData) => storage.set(KEYS.PLAYER_DATA, playerData),
};

// Balance
export const balanceStorage = {
  get: () => storage.get(KEYS.BALANCE, 1000),
  set: (balance) => storage.set(KEYS.BALANCE, balance),
  add: (amount) => {
    const current = balanceStorage.get();
    const newBalance = current + amount;
    balanceStorage.set(newBalance);
    return newBalance;
  },
  subtract: (amount) => {
    const current = balanceStorage.get();
    const newBalance = Math.max(0, current - amount);
    balanceStorage.set(newBalance);
    return newBalance;
  },
};

// Inventory
export const inventoryStorage = {
  get: () => storage.get(KEYS.INVENTORY, {
    udochki: [],
    nazivka: [],
    leski: [],
    kruchki: [],
    snegohody: [],
  }),
  set: (inventory) => storage.set(KEYS.INVENTORY, inventory),
  addItem: (category, item) => {
    const inventory = inventoryStorage.get();
    if (!inventory[category]) {
      inventory[category] = [];
    }
    inventory[category].push(item);
    inventoryStorage.set(inventory);
    return inventory;
  },
  removeItem: (category, itemId) => {
    const inventory = inventoryStorage.get();
    if (inventory[category]) {
      inventory[category] = inventory[category].filter((item) => item.id !== itemId);
      inventoryStorage.set(inventory);
    }
    return inventory;
  },
};

// Equipped items
export const equippedItemsStorage = {
  get: () => storage.get(KEYS.EQUIPPED_ITEMS, {
    udochki: null,
    nazivka: null,
    leski: null,
    kruchki: null,
    snegohody: null,
  }),
  set: (equippedItems) => storage.set(KEYS.EQUIPPED_ITEMS, equippedItems),
  equip: (category, itemId) => {
    const equipped = equippedItemsStorage.get();
    equipped[category] = itemId;
    equippedItemsStorage.set(equipped);
    return equipped;
  },
  unequip: (category) => {
    const equipped = equippedItemsStorage.get();
    equipped[category] = null;
    equippedItemsStorage.set(equipped);
    return equipped;
  },
};

// Chat messages
export const chatStorage = {
  get: () => storage.get(KEYS.CHAT_MESSAGES, [
    {
      id: 1,
      sender: 'Капитан Рыбак',
      text: 'Добро пожаловать на базу! Готовы к новым приключениям?',
      time: '10:30',
      isSystem: true,
      avatar: '🎣',
    },
  ]),
  set: (messages) => storage.set(KEYS.CHAT_MESSAGES, messages),
  addMessage: (message) => {
    const messages = chatStorage.get();
    messages.push(message);
    chatStorage.set(messages);
    return messages;
  },
};

// Game state (for gameplay screen)
export const gameStateStorage = {
  get: () => storage.get(KEYS.GAME_STATE, {
    isHoleCleared: true,
    isRoadCasted: false,
    fillPercentage: 0,
    isBiting: false,
  }),
  set: (gameState) => storage.set(KEYS.GAME_STATE, gameState),
};

// Fish net (садок)
export const fishNetStorage = {
  get: () => storage.get(KEYS.FISH_NET, []),
  set: (fishNet) => storage.set(KEYS.FISH_NET, fishNet),
  addFish: (fish) => {
    const fishNet = fishNetStorage.get();
    fishNet.push(fish);
    fishNetStorage.set(fishNet);
    return fishNet;
  },
  removeFish: (fishId) => {
    const fishNet = fishNetStorage.get();
    const filtered = fishNet.filter((fish) => fish.id !== fishId);
    fishNetStorage.set(filtered);
    return filtered;
  },
  clear: () => {
    fishNetStorage.set([]);
    return [];
  },
};

// Settings
export const settingsStorage = {
  get: () => storage.get(KEYS.SETTINGS, {
    soundEnabled: true,
    musicEnabled: true,
    notificationsEnabled: true,
  }),
  set: (settings) => storage.set(KEYS.SETTINGS, settings),
};

// Statistics
export const statisticsStorage = {
  get: () => storage.get(KEYS.STATISTICS, {
    tournamentsCount: 0,
    maxCatch: '0 кг',
    favoriteFish: '-',
    maxReward: '0р',
    totalFishCaught: 0,
    totalMoneyEarned: 0,
  }),
  set: (statistics) => storage.set(KEYS.STATISTICS, statistics),
  updateStat: (statKey, value) => {
    const stats = statisticsStorage.get();
    stats[statKey] = value;
    statisticsStorage.set(stats);
    return stats;
  },
};

// Export all
export default {
  storage,
  playerStorage,
  balanceStorage,
  inventoryStorage,
  equippedItemsStorage,
  chatStorage,
  gameStateStorage,
  fishNetStorage,
  settingsStorage,
  statisticsStorage,
};

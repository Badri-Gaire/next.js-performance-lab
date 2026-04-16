/**
 * Cache Lab Service
 * Demonstrates state that survives across request boundaries but can be surgically invalidated.
 */

// Simulated global Database State (In-memory for demo)
// In a real app, this would be Redis, Postgres, etc.
let globalInventory = 542;
let lastUpdate = new Date().toISOString();

export async function getInventory() {
  // Simulate DB latency
  await new Promise(r => setTimeout(r, 100));
  return {
    count: globalInventory,
    timestamp: lastUpdate
  };
}

export async function updateInventory() {
  globalInventory = Math.floor(Math.random() * 1000) + 100;
  lastUpdate = new Date().toISOString();
  return {
    count: globalInventory,
    timestamp: lastUpdate
  };
}

// データ競合を一旦考えてない
const LIMIT = 100;

const cache = new Map();

export function cacheSet(key, value) {
  cache.set(key, value);

  if (cache.size > LIMIT) {
    this.remove(cache.keys().next().value);
  }
}

export function cacheGet(key) {
  const value = cache.get(key);

  if (cache.has(key)) {
    cacheRemove(key);
    cache.set(key, value);
  }

  return value ?? null;
}

export function cacheRemove(key) {
  cache.delete(key);
}

export function cacheClear() {
  cache.clear();
}

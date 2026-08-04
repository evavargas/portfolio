type RateEntry = {
  timestamps: number[];
};

const buckets = new Map<string, RateEntry>();

export function checkRateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const entry = buckets.get(key) ?? { timestamps: [] };
  const timestamps = entry.timestamps.filter((stamp) => now - stamp < windowMs);

  if (timestamps.length >= limit) {
    buckets.set(key, { timestamps });
    return false;
  }

  timestamps.push(now);
  buckets.set(key, { timestamps });
  return true;
}

export function resetRateLimitStore() {
  buckets.clear();
}

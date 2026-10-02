"use client";

export type StoreRecord = Record<string, unknown>;

const PREFIX = "influxbridge:";

export function readStore<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStore<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent("influxbridge:store", { detail: key }));
}

export function clearStore(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(PREFIX + key);
  window.dispatchEvent(new CustomEvent("influxbridge:store", { detail: key }));
}

export const storeKeys = {
  leads: "leads",
  influencers: "influencers",
  campaigns: "campaigns",
  messages: "messages",
} as const;

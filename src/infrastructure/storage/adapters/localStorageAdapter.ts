import { IStorageAdapter } from "../storage";

export class LocalStorageAdapter implements IStorageAdapter {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
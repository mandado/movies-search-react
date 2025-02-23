export interface IStorageAdapter {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
}

export class Storage {
  constructor(private adapter: IStorageAdapter) {}

  get<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const value = this.adapter.get<T>(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error(`Erro ao recuperar item '${key}':`, error);
      return defaultValue;
    }
  }

  set<T>(key: string, value: T): boolean {
    try {
      this.adapter.set(key, value);
      return true;
    } catch (error) {
      console.error(`Erro ao salvar item '${key}':`, error);
      return false;
    }
  }

  remove(key: string): boolean {
    try {
      this.adapter.remove(key);
      return true;
    } catch (error) {
      console.error(`Erro ao remover item '${key}':`, error);
      return false;
    }
  }

  clear(): boolean {
    try {
      this.adapter.clear();
      return true;
    } catch (error) {
      console.error('Erro ao limpar storage:', error);
      return false;
    }
  }
}
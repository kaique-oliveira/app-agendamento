class ObjectHelper {
  omit<T extends object, K extends keyof T>(obj: T, key: K): Omit<T, K> {
    const { [key]: omitted, ...rest } = obj;
    return rest as Omit<T, K>;
  }
}

export const objectHelper = new ObjectHelper();

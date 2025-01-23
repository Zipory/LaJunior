
/**Return string that pressent the row-id, according to tableName. */
export function idTransforme(tableName: string) :string {
    return tableName.substring(0,tableName.length-1)+'ID';
}

/** Return [key, value] of the ID in object. */
export function idKeyValuePair(obj: Record<string, any>): [string, number] {
    const keys = Object.keys(obj);
    const idKey = keys.find((key) => key.endsWith("ID"));
    if (idKey && typeof obj[idKey] === "number") {
      const idValue = obj[idKey];
      return [idKey, idValue];
    }
    return ["ID", -1];
  }
  
import { cacheGet, cacheSet } from "../../../cache";

/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, '')}`;

/** @type {(path: string) => string} */
export function baseName(path) {
  const key = `baseName-${path}`;
  let result = cacheGet(key);
  if (result == null) {
    const index = path.lastIndexOf('.');
    if (index != -1) {
      result = path.substring(0, index);
    } else {
      result = path;
    }
  }
  cacheSet(key, result);
  return result;
}

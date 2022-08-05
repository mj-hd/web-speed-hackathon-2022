/** @type {(path: string) => string} */
export const assets = (path) => `/assets/${path.replace(/^\//, '')}`;

/** @type {(path: string) => string} */
export function baseName(path) {
  const index = path.lastIndexOf('.');
  if (index != -1) {
    return path.substring(0, index);
  }
  return path;
}

/**
 * Minimal `--flag value` argv parser (no dependency). Repeated flags
 * (e.g. multiple `--ref`) collect into an array.
 */
export function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    const hasValue = next !== undefined && !next.startsWith("--");
    const value = hasValue ? next : true;
    if (hasValue) i++;

    if (key in args) {
      args[key] = Array.isArray(args[key]) ? [...args[key], value] : [args[key], value];
    } else {
      args[key] = value;
    }
  }
  return args;
}

export function toArray(value) {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

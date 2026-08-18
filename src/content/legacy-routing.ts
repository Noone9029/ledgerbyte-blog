export const permanentRedirects: Record<string, string> = {};

// Add a slug only after the recovery log establishes that no equivalent
// article or meaningful redirect target exists. Proxy responses use HTTP 410.
export const goneSlugs = new Set<string>();

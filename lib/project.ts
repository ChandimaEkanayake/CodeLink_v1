/**
 * Client-side utility to get the current project name
 * This is a client-safe version of the server-side getCurrentProject function
 */
export function getCurrentProject(): string {
  // For now, we'll hardcode the project name to match the server
  return "pyshop"
}

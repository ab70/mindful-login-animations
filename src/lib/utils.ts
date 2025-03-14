
// Replace tailwind utilities with our own implementation
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

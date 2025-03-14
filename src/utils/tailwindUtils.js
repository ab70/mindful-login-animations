
// This is a dummy file to satisfy any imports of tailwind utilities
// without actually using tailwind

export const cn = (...classNames) => {
  return classNames.filter(Boolean).join(' ');
};

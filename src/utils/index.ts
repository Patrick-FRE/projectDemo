/**
 * Debounce a function
 * @param func the function to debounce
 * @param wait interval for function execution
 */
const debounce = (func: any, wait: number) => {
  let timeout: any;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export { debounce };

import { debounce } from "./index";

describe('debounce', () => {
  it('should be able to execute a function', (done) => {
    const debouncedFunction = debounce(done, 500);
    debouncedFunction();
  });
});



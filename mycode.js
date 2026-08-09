// mycode.js
// 把下面的代码保存到当前文件夹中的 mycode.js

/**
 * Return a boolean value based upon
 * whether the argument n is a prime number.
 * @param {number} n
 * @returns {boolean}
 */
export function isPrime(n) {
  if (n < 2) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  for (let m = 2; m <= Math.floor(Math.sqrt(n)); m++) {
    if (n % m === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Print a string, with a greeting to everyone.
 * @param {...string} names - names to be greeted
 * @param {{greeting?: string, capitalized?: boolean}} [options]
 */
export function sayHi(...args) {
  let greeting = 'Hello';
  let capitalized = false;
  let names = args;

  const last = args[args.length - 1];
  if (last && typeof last === 'object' && !Array.isArray(last)) {
    ({ greeting = 'Hello', capitalized = false } = last);
    names = args.slice(0, -1);
  }

  for (let name of names) {
    if (capitalized) {
      name = name.charAt(0).toUpperCase() + name.slice(1);
    }
    console.log(`${greeting}, ${name}!`);
  }
}
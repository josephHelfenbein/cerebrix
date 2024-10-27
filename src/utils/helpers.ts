export const Stringify = (obj: any) => {
  return JSON.stringify(obj, null, 2);
};

export const getURL = (path = ''): string => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.trim() !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL.trim() !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000/';

  url = url.replace(/\/+$/, '');
  url = url.includes('http') ? url : `https://${url}`;
  path = path.replace(/^\/+/, '');

  return path ? `${url}/${path}` : url;
};

export const Slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const debounce = (fn: Function, time = 300): Function => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
};

export const Capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const IsObjectEmpty = (obj: any) => {
  return Object.keys(obj).length === 0;
};

export const IsArrayEmpty = (arr: any) => {
  return arr.length === 0;
};

export const IsStringEmpty = (str: string) => {
  return str.trim() === '';
};

export const IsString = (str: string) => {
  return typeof str === 'string';
};

const EMPTY = Symbol('EMPTY') as any;
function defaultCacheKey(...args: any[]): string {
  if (args.length === 0) {
    return EMPTY;
  }

  if (args.length === 1) {
    const arg = args[0];

    if (
      typeof arg === 'string' ||
      typeof arg === 'number' ||
      typeof arg === 'boolean' ||
      typeof arg === 'symbol' ||
      arg === null ||
      arg === undefined
    ) {
      return arg;
    }

    if (Array.isArray(arg)) {
      return arg.map((x) => defaultCacheKey(x)).join(',');
    }

    if (typeof arg === 'object') {
      return JSON.stringify(arg);
    }
  }

  return JSON.stringify(args);
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  cacheKey: (...args: Parameters<T>) => string = defaultCacheKey,
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = cacheKey(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}

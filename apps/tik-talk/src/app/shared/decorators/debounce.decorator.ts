export function Debounce(timeout: number) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    let timer: any;
    descriptor.value = function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        method.apply(this, args);
      }, timeout);
    };
  };
}

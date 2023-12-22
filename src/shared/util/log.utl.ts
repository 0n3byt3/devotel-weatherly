const $log = (...arg: any[]) => {
  if (process.env.NODE_ENV === 'production')
    return;
  
  console.log(...arg);
};

$log.warn = (...arg: any[]) => {
  if (process.env.NODE_ENV === 'production')
    return;
  console.warn(...arg);
}

$log.err = (...arg: any[]) => {
  if (process.env.NODE_ENV === 'production')
    return;
  console.error(...arg);
}

export {$log};

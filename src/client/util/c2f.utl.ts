//converts Celsius  unit to Fahrenheit 
export const c2f = (cel: number) => { //has a problem with -21.4
  let d = (cel >= 0? (cel * 1.8).toFixed(1) : (cel * -1 * 1.8).toFixed(1)).replace(/[.,]00$/, "");
  return (cel >=0? +d : +d * -1) + 32;
} 
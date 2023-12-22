//default error messages
export const errMsg = {
  required(field: string) {
    return `${field} Can't be empty`;
  },
  notFound(field: string) {
    return `${field} not found`;
  },
  minChar(field: string, minVal: number) {
    return `${field} minimum length is ${minVal} characters`;
  },
  minVal(field: string, minVal: number) {
    return `${field} minimum value is ${minVal}`;
  },
  maxChar(field: string, maxVal: number) {
    return `${field} maximum length is ${maxVal} characters`;
  },
  maxVal(field: string, maxVal: number) {
    return `${field} maximum value is ${maxVal}`;
  },
};
// arg1 {}  arg2 ""
// arg1 ""  arg2 {}
// return location "" coverBaseOption {}
export function modifyOptions(baseOption, arg1 = {}, arg2 = '') {
  let coverBaseOption = arg1;
  let location = arg2;
  if (typeof arg1 === 'string') {
    location = arg1;
    coverBaseOption = arg2;
  }
  return {
    location,
    baseOption: { ...baseOption, ...coverBaseOption },
  };
}

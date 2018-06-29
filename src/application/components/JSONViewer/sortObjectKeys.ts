const isUnderscore: (x: string) => boolean = x => x === '_';

const sortObjectKeys: (a: string, b: string) => 1 | -1 = (a, b) => {
  if (isUnderscore(a.charAt(0))) {
    return 1;
  }

  if (isUnderscore(b.charAt(0))) {
    return -1;
  }

  return a < b ? -1 : 1;
};

export default sortObjectKeys;

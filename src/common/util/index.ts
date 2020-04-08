import preval from 'preval.macro';

export const buildDate = preval`module.exports = Date.now()`;

export const shuffle = (a: any[]) => {
  const newArray = [...a];

  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }

  return newArray;
};

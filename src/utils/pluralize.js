export const pluralize = (count, data, language = 'en') => {
  const words = data[language];

  count = Math.abs(count);
  count %= 100;
  if (count >= 5 && count <= 20) return words[2] ? words[2] : words[1];
  count %= 10;
  if (count === 1) return words[0];
  if (count >= 2 && count <= 4) return words[1];
  return words[2] ? words[2] : words[1];
};

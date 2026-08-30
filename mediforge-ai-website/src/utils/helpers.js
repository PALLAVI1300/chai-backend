export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const formatNumber = (num) => {
  return num.toString().padStart(2, '0');
};
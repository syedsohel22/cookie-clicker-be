export const calculateScore = () => {
  const random = Math.random();

  if (random < 0.5) return { bonus: 10, prize: 0 };
  if (random < 0.75) return { bonus: 0, prize: 1 };

  return { bonus: 0, prize: 0 };
};

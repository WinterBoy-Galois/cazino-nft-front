export const calcTargetMin = (minProbability: number, maxProbability: number, over: boolean) =>
  over ? 100 - maxProbability : minProbability;

export const calcTargetMax = (minProbability: number, maxProbability: number, over: boolean) =>
  over ? 100 - minProbability : maxProbability;

export const calcTarget = (probability: number, over: boolean) =>
  over ? 100 - probability : probability;

export const calcProbability = (target: number, over: boolean) => (over ? 100 - target : target);

export const calcProbabilityByMultiplier = (multiplier: number, he: number) =>
  multiplier > 0 ? (1 / multiplier) * (1 - he) * 100 : 0;

export const calcMultiplier = (probability: number, he: number) =>
  probability > 0 ? (1 / probability) * (1 - he) * 100 : 0;

export const calcProfit = (multiplier: number, amount: number) => multiplier * amount - amount;

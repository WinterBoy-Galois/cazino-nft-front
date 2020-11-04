export const calcTargetMin = (minProbability: number, maxProbability: number, over: boolean) =>
  over ? 100 - maxProbability : minProbability;

export const calcTargetMax = (minProbability: number, maxProbability: number, over: boolean) =>
  over ? 100 - minProbability : maxProbability;

import { useMemo } from 'react';
import { calcTargetMax } from '../common/util/betCalc.util';

export default function useTargetSliderMax(minProbability: number, maxProbability: number) {
  return useMemo(() => calcTargetMax(minProbability, maxProbability, false), [
    minProbability,
    maxProbability,
  ]);
}

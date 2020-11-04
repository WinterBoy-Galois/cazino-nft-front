import { useMemo } from 'react';
import { calcTargetMin } from '../common/util/betCalc.util';

export default function useTargetSliderMin(minProbability: number, maxProbability: number) {
  return useMemo(() => calcTargetMin(minProbability, maxProbability, true), [
    minProbability,
    maxProbability,
  ]);
}

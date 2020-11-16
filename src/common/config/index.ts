import { toast } from 'react-toastify';

import { env } from '../util/environment.util';

export const appConfig = {
  avatarUrls: [
    'https://staging.jinglebets.com/ava/m1.svg',
    'https://staging.jinglebets.com/ava/m2.svg',
    'https://staging.jinglebets.com/ava/m3.svg',
    'https://staging.jinglebets.com/ava/m4.svg',
    'https://staging.jinglebets.com/ava/m5.svg',
    'https://staging.jinglebets.com/ava/m6.svg',
    'https://staging.jinglebets.com/ava/m7.svg',
    'https://staging.jinglebets.com/ava/m8.svg',
    'https://staging.jinglebets.com/ava/m9.svg',
    'https://staging.jinglebets.com/ava/m10.svg',
    'https://staging.jinglebets.com/ava/m11.svg',
    'https://staging.jinglebets.com/ava/m12.svg',
  ],
  bitcoinFractionDigits: 8,
  multiplierFractionDigits: 4,
  toastAutoCloseDuration: 5000,
  toastHideProgressbar: true,
  toastPosition: toast.POSITION.BOTTOM_LEFT,
  apiBasePath: env('REACT_APP_API_BASE_PATH'),
  apiBasePathWS: env('REACT_APP_API_BASE_PATH_WS'),
  reCaptchaSiteKey: env('REACT_APP_RECAPTCHA'),
  reduceMotion: /true/i.test(env('REACT_APP_REDUCE_MOTION')),
  blockchainExplorerUrl: env('REACT_APP_BLOCKCHAIN_EXPLORER_URL'),
  diceGameTimeout: 1000,
  diceGameDiamondTransitionTime: 300,
};

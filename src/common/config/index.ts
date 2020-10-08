import { toast } from 'react-toastify';

import { env } from '../util/environment.util';

export const appConfig = {
  bitcoinFractionDigits: 8,
  multiplierFractionDigits: 4,
  toastAutoCloseDuration: 3000,
  toastHideProgressbar: true,
  toastPosition: toast.POSITION.BOTTOM_LEFT,
  apiBasePath: env('REACT_APP_API_BASE_PATH'),
  apiBasePathWS: env('REACT_APP_API_BASE_PATH_WS'),
  reCaptchaSiteKey: env('REACT_APP_RECAPTCHA'),
  reduceMotion: /true/i.test(env('REACT_APP_REDUCE_MOTION')),
  blockchainExplorerUrl: env('REACT_APP_BLOCKCHAIN_EXPLORER_URL'),
};

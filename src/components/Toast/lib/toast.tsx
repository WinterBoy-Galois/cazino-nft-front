import Toast from '../Toast';

import React from 'react';
import { toast, ToastOptions } from 'react-toastify';
import { appConfig } from '../../../common/config';

const option: ToastOptions = {
  autoClose: appConfig.toastShowTime,
};

export const success = (text: string) =>
  toast.success(<Toast type="SUCCESS">{text}</Toast>, option);
export const info = (text: string) => toast.info(<Toast type="INFO">{text}</Toast>, option);
export const error = (text: string) => toast.error(<Toast type="ERROR">{text}</Toast>, option);

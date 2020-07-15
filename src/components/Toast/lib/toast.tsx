import Toast from '../Toast';

import React from 'react';
import { toast } from 'react-toastify';

export const success = (text: string) => toast.success(<Toast type="SUCCESS">{text}</Toast>);
export const info = (text: string) => toast.info(<Toast type="INFO">{text}</Toast>);
export const error = (text: string) => toast.error(<Toast type="ERROR">{text}</Toast>);

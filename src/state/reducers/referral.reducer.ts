import { Reducer } from 'react';
import { Action } from '../actions';
import { ReferralState } from '../models/referral.model';
import { saveReferral } from '../../common/util/storage.util';

export const referralReducer: Reducer<ReferralState, Action> = (state, { type, payload }) => {
  switch (type) {
    case 'REFERRAL_ADD':
      saveReferral(payload);
      return { ...state, id: payload };

    default:
      return state;
  }
};

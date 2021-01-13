import React, { useState, useEffect, useReducer, Reducer } from 'react';
import { RouteComponentProps, useLocation, useNavigate } from '@reach/router';
import ClamGameBoard from '../../../../components/ClamGameBoard';
import SpinnerButton from '../../../../components/SpinnerButton';
import BitcoinValue from '../../../../components/BitcoinValue';
import BetAmountControl from '../../../../components/BetAmountControl';
import { formatBitcoin } from '../../../../common/util/format.util';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import styles from './ClamGame.module.scss';
import { useMutation, useQuery } from '@apollo/client';
import { SETUP_CLAMS } from '../../../../graphql/queries';
import { useStateValue } from '../../../../state';
import { ClamGameAction, clamGameReducer, ClamGameState, getInitialState } from './lib/reducer';
import { MAKE_BET_CLAMS } from '../../../../graphql/mutations';
import { error as errorToast, info, success } from '../../../../components/Toast';
import { appConfig } from '../../../../common/config';
import { ClamsGameState as GameState } from '../../../../models/clamsGameState.model';
import Bitcoin from '../../../../components/icons/social/Bitcoin';
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error';

interface IProps {
  loadingBet?: boolean;
  he?: number;
  loadingSetup?: boolean;
  errorSetup?: any;
  onPlaceBet?: (betAmount: number, selection: number[]) => void;
  errorBet?: any;
  result?: number;
  setResult?: (result: number) => void;
  multiplier?: number;
  profit?: number;
}

const ClamGame: React.FC<IProps> = ({
  loadingBet,
  loadingSetup,
  he = 0.01,
  errorSetup,
  onPlaceBet = () => null,
  errorBet,
  result = -1,
  setResult = () => null,
  multiplier = 49.748,
  profit = 0.00773,
}) => {
  const [{ auth }] = useStateValue();
  const { t } = useTranslation(['games']);
  const [state, dispatch] = useReducer<Reducer<ClamGameState, ClamGameAction>>(
    clamGameReducer,
    getInitialState(he)
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (auth.state !== 'SIGNED_IN') {
      dispatch({ type: 'RESET' });
    }
  }, [auth.state]);

  useEffect(() => {
    if (errorBet) {
      dispatch({ type: 'END' });
    }
  }, [errorBet]);

  useEffect(() => {
    if (result !== -1) {
      const resultTimer = setTimeout(() => {
        dispatch({
          type: 'SET_GAME_STATE',
          payload: {
            gameState: state.selection.includes(result) ? GameState.WON : GameState.LOST,
            result,
          },
        });
      }, appConfig.clamsGameTimeout / 2);

      const gameStateTimer = setTimeout(() => {
        dispatch({ type: 'END' });
      }, appConfig.clamsGameTimeout);

      return () => {
        clearTimeout(resultTimer);
        clearTimeout(gameStateTimer);
      };
    }
  }, [result]);

  if (loadingSetup) {
    return <Loading className={styles.loading} />;
  } else if (state.he !== he) {
    dispatch({ type: 'SET_HE', payload: { he } });
  }

  if (errorSetup) {
    return <Error />;
  }

  const handlePlaceBet = async () => {
    if (auth.state !== 'SIGNED_IN') {
      return await navigate(`${pathname}?dialog=sign-in`);
    }

    dispatch({ type: 'START' });

    onPlaceBet(state.amount, state.selection);
  };

  const renderGameResultMessage = () => {
    if (state.gameState === GameState.IDLE) return null;

    if (state.gameState === GameState.WON)
      return (
        <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
          <div
            className={clsx(
              'col-12 col-xl-4 col-md-6',
              styles.game_result__message_box,
              styles.game_result__message_box__won
            )}
          >
            <div className="row">
              <div className={clsx('col', styles.game_result__message_box__won__title)}>
                You Win!
              </div>
            </div>

            <div className="row">
              <div
                className={clsx(
                  'col',
                  styles.text_align__right,
                  styles.game_result__message_box__won__multiplier
                )}
              >
                &times;&nbsp;{multiplier}
              </div>

              <div className={clsx('col', styles.text_align__left)}>
                <Bitcoin className={clsx(styles.icon, styles.icon__bitcoin)} />
                {formatBitcoin(profit)}
              </div>
            </div>
          </div>
        </div>
      );

    return (
      <div className={clsx('row', styles.game_result__row, styles.margin__horizontal_auto)}>
        <div
          className={clsx(
            'col-12 col-xl-4 col-md-6',
            styles.game_result__message_box,
            styles.game_result__message_box__lost
          )}
        >
          <div className="row">
            <div className={clsx('col', styles.game_result__message_box__lost__title)}>
              Uh, oh... Try again!
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={clsx('container', styles.board__container)}>
        <ClamGameBoard
          className={styles.board}
          selection={state.selection}
          setSelection={selection => {
            if (state.gameState !== GameState.IDLE) {
              setResult(-1);
              dispatch({ type: 'RESET', payload: { restart: true } });
            }

            dispatch({ type: 'SELECT_CLAMS', payload: { selection } });
          }}
          isEnded={state.gameState !== GameState.IDLE}
          winningIndex={state.winningIndex}
        />
      </div>

      <div className={styles.controls__wrapper}>
        <div className="container">
          <div
            className={clsx('row', styles.margin__horizontal_auto)}
            style={{ visibility: state.gameState === GameState.IDLE ? 'visible' : 'hidden' }}
          >
            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__left)}>
                <div className={styles.profit__label}>
                  {t('clam.profit')}&nbsp;(&times;&nbsp;{state.multiplier.toFixed(3)})
                </div>
                <div>
                  <BitcoinValue value={formatBitcoin(state.profit)} />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className={clsx(styles.profit__container, styles.align_items__right)}>
                <div className={styles.profit__label}>{t('clam.selected')}</div>
                <div>{state.selection.length}</div>
              </div>
            </div>
          </div>

          {renderGameResultMessage()}

          <div className={clsx('row', styles.justify_content__center)}>
            <div className={clsx('col-12 col-xl-4', styles.amount__container)}>
              <BetAmountControl
                label={t('clam.amount')}
                amount={state.amount}
                min={0.00000001}
                max={auth.user?.balance ?? 15}
                onChange={amount => dispatch({ type: 'SET_AMOUNT', payload: { amount } })}
              />
            </div>

            <div className={clsx(styles.controls__button, 'col-12 col-xl-4')}>
              <SpinnerButton
                onClick={handlePlaceBet}
                loading={loadingBet || state.isRunning}
                disabled={state.selection.length < 1 || state.gameState !== GameState.IDLE}
              >
                start
              </SpinnerButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClamGame;

export const ClamGameWithData: React.FC<RouteComponentProps> = () => {
  const [, dispatch] = useStateValue();
  const { data, loading: loadingSetup, error: errorSetup } = useQuery(SETUP_CLAMS);
  const [makeBetClams, { loading: loadingBet }] = useMutation(MAKE_BET_CLAMS);
  const [result, setResult] = useState<number>(-1);
  const [multiplier, setMultiplier] = useState();
  const [profit, setProfit] = useState();
  const [error, setError] = useState();

  const handlePlaceBet = async (betAmount: number, selection: number[]) => {
    const { data, errors } = await makeBetClams({ variables: { betAmount, selection } });

    if (errors || data.makeBetClams?.errors) {
      setError(errors ?? data.makeBetClams?.errors);

      if (data.makeBetClams?.errors[0]?.code === 'MAX_PROFIT') {
        return errorToast('Your bet may reaches the profit limit.');
      }

      return errorToast("Your bet couldn't be placed, please try again.");
    }

    setResult(data?.makeBetClams?.result);
    setMultiplier(data?.makeBetClams?.multiplier);
    setProfit(data?.makeBetClams?.profit);

    setTimeout(() => {
      dispatch({ type: 'AUTH_UPDATE_USER', payload: { balance: data?.makeBetClams?.balance } });
      const toast = `Your balance has been updated: ${formatBitcoin(+data?.makeBetClams?.profit)}`;
      if (+data?.makeBetClams?.profit >= 0) {
        success(toast);
      } else {
        info(toast);
      }
    }, appConfig.clamsGameTimeout);
  };

  return (
    <ClamGame
      he={data?.setupClams?.he}
      loadingSetup={loadingSetup}
      loadingBet={loadingBet}
      errorSetup={errorSetup}
      onPlaceBet={handlePlaceBet}
      errorBet={error}
      result={result}
      setResult={setResult}
      multiplier={multiplier}
      profit={profit}
    />
  );
};

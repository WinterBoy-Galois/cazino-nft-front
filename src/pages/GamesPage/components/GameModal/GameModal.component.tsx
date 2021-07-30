import React from 'react';
import Modal from '../../../../components/Modal';
import { CustomPage } from '../../../CustomPage';
import { useTranslation } from 'react-i18next';

export type GameType = 'diceGame' | 'goalGame' | 'clamGame' | 'minesGame';

interface Props {
  show: boolean;
  onClose?: () => void;
  fileName: GameType;
}

export const GameModalComponent: React.FC<Props> = ({ show, onClose, fileName }) => {
  const { t } = useTranslation('modals');
  const title = t(`games.${fileName}`);

  return (
    <Modal show={show} onClose={onClose} title={title} modalClassName="warning">
      <CustomPage fileName={fileName} raw />
    </Modal>
  );
};

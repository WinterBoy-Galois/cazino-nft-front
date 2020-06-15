import React from 'react';

interface IProps {
  fieldCount: number;
  minePositions: number[];
  openedFields: number[];
}

const MinesBetResults: React.FC<IProps> = ({ fieldCount, minePositions, openedFields }) => {
  return <div>Mines</div>;
};

export default MinesBetResults;

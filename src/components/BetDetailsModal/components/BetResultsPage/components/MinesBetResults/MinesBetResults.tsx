import React from 'react';

interface IProps {
  fieldCount: number;
  minePositions: number[];
  openedFields: number[];
}

const MinesBetResults: React.FC<IProps> = ({ fieldCount, minePositions, openedFields }) => {
  return (
    <div>
      {Array.from(new Array(fieldCount)).map((_, fieldIndex) => (
        <div key={fieldIndex}>
          <span>{fieldIndex}</span> |
          <span>{minePositions.includes(fieldIndex) ? 'Mine' : 'Cash'}</span> |
          <span>{openedFields.includes(fieldIndex) ? 'Open' : 'Closed'}</span>
        </div>
      ))}
    </div>
  );
};

export default MinesBetResults;

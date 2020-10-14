import React from 'react';
import DetailsContainer from '../../../DetailsContainer';
import DetailList from '../../../DetailList';
import { Detail } from '../../../DetailList/lib/detail';

interface IProps {
  details?: Detail[];
}

const BetResultDetails: React.FC<IProps> = ({ details }) => {
  return (
    <DetailsContainer>
      <DetailList details={details} />
    </DetailsContainer>
  );
};

export default BetResultDetails;

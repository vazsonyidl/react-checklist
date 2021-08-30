import React from 'react';
import CheckListElement from '../CheckListElement/CheckListElement';

const CheckList = ({checks}) => {
  return (
    <div>
      {
        checks
          .map((check) => (<CheckListElement key={check.id} check={check}/>))
      }
    </div>
  );
};

export default CheckList;

import React from 'react';
import CheckListElement from '../CheckListElement/CheckListElement';

const CheckList = ({checks, clickHandler}) => {
  return (
    <div>
      {
        checks
          .map(check => (<CheckListElement key={check.id} check={check} clickHandler={clickHandler}/>))
      }
    </div>
  );
};

export default CheckList;

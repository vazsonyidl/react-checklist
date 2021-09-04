import React from 'react';

import CheckListElement from '../CheckListElement/CheckListElement';

const CheckList = ({ checks, clickHandler }) => {
  const elements = [];
  const setRef = (ref) => elements.push(ref);

  const onArrowDown = (id) => {
    const idx = checks.findIndex((check) => check.id === id);
    elements[idx >= elements.length - 1 ? idx : idx + 1].focus();
  };

  const onArrowUp = (id) => {
    const idx = checks.findIndex((check) => check.id === id);
    elements[idx >= 1 ? idx - 1 : 0].focus();
  };

  return (
    <div>
      {
        checks
          .map((check) => (
            <CheckListElement
              key={check.id}
              check={check}
              clickHandler={clickHandler}
              setRef={setRef}
              onArrowDown={onArrowDown}
              onArrowUp={onArrowUp}
            />
          ))
      }
    </div>
  );
};

export default CheckList;

import React from 'react';

import CheckListElement from '../CheckListElement/CheckListElement';

const CheckList = ({ checks, clickHandler }) => {
  const elementRefs = [];
  const setRef = ref => elementRefs.push(ref);

  const onArrowDown = id => {
    const prevFocusedIndex = checks.findIndex((check) => check.id === id);
    elementRefs[prevFocusedIndex >= elementRefs.length - 1 ? prevFocusedIndex : prevFocusedIndex + 1].focus();
  };

  const onArrowUp = id => {
    const prevFocusedIndex = checks.findIndex((check) => check.id === id);
    elementRefs[prevFocusedIndex >= 1 ? prevFocusedIndex - 1 : 0].focus();
  };

  return (
    <>
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
    </>
  );
};

export default CheckList;

import React from 'react';

import CheckListElement from '../CheckListElement/CheckListElement';
import {ICheck} from '../../App';

interface ICheckListProps {
  checks: Array<ICheck>;
  clickHandler: Function;
}

const CheckList = ({checks, clickHandler}: ICheckListProps) => {
  const elementRefs: Array<HTMLDivElement> = [];
  const setRef = (ref: HTMLDivElement) => elementRefs.push(ref);

  const onArrowDown = (id: string) => {
    const prevFocusedIndex = checks.findIndex((check) => check.id === id);
    elementRefs[prevFocusedIndex >= elementRefs.length - 1 ? prevFocusedIndex : prevFocusedIndex + 1].focus();
  };

  const onArrowUp = (id: string) => {
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

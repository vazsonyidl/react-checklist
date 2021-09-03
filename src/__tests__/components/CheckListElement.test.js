import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {render, unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';

import CheckListElement from '../../components/CheckListElement/CheckListElement';

const dummyCheck = {
  id: 'aaa',
  priority: 7,
  description: 'Some yellow rubber duck to bath with!',
  resolution: null,
  disabled: false
};

const dummySetRef = jest.fn();

describe('Check list element', () => {
  let container = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('renders the check description', () => {
    act(() => {
      render(<CheckListElement check={dummyCheck} setRef={dummySetRef}/>, container);
    });
    expect(container.querySelector('[data-testid="check-description"]').textContent).toEqual(dummyCheck.description);
  });

  it('dispatch click events', () => {
    const clickHandler = jest.fn();
    act(() => {
      render(<CheckListElement check={dummyCheck} setRef={dummySetRef} clickHandler={clickHandler}/>, container);
    });

    const yesBtn = container.querySelector('[data-testid="check-yes-btn"]');
    expect(yesBtn.textContent).toEqual('Yes');
    act(() => {
      yesBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(clickHandler).toHaveBeenCalledWith(dummyCheck.id, true);

    const noBtn = container.querySelector('[data-testid="check-no-btn"]');
    expect(noBtn.textContent).toEqual('No');
    act(() => {
      noBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(clickHandler).toHaveBeenCalledTimes(2);
    expect(clickHandler).toHaveBeenCalledWith(dummyCheck.id, false);
  });

  it('prevents dispatch click events if the element is disabled', () => {
    const clickHandler = jest.fn();
    act(() => {
      render(<CheckListElement check={{...dummyCheck, disabled: true}} setRef={dummySetRef}
                               clickHandler={clickHandler}/>, container);
    });

    const yesBtn = container.querySelector('[data-testid="check-yes-btn"]');
    expect(yesBtn.textContent).toEqual('Yes');
    act(() => {
      yesBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(clickHandler).not.toHaveBeenCalled();
  });

  it('should handle key downs', () => {
    const clickHandler = jest.fn();
    const onArrowUp = jest.fn();
    const onArrowDown = jest.fn();
    act(() => {
      render(<CheckListElement check={dummyCheck} setRef={dummySetRef} clickHandler={clickHandler}
                               onArrowDown={onArrowDown} onArrowUp={onArrowUp}/>, container);
    });

    // handle when pressing button '1' - select Yes
    act(() => {
      const placeholder = container.querySelector('.container');
      ReactTestUtils.Simulate.keyDown(placeholder, {key: '1'});
    });
    expect(clickHandler).toHaveBeenCalledWith(dummyCheck.id, true);

    // handle when pressing button '2' - select No
    act(() => {
      const placeholder = container.querySelector('.container');
      ReactTestUtils.Simulate.keyDown(placeholder, {key: '2'});
    });
    expect(clickHandler).toHaveBeenCalledWith(dummyCheck.id, false);

    // handle when pressing arrow up
    act(() => {
      const placeholder = container.querySelector('.container');
      ReactTestUtils.Simulate.keyDown(placeholder, {key: 'ArrowUp'});
    });
    expect(onArrowUp).toHaveBeenCalledWith(dummyCheck.id);

    // handle when pressing arrow down
    act(() => {
      const placeholder = container.querySelector('.container');
      ReactTestUtils.Simulate.keyDown(placeholder, {key: 'ArrowDown'});
    });
    expect(onArrowUp).toHaveBeenCalledWith(dummyCheck.id);

  });
});

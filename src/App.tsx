import React, {useState, useEffect, useCallback} from 'react';

import {fetchChecks, submitCheckResults} from './api';
import CheckList from './components/CheckList/CheckList';
import Button from './components/Button/Button';
import ErrorCard from './components/ErrorCard/ErrorCard';
import './styles.scss';

interface ICheckResponse {
  id: string;
  priority: number;
  description: string;
}

export interface ICheck extends ICheckResponse {
  resolution: boolean | null;
  disabled: boolean;
}

export default function App() {
  const [checks, setChecks] = useState<Array<ICheck>>([]);
  const [fetchSuccess, setFetchSuccess] = useState<boolean | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const getChecks = useCallback(async () => {
    await fetchChecks()
      .then((fetchedChecks) => {
        const sortedChecks = sortByPriority(fetchedChecks);
        const extendedChecks = appendProperties(sortedChecks);
        setChecks(extendedChecks);
        setFetchSuccess(true);
      })
      .catch((error) => setFetchSuccess(error?.success));
  }, []);

  useEffect(() => {
    void getChecks();
  }, [getChecks]);

  useEffect(() => {
    setSubmitDisabled(!(checks.every(check => check.resolution === true) || checks.some(check => check.resolution === false)));
  }, [checks]);

  const onSubmit = async () => {
    const checkValues = checks.reduce((accumulator: Array<{ checkId: string; result: string }>, check) => {
      accumulator.push({checkId: check.id, result: check.resolution ? 'yes' : 'no'});
      return accumulator;
    }, []);

    await submitCheckResults(checkValues)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitSuccess(false));
  };

  const sortByPriority = (elements: Array<ICheck>) => {
    return elements.sort((a, b) => b.priority - a.priority);
  };

  const appendProperties = (elements: Array<ICheckResponse>) => {
    return elements.map((check, index) => ({...check, disabled: index !== 0, resolution: null}));
  };

  const clickHandler = (id: string, resolution: boolean) => {
    const updatedElements = resolution ? handleAcceptClick(id, resolution) : handleDeclineClick(id, resolution);
    setChecks(sortByPriority(updatedElements));
  };

  const handleAcceptClick = (id: string, resolution: boolean) => {
    return [
      ...enableAnsweredElements(id),
      ...handleUnAnsweredElements(id),
      ...setCurrentElement(id, resolution),
    ];
  };

  const handleDeclineClick = (id: string, resolution: boolean) => {
    const updatedIndex = checks.findIndex(check => check.id === id);
    return [
      ...checks.filter((_, index) => index < updatedIndex),
      ...disableRestElements(updatedIndex),
      ...setCurrentElement(id, resolution)
    ];
  };

  const handleUnAnsweredElements = (id: string) => {
    const unAnswered = checks.filter(check => check.resolution === null && check.id !== id);
    return [...unAnswered.slice(0, 1).map(check => ({...check, disabled: false})), ...unAnswered.slice(1)];
  };

  const enableAnsweredElements = (id: string) => {
    return checks.filter(check => check.resolution !== null && check.id !== id).map(check => ({
      ...check,
      disabled: false
    }));
  };

  const disableRestElements = (updatedIndex: number) => {
    return checks.filter((_, index) => index > updatedIndex).map(check => ({...check, disabled: true}));
  };

  const setCurrentElement = (id: string, resolution: boolean) => {
    return checks.filter(check => check.id === id).map(check => ({...check, resolution}));
  };

  return (
    <section className="App" role="article">
      {fetchSuccess === false && (
        <ErrorCard error={'An error occurred'} buttonText={'Try again'} clickHandler={getChecks}/>
      )}
      {fetchSuccess && (<>
          <CheckList checks={checks} clickHandler={clickHandler}/>
          <section className="submit-container">
            <Button children={'Submit'} disabled={submitDisabled} type="submit" onClick={onSubmit}/>
          </section>
        </>
      )}
      {submitSuccess && <div>Submission was successful!</div>}
      {submitSuccess === false &&
      <ErrorCard error={'An error occurred'} buttonText={'Submit again'} clickHandler={onSubmit}/>}
    </section>
  );
}

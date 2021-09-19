import React, {useState, useEffect, useCallback} from 'react';

import {fetchChecks, submitCheckResults} from './api';
import CheckList from './components/CheckList/CheckList';
import Button from './components/Button/Button';
import ErrorCard from './components/ErrorCard/ErrorCard';
import './styles.css';

export default function App() {
  const [checks, setChecks] = useState([]);
  const [fetchSuccess, setFetchSuccess] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    const checkValues = checks.reduce((accumulator, check) => {
      accumulator.push({checkId: check.id, result: check.resolution ? 'yes' : 'no'});
      return accumulator;
    }, []);

    await submitCheckResults(checkValues)
      .then(() => setSubmitSuccess(true))
      .catch(() => setSubmitSuccess(false))
  };

  const sortByPriority = elements => {
    return elements.sort((a, b) => b.priority - a.priority);
  };

  const appendProperties = elements => {
    return elements.map((check, index) => ({...check, disabled: index !== 0, resolution: null}));
  };

  const clickHandler = (id, resolution) => {
    const updatedElements = resolution ? handleAcceptClick(id, resolution) : handleDeclineClick(id, resolution);
    setChecks(sortByPriority(updatedElements));
  };

  const handleAcceptClick = (id, resolution) => {
    return [
      ...enableAnsweredElements(id),
      ...handleUnAnsweredElements(id),
      ...setCurrentElement(id, resolution),
    ];
  };

  const handleDeclineClick = (id, resolution) => {
    const updatedIndex = checks.findIndex(check => check.id === id);
    return [
      ...checks.filter((_, index) => index < updatedIndex),
      ...disableRestElements(updatedIndex),
      ...setCurrentElement(id, resolution)
    ];
  };

  const handleUnAnsweredElements = (id) => {
    const unAnswered = checks.filter(check => check.resolution === null && check.id !== id);
    return [...unAnswered.slice(0, 1).map(check => ({...check, disabled: false})), ...unAnswered.slice(1)];
  };

  const enableAnsweredElements = (id) => {
    return checks.filter(check => check.resolution !== null && check.id !== id).map(check => ({
      ...check,
      disabled: false
    }));
  };

  const disableRestElements = updatedIndex => {
    return checks.filter((_, index) => index > updatedIndex).map(check => ({...check, disabled: true}));
  };

  const setCurrentElement = (id, resolution) => {
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
            <Button children={'Submit'} disabled={submitDisabled} type='submit' onClick={onSubmit}/>
          </section>
        </>
      )}
      {submitSuccess && <div>Submission was successful!</div>}
      {submitSuccess === false && <ErrorCard error={'An error occurred'} buttonText={'Submit again'} clickHandler={onSubmit}/>}
    </section>
  );
}

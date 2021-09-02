import React, {useState, useEffect} from 'react';
import './styles.css';
import {fetchChecks} from './api';
import CheckList from './components/CheckList/CheckList';
import Button from './components/Button/Button';

export default function App() {
  const [checks, setChecks] = useState([]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const getChecks = async () => {
      const checksFromApi = await fetchChecksFromApi();
      const sortedChecks = sortChecksByPriority(checksFromApi);
      const extendedChecks = appendCheckProperties(sortedChecks);
      setChecks(extendedChecks);
    };

    void getChecks();
  }, []);

  useEffect(() => {
    setSubmitDisabled(!(checks.every(check => check.resolution === true) || checks.some(check => check.resolution === false)));
  }, [checks]);

  const fetchChecksFromApi = () => {
    return fetchChecks();
  };

  const sortChecksByPriority = checks => {
    return [...checks].sort((a, b) => b.priority - a.priority);
  };

  const appendCheckProperties = checks => {
    return [...checks].map((check, index) => ({...check, disabled: index !== 0, resolution: null}));
  };

  const clickHandler = (id, resolution) => {
    const updatedIndex = checks.findIndex(check => check.id === id);
    let updatedElements;
    if (resolution) {
      updatedElements = [
        ...checks.filter((check, index) => !(check.id === id || index === updatedIndex + 1)),
        ...enableNextCheck(updatedIndex),
        ...setResolution(id, resolution)
      ];
    } else {
      updatedElements = [
        ...checks.filter((_, index) => index < updatedIndex),
        ...disableLeftOverChecks(updatedIndex),
        ...setResolution(id, resolution)
      ];
    }
    setChecks(sortChecksByPriority(updatedElements));
  };

  const enableNextCheck = updatedIndex => {
    return [...checks].filter((check, index) => updatedIndex + 1 === index).map(check => ({...check, disabled: false}));
  };

  const disableLeftOverChecks = updatedIndex => {
    return [...checks].filter((_, index) => index > updatedIndex).map(check => ({...check, disabled: true}));
  };

  const setResolution = (id, resolution) => {
    return [...checks].filter(check => check.id === id).map(check => ({...check, resolution}));
  };

  return (
    <div className="App">
      <CheckList checks={checks} clickHandler={clickHandler}/>
      <section className="submit-container">
        <Button children={'Submit'} disabled={submitDisabled}/>
      </section>
    </div>
  );
}

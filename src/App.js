import React, { useState, useEffect } from "react";
import "./styles.css";
import { fetchChecks } from "./api";
import CheckList from './components/CheckList/CheckList';

export default function App() {
  const [checks, setChecks] = useState([]);
 
  useEffect(() => {
    const getChecks = async () => {
        const checksFromApi = await fetchChecksFromApi();
        setChecks(sortChecksByPriority(checksFromApi));
    }

    void getChecks();
  }, []);

  const fetchChecksFromApi = async () => {
    const checks = await fetchChecks();
    return checks;
  }

  const sortChecksByPriority = (checks) => {
    return [...checks].sort((a, b) => b.priority - a.priority);
  }

  return (
    <div className="App">
      <CheckList checks={checks}/>
    </div>
  );
}

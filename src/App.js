import React, { useState, useEffect } from 'react';
import SearchComponent from './SearchComponent';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import './App.css';

function App() {

  const [records, setRecords] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "id", reversed: false });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:44393/api/person/GetRecords?stringToMatch=`
      );

      const data = await response.json();
      setRecords(data);
    };
    fetchData();

  }, []);

  const handleSearch = ({ searchTerm, searchCriteria }) => {

    const fetchData = async () => {
      const response = await fetch(
        `https://localhost:44393/api/person/GetRecords?stringToMatch=${searchTerm}&searchCriteria=${searchCriteria}`
      );
      const data = await response.json();
      setRecords(data);
      console.log("Records");
      console.log(records);
      return false;
    };
    fetchData();
  };

  const renderArrow = () => {
    if (sorted.reversed) {
      return <FaArrowUp />;
    }
    return <FaArrowDown />;
  };

  const renderRecords = () => {
    return records.map((record) => {
      return (
        <tr>
          <td>{record.id}</td>
          <td>{`${record.fullName}`}</td>
          <td>{record.createdOnUtc}</td>
          <td>{record.modifiedOnUtc}</td>
        </tr>
      );
    });
  };

  const sortById = () => {
    const recordsCopy = [...records];
    recordsCopy.sort((recordA, recordB) => {
      if (sorted.reversed) {
        return recordA.id - recordB.id;
      }
      return recordB.id - recordA.id;
    });
    setRecords(recordsCopy);
    setSorted({ sorted: "id", reversed: !sorted.reversed });
  };

  const sortByName = () => {
    const recordsCopy = [...records];
    recordsCopy.sort((recordA, recordB) => {
      const recordfullNameA = `${recordA.fullName}`;
      const recordfullNameB = `${recordB.fullName}`;
      if (sorted.reversed) {
        return recordfullNameB.localeCompare(recordfullNameA);
      }
      return recordfullNameA.localeCompare(recordfullNameB);
    });
    setRecords(recordsCopy);
    setSorted({ sorted: "fullName", reversed: !sorted.reversed });
  };

  const sortByCreatedOn = () => {
    const recordsCopy = [...records];
    recordsCopy.sort((recordA, recordB) => {
      const dateA = new Date(`${recordA.createdOnUtc}`);
      const dateB = new Date(`${recordB.createdOnUtc}`);
      if (sorted.reversed) {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
    setRecords(recordsCopy);
    setSorted({ sorted: "createdOnUtc", reversed: !sorted.reversed });
  };


  const sortByModifiedOn = () => {
    const recordsCopy = [...records];
    recordsCopy.sort((recordA, recordB) => {
      const dateA = new Date(`${recordA.modifiedOnUtc}`);
      const dateB = new Date(`${recordB.modifiedOnUtc}`);
      if (sorted.reversed) {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
    setRecords(recordsCopy);
    setSorted({ sorted: "modifiedOnUtc", reversed: !sorted.reversed });
  };

  return (
    <div className="App">
      <SearchComponent onSubmit={handleSearch}></SearchComponent>
      <div className="row">        
          <table>
            <thead>
              <tr>
                <th onClick={sortById}>
                  <span style={{ marginRight: 10 }}>Id</span>
                  {sorted.sorted === "id" ? renderArrow() : null}
                </th>
                <th onClick={sortByName}>
                  <span style={{ marginRight: 10 }}>FullName</span>
                  {sorted.sorted === "fullName"
                    ? renderArrow()
                    : null}
                </th>
                <th onClick={sortByCreatedOn}>
                  <span style={{ marginRight: 10 }}>CreatedOnUtc</span>
                  {sorted.sorted === "createdOnUtc" ? renderArrow() : null}
                </th>
                <th onClick={sortByModifiedOn}>
                  <span style={{ marginRight: 10 }}>ModifiedOnUtc</span>
                  {sorted.sorted === "modifiedOnUtc" ? renderArrow() : null}
                </th>
              </tr>
            </thead>
            <tbody>{renderRecords()}</tbody>
          </table>        
      </div>
    </div>
  );
}

export default App;

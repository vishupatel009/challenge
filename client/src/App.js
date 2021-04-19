import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const USER_URL = "http://localhost:8080/users";
const AGE_URL = "http://localhost:8080/users/age/";

var requestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  redirect: "follow"
};

function App() {
  const [users, setUsers] = useState([]);
  const [usersWithAges, setUsersWithAges] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Item");
  const [ageWithCount, setAgeWithCount] = useState([]);

  useEffect(() => {
    if (!users.length) {
      fetch(USER_URL, requestOptions)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => console.log("error", error));
      fetch(AGE_URL, requestOptions)
        .then(response => response.json())
        .then(data => setUsersWithAges(["Item", ...data]))
        .catch(error => console.log("error", error));
    }
  }, [users, usersWithAges]);

  const handleSelect = item => {
    setSelectedOption(item);
    fetch(`${AGE_URL}${item}`, requestOptions)
      .then(response => response.json())
      .then(data => setAgeWithCount(data));
  };

  return (
    <div className="App">
      <header className="App-header">
        <>
          <div>
            <h2>All users</h2>
            <p>Users and their age</p>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>User name</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  {users.map((user, index) => (
                    <tr key={index}> {user.username}</tr>
                  ))}
                </td>
                <td>
                  {users.map((user, index) => (
                    <tr key={index}> {user.age}</tr>
                  ))}
                </td>
              </tbody>
            </Table>
            <h2>Age Demograpihc of Users with ___</h2>
            <DropdownButton
              menuAlign="left"
              className="dropdown-container mb-2"
              title={selectedOption}
            >
              {usersWithAges.map(item => (
                <Dropdown.Item onClick={() => handleSelect(item)}>
                  {item}
                </Dropdown.Item>
              ))}
            </DropdownButton>

            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Age</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>
                <td>
                  {ageWithCount?.map((user, index) => (
                    <tr key={index}> {user.age}</tr>
                  ))}
                </td>
                <td>
                  {ageWithCount?.map((user, index) => (
                    <tr key={index}> {user.count}</tr>
                  ))}
                </td>
              </tbody>
            </Table>
          </div>
        </>
      </header>
    </div>
  );
}

export default App;

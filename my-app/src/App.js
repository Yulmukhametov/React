import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './SearchBar';
import SortButton from './SortButton';
import Modal from './Modal';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
      const data = await response.json();
      setUsers(data.users);
    };

    fetchData();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
  };

  const sortedUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice().sort((a, b) => {
    if (sortColumn) {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  return (
    <div className="App">
      <h1>Пользователи</h1>
      <SearchBar onSearch={handleSearch} />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('firstName')}>
              ФИО <SortButton direction={sortColumn === 'firstName' ? sortDirection : ''} />
            </th>
            <th onClick={() => handleSort('age')}>
              Возраст <SortButton direction={sortColumn === 'age' ? sortDirection : ''} />
            </th>
            <th onClick={() => handleSort('gender')}>
              Пол <SortButton direction={sortColumn === 'gender' ? sortDirection : ''} />
            </th>
            <th onClick={() => handleSort('phone')}>
              Номер телефона <SortButton direction={sortColumn === 'phone' ? sortDirection : ''} />
            </th>
            <th>
             Адрес
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index} onClick={() => handleRowClick(user)}>
              <td>
                <p>{`${user.firstName} ${user.lastName} ${user.maidenName}`}</p>
              </td>
              <td>
                <p>{user.age}</p>
              </td>
              <td>
                <p>{user.gender}</p>
              </td>
              <td>
                <p>{user.phone}</p>
              </td>
              <td>
                <p>{`${user.address.city}, ${user.address.address}`}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
};

export default App;

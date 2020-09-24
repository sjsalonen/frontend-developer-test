import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import './App.css';

import Table from './Table';

const fetchUsersData = async () => {
  return await api.getUsersDiff();
};

const fetchProjectsData = async () => {
  return await api.getProjectsDiff();
}


export const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [usersSortBy, setUsersSortBy] = useState('newestToOldest');
  const [projectsSortBy, setProjectsSortBy] = useState('newestToOldest');
  const [usersError, setUsersError] = useState(false);
  const [usersLoading, setUsersLoading] = useState(false);
  const [projectsError, setProjectsError] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(false);
  useEffect(() => {
    fetchUsersData().then(res => {
      setUsersData(d => d.concat(res.data));
    });
    fetchProjectsData().then(res => {
      setProjectsData(d => d.concat(res.data));
    })
  }, []);
  const fetchMore = (which) => {
    const func = which === "users" ? fetchUsersData : fetchProjectsData;
    const loadFunc = which === "users" ? setUsersLoading : setProjectsLoading;
    const errorFunc = which === "users" ? setUsersError : setProjectsError;
    loadFunc(true);
    errorFunc(false);
    func()
    .then(res => {
      setUsersData(usersData.concat(res.data));
      errorFunc(false);
      loadFunc(false);
    })
    .catch(() => {
      errorFunc(true);
      loadFunc(false);
    });
  }
  const sortData = (sort) => {
    const data = sort === "users" ? usersData : projectsData;
    const sortBy = sort === "users" ? usersSortBy : projectsSortBy;
    if (sortBy === 'newestToOldest') {
      return data.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      return data.sort((a, b) => b.timestamp - a.timestamp);
    }
  }
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <h1>Users</h1>
        <h2>Click on "Date" to sort by date</h2>
        <Table data={sortData("users")} setSortBy={setUsersSortBy} sortBy={usersSortBy} />
        <div className="user-actions">
          {!usersLoading && !usersError &&
          <Button className="users-loadmore-button" variant="contained" color="primary" onClick={() => fetchMore("users")}>
            Load more
          </Button>
          }
          {usersLoading &&
            <CircularProgress className="loader" color="primary" />
          }
          {usersError &&
            <div>
              <div className="error-text">
                We had problems fetching your data. Please try again.
              </div>
              <Button className="retry-button" variant="contained" color="primary" onClick={() => fetchMore("users")}>
                Retry
              </Button>
            </div>
          }
        </div>
        <h1>Projects</h1>
        <h2>Click on "Date" to sort by date</h2>
        <Table data={sortData("projects")} setSortBy={setProjectsSortBy} sortBy={projectsSortBy} />
        <div className="projects-actions">
          {!projectsLoading && !projectsError &&
          <Button className="projects-loadmore-button" variant="contained" color="primary" onClick={() => fetchMore("projects")}>
            Load more
          </Button>
          }
          {projectsLoading &&
            <CircularProgress className="loader" color="primary" />
          }
          {projectsError &&
            <div>
              <div className="error-text">
                We had problems fetching your data. Please try again.
              </div>
              <Button claassName="retry-button" variant="contained" color="primary" onClick={() => fetchMore("projects")}>
                Retry
              </Button>
            </div>
          }
        </div>
      </Box>
    </Container>
  );
};

export default App;

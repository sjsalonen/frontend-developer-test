import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../lib/api';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import Table from './Table';

const fetchProjectsData = async () => {
    return await api.getProjectsDiff();
}

const StyledButton = styled(Button)`
  left: 45%;
`

const StyledLoader = styled(CircularProgress)`
  position: absolute;
  left: 50%;
`

const ErrorText = styled.div`
  text-align: center;
  font-weight: bold;
  color: red;
`

const Headline = styled.h1`
  text-align: center;
`

const Actions = styled.div`
  margin-top: 20px;
`

export const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [sortBy, setSortBy] = useState('newestToOldest');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetchProjectsData().then(res => {
      setProjectsData(d => d.concat(res.data));
      setError(false);
      setLoading(false);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
  }, []);
  const fetchMore = () => {
    setLoading(true);
    setError(false);
    fetchProjectsData()
    .then(res => {
      setProjectsData(projectsData.concat(res.data));
      setError(false);
      setLoading(false);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
  }
  const sortData = () => {
    if (sortBy === 'newestToOldest') {
      return projectsData.sort((a, b) => a.timestamp - b.timestamp);
    } else {
      return projectsData.sort((a, b) => b.timestamp - a.timestamp);
    }
  }
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <Headline>Projects</Headline>
        <Table data={sortData()} setSortBy={setSortBy} sortBy={sortBy} />
        <Actions className="app-actions">
          {!loading && !error &&
          <StyledButton className="loadmore-button" variant="contained" color="primary" onClick={() => fetchMore()}>
            Load more
          </StyledButton>
          }
          {loading &&
            <StyledLoader className="loader" color="primary" />
          }
          {error &&
            <div>
              <ErrorText>
                We had problems fetching your data. Please try again.
              </ErrorText>
              <StyledButton variant="contained" color="primary" onClick={() => fetchMore()}>
                Retry
              </StyledButton>
            </div>
          }
        </Actions>
      </Box>
    </Container>
  );
};

export default Projects;

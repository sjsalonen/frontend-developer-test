import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';

const TableContainer = styled.div`
    margin: auto;
    max-width: 800px;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif
`

const Headers = styled(Grid)`
    font-weight: bold;
    border-bottom: 1px solid #CDCDCD;
`

const Row = styled(Grid)`
    border-bottom: 1px solid #CDCDCD;
    vertical-align: middle;
`

export const Table = (props) => {
    const setSort = () => {
        const sort = props.sortBy === 'newestToOldest' ? 'oldestToNewest' : 'newestToOldest';
        props.setSortBy(sort);
    }
    return (
        <TableContainer className="table-container">
            <Headers container spacing={3}>
                <Grid 
                    item 
                    xs={2} 
                    style={{ cursor: "pointer" }}
                    onClick={() => setSort()}
                >
                        Date
                </Grid>
                <Grid item xs={6}>User ID</Grid>
                <Grid item xs={2}>Old value</Grid>
                <Grid item xs={2}>New value</Grid>
            </Headers>
            {props.data.map(item =>
                <Row key={item.id} container spacing={3} className="table-row">
                    <Grid className="table-item" item xs={2}>{moment(item.timestamp).format("YYYY-MM-DD")}</Grid>
                    <Grid className="table-item" item xs={6}>{item.id}</Grid>
                    <Grid className="table-item" item xs={2}>{item.diff[0].oldValue}</Grid>
                    <Grid className="table-item" item xs={2}>{item.diff[0].newValue}</Grid>
                </Row>
            )}
        </TableContainer>
    )
}

export default Table;
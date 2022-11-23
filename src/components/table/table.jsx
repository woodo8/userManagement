import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useUsersQuery, useUpdateStatusMutation } from "../../services/usersApi";
import { Button, Grid, Typography } from '@mui/material';
import "./table.css"
import { StateContext } from '../../context/context';
import TableRowComp from '../tableRow/tableRow';
import { useNavigate } from 'react-router-dom';

import FaceIcon from '@mui/icons-material/Face';
export default function BasicTable() {
  const [updateStatus] = useUpdateStatusMutation()
  const { state, dispatch, data, refetch, error, isLoading, isSuccess } = React.useContext(StateContext)
  const [allChecked, setallChecked] = useState(false)
  const [user, setUser] = useState("")


  const navigate = useNavigate()
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")).name)
  }, [])

  useEffect(() => {
    console.log(user)
  }, [user])


  useEffect(() => {
    if (data?.length !== 0 && data?.length === state?.userIDs.length || data?.length < state?.userIDs.length) {
      setallChecked(true)
    } else {
      setallChecked(false)
    }

    if (data?.length === 0) {
      localStorage.removeItem("access")
      localStorage.removeItem("user")
      navigate("/auth")
    }
  }, [data, state])

  const checkAll = () => {
    allChecked ?
      data && data.map(item => {
        return dispatch({ type: "CLEAR" })
      })
      :
      data && data.map(item => {
        const valid = state.userIDs.some(id => id == item._id)
        return !valid && dispatch({ type: "ADD_USER", payload: item._id })
      })
  }

  const handleStatus = (status) => {
    console.log(JSON.parse(localStorage.getItem("user")))
    state?.userIDs.length !== 0 && state.userIDs.map(id =>
      updateStatus({ id, status })
        .unwrap()
        .then(res => {
          if (status === "Blocked") {
            if (localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))._id === id) {
              localStorage.removeItem("access")
              localStorage.removeItem("user")
              navigate("/auth")
            }
          }
          refetch()
        })
        .catch(err => console.log(err))
    )
  }
  return (
    <>
      <Grid className='tableContainer' container justifyContent="center">
        <Grid item xs={10} sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FaceIcon />
            <h4 style={{ margin: "0 10px" }}>
              {user}
            </h4>
          </div>
          <div>
            <Button onClick={() => navigate("/auth")} className='manage_btn' variant='contained'>Signin</Button>
            <Button onClick={() => {
              localStorage.removeItem("access")
              localStorage.removeItem("user")
              navigate("/auth")
            }} className='manage_btn' variant='contained'>Logout</Button>
          </div>
        </Grid>
        <Grid className='buttonsWrapper' item xs={10}>
          <Typography variant='h4'>{state.userIDs.length} users selected</Typography>
          <div>
            <Button disabled={state.userIDs.length === 0 ? true : false} onClick={() => handleStatus("Blocked")} className='manage_btn block' variant="contained">Block</Button>
            <Button disabled={state.userIDs.length === 0 ? true : false} onClick={() => handleStatus("Active")} className='manage_btn unblock' variant="contained">Unblock</Button>
            <Button disabled={state.userIDs.length === 0 ? true : false} onClick={() => handleStatus("Deleted")} className='manage_btn delete' variant="contained">Delete</Button>
          </div>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><input className='pointer' checked={allChecked} onChange={checkAll} type="checkbox" /></TableCell>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Last login</TableCell>
                  <TableCell align="right">Registered At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                <TableRow className='isErrorIsLoading'>
                  {error &&
                    <TableCell align="right">
                      <>An error occured</>
                    </TableCell>
                  }
                  {isLoading &&
                    <TableCell>
                      <>Loading...</>
                    </TableCell>
                  }
                </TableRow>
                {isSuccess && data.map((item, index) => (
                  <TableRowComp item={item} key={index} />
                ))}
                {data?.length === 0 &&
                  <Typography variant='h4' sx={{ padding: "20px" }}>
                    Currently there are no registered users
                  </Typography>
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
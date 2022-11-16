import React, { useContext, useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import moment from "moment"
import { StateContext } from '../../context/context';

export default function TableRowComp({ item }) {
    const { state, dispatch } = useContext(StateContext)
    const [checked, setChecked] = useState(false)
    const handleChange = (e, id) => {
        const checkedd = state.userIDs.some(item => item === id)
        checkedd ?
            dispatch({ type: "DELETE_USER", payload: id })
            :
            dispatch({ type: "ADD_USER", payload: id })
    }
    useEffect(() => {
        setChecked(state.userIDs.some(userID => userID === item._id))
    }, [state, checked])
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                <input className='pointer' id={item._id} checked={checked} onChange={(e) => handleChange(e, item._id)} type="checkbox" />
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}>{item._id}</label>
            </TableCell>
            <TableCell align='right'>
                <label className='pointer' htmlFor={item._id}> {item.name}</label>
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}> {item.email}</label>
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}> {item.status}</label>
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}> {item.lastLoginAt ? moment(item.lastLoginAt).calendar() : "User has not signed in"}</label>
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}>{moment(item.registeredAt).calendar()}</label>
            </TableCell>
            <TableCell align="right">
                <label className='pointer' htmlFor={item._id}>{item.protein}</label>
            </TableCell>
        </TableRow>
    )
}

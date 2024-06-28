// components/Cart.tsx
'use client'

import React, { useState } from 'react'
import {
    Box,
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { removeFromCart, selectTotalPrice } from '@/redux/cartSlice'
import Image from 'next/image'

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector(selectTotalPrice)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState<string[]>([])

    const handleRemove = (productId: string) => {
        dispatch(removeFromCart(productId))
    }

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id)
        const newSelected = [...selected]

        if (selectedIndex === -1) {
            newSelected.push(id)
        } else {
            newSelected.splice(selectedIndex, 1)
        }

        setSelected(newSelected)
    }

    return (
        <Box>
            {cartItems.length > 0 ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Your Cart
                    </Typography>
                    <Paper>
                        <TableContainer>
                            <Table sx={{ minWidth: 750 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                indeterminate={
                                                    selected.length > 0 &&
                                                    selected.length < cartItems.length
                                                }
                                                checked={selected.length === cartItems.length}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setSelected(
                                                            cartItems.map((item) => item.id),
                                                        )
                                                    } else {
                                                        setSelected([])
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>All Product</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, item.id)}
                                            role="checkbox"
                                            aria-checked={selected.indexOf(item.id) !== -1}
                                            tabIndex={-1}
                                            key={item.id}
                                            selected={selected.indexOf(item.id) !== -1}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selected.indexOf(item.id) !== -1}
                                                    color="primary"
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {item.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {typeof item.price === 'number'
                                                    ? item.price.toFixed(2)
                                                    : '-'}
                                            </TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">
                                                {typeof item.price === 'number' &&
                                                typeof item.quantity === 'number'
                                                    ? (item.price * item.quantity).toFixed(2)
                                                    : '-'}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleRemove(item.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    {selected.length > 0 && (
                        <Box mt={2}>
                            <Typography variant="h6">
                                Total Price: ${totalPrice.toFixed(2)}
                            </Typography>
                        </Box>
                    )}
                </>
            ) : (
                <Box className="flex justify-center py-12">
                    <Image src="/images/noProduct.png" width={400} height={500} alt="No Products" />
                </Box>
            )}
        </Box>
    )
}

export default Cart

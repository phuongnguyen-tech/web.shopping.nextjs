import React from 'react'
import { Box, Card, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useDispatch } from 'react-redux'
import { updateQuantity } from '@/redux/cartSlice'

interface CartItemProps {
    product: IProduct
    onRemove: (productId: string) => void
}

const CartItem: React.FC<CartItemProps> = ({ product, onRemove }) => {
    const dispatch = useDispatch()

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = parseInt(event.target.value, 10)
        if (quantity > 0) {
            dispatch(updateQuantity({ id: product.id, quantity }))
        }
    }

    const handleIncrement = () => {
        dispatch(updateQuantity({ id: product.id, quantity: product.quantity + 1 }))
    }

    const handleDecrement = () => {
        if (product.quantity > 1) {
            dispatch(updateQuantity({ id: product.id, quantity: product.quantity - 1 }))
        }
    }

    return (
        <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
            <CardMedia
                component="img"
                image={product.bannerUrl}
                alt={product.name}
                sx={{ width: 100, height: 60, objectFit: 'cover' }}
            />
            <Box sx={{ display: 'flex' }}>
                <div>
                    <Typography variant="subtitle1">{product.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        ${product.price} x {product.quantity}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton aria-label="decrement" onClick={handleDecrement}>
                            <RemoveIcon />
                        </IconButton>
                        <TextField
                            type="text"
                            size="small"
                            value={product.quantity}
                            onChange={handleQuantityChange}
                            inputProps={{ style: { textAlign: 'center' } }}
                            sx={{ width: 40, mx: 1 }}
                        />
                        <IconButton aria-label="increment" onClick={handleIncrement}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                </div>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    pr: 2,
                    pb: 2,
                }}
            >
                <IconButton aria-label="delete" onClick={() => onRemove(product.id)}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Card>
    )
}

export default CartItem

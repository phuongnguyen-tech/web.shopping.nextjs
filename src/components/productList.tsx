// ProductList.tsx
'use client'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Box, Pagination } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'

interface IProps {
    products: IProduct[]
}

export default function ProductList({ products }: IProps) {
    const [page, setPage] = useState(1)
    const itemsPerPage = 12
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedProducts = products.slice(startIndex, endIndex)

    return (
        <Box sx={{ flexGrow: 1, marginTop: 6 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {paginatedProducts.map((prod: IProduct, index: number) => (
                    <Grid item xs={2} sm={3} md={3} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={prod.name}
                                height="140"
                                image={prod.bannerUrl}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {prod.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {prod.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price: ${prod.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity: {prod.quantity}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">
                                    <Link href={`/products/${prod.id}`}>See Detail</Link>
                                </Button>
                                <Button size="small">Add Product</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <Pagination
                    count={Math.ceil(products.length / itemsPerPage)}
                    variant="outlined"
                    color="primary"
                    page={page}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    )
}

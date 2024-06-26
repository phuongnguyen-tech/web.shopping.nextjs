import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@mui/material'
import Link from 'next/link'

interface IProps {
    product: IProduct
}

export default function ProductList({ product }: IProps) {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                boxShadow: 3,
                borderRadius: 2,
                my: 6,
                maxWidth: '700px',
                mx: 'auto',
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: { xs: '100%', md: '50%' },
                    height: 'auto',
                    borderRadius: { xs: '16px 16px 0 0', md: '16px 0 0 16px' },
                }}
                image={product.bannerUrl}
                alt={product.name}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '100%', md: '50%' },
                    backgroundColor: '#fff',
                    borderRadius: { xs: '0 0 16px 16px', md: '0 16px 16px 0' },
                }}
            >
                <CardContent>
                    <Typography
                        component="h1"
                        variant="h5"
                        color="text.primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {product.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Quantity: {product.quantity}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <Typography variant="h6" color="text.primary">
                        ${product.price}
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ borderRadius: '50px' }}>
                        Buy Now
                    </Button>
                </CardActions>
            </Box>
            <CardActions>
                <Button color="error" variant="text">
                    <Link href="/">Back home</Link>
                </Button>
            </CardActions>
        </Card>
    )
}

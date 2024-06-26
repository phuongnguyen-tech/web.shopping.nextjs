// Home.tsx
import MenuHome from '@/components/menuHome'
import ProductList from '@/components/productList'
import { baseUrl } from '@/utils/baseUrl'
import { Box } from '@mui/material'

async function getProducts() {
    const res = await fetch(`${baseUrl}/products`)
    const products = await res.json()
    return products
}

export default async function Home() {
    // Fetch data directly in a Server Component
    const recentProducts = await getProducts()
    // Forward fetched data to your Client Component
    return (
        <Box className="flex">
            <MenuHome />
            <ProductList products={recentProducts} />
        </Box>
    )
}

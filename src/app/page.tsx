// Home.tsx
'use client'

import MenuHome from '@/components/menuHome'
import ProductList from '@/components/productList'
import { DataJsonUrl } from '@/utils/baseUrl'
import { Box } from '@mui/material'
import { useState, useEffect } from 'react'

async function getProducts(categoryId: string | null = null) {
    let url = `${DataJsonUrl}/products?_sort=-createdAt`
    if (categoryId) {
        url += `&categoryId=${categoryId}`
    }
    const res = await fetch(url)
    const products = await res.json()
    return products
}

export default function Home() {
    const [recentProducts, setRecentProducts] = useState<IProduct[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProducts() {
            const products = await getProducts(selectedCategory)
            setRecentProducts(products)
        }
        fetchProducts()
    }, [selectedCategory])

    return (
        <Box>
            <Box className="flex my-12">
                <MenuHome onSelectCategory={setSelectedCategory} />
                <ProductList products={recentProducts} />
            </Box>
        </Box>
    )
}

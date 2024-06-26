import { baseUrl } from '@/utils/baseUrl'
import { Box } from '@mui/material'
import Link from 'next/link'

async function getCategories() {
    const res = await fetch(`${baseUrl}/categories`)
    const categories = await res.json()
    return categories
}

async function MenuHome() {
    const categories = await getCategories()
    return (
        <Box component="section" className="mt-[50px] w-48 pl-2 pr-8">
            <h3>DANH MỤC</h3>
            <ul>
                {categories.map((cate: ICategory, index: number) => (
                    <li key={index}>
                        <Link href="/">{cate.name}</Link>
                    </li>
                ))}
            </ul>
        </Box>
    )
}

export default MenuHome

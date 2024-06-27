import { DataJsonUrl, baseUrl } from '@/utils/baseUrl'
import { Box, List, ListItem, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

async function getCategories() {
    const res = await fetch(`${DataJsonUrl}/categories`)
    const categories = await res.json()
    return categories
}

interface IMenuHomeProps {
    onSelectCategory: (categoryId: string | null) => void
}

const MenuHome: React.FC<IMenuHomeProps> = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        async function fetchCategories() {
            const categories = await getCategories()
            setCategories(categories)
        }
        fetchCategories()
    }, [])

    return (
        <Box className="px-2 min-w-[10rem]">
            <Typography variant="h6" className="mb-4">
                DANH MỤC
            </Typography>
            <List className="space-y-1">
                <ListItem key="all" className="p-0">
                    <Link
                        href="#"
                        onClick={() => onSelectCategory(null)}
                        className="hover:text-blue-500 transition-colors"
                    >
                        All
                    </Link>
                </ListItem>
                {categories.map((cate: ICategory, index: number) => (
                    <ListItem key={index} className="p-0">
                        <Link
                            href="#"
                            onClick={() => onSelectCategory(cate.id)}
                            className="hover:text-blue-500 transition-colors"
                        >
                            {cate.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default MenuHome

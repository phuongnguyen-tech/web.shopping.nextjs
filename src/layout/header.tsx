'use client'

import React, { useState } from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '@/components/cartItem'
import { RootState } from '@/redux/store'
import { removeFromCart } from '@/redux/cartSlice'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    color: 'black',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
}))

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [isCartHovered, setIsCartHovered] = useState<boolean>(false)
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.items)

    const router = useRouter()

    const isMenuOpen = Boolean(anchorEl)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const handleCartHover = () => {
        setIsCartHovered(true)
    }

    const handleCartLeave = () => {
        setIsCartHovered(false)
    }

    const handleCartClick = () => {
        router.push('/cart')
    }

    const menuId = 'primary-search-account-menu'
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="/">MUI</Link>
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <input placeholder="Search…" />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />

                    <Box
                        onMouseEnter={handleCartHover}
                        onMouseLeave={handleCartLeave}
                        sx={{ position: 'relative' }}
                    >
                        <IconButton
                            size="large"
                            aria-label="cart"
                            aria-haspopup="true"
                            color="inherit"
                            onClick={handleCartClick}
                        >
                            <Badge badgeContent={cartItems.length} color="error">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {isCartHovered && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    zIndex: 1,
                                    bgcolor: 'background.paper',
                                    boxShadow: 3,
                                    borderRadius: 1,
                                    p: 2,
                                    width: '400px',
                                }}
                            >
                                {cartItems.length > 0 ? (
                                    cartItems.map((item: any) => (
                                        <CartItem
                                            key={item.id}
                                            product={item}
                                            onRemove={(productId: string) =>
                                                dispatch(removeFromCart(productId))
                                            }
                                        />
                                    ))
                                ) : (
                                    <Box>
                                        <Image
                                            src="/images/noProduct.png"
                                            width={400}
                                            height={500}
                                            alt="Picture of the author"
                                        />
                                    </Box>
                                )}
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    )
}

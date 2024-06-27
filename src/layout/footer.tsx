// components/Footer.tsx

import { Box, Typography } from '@mui/material'

const Footer = () => {
    return (
        <Box sx={{ backgroundColor: '#333', color: '#fff', py: 2 }}>
            <Typography variant="body1" align="center">
                © 2024 Your Company. All rights reserved.
            </Typography>
        </Box>
    )
}

export default Footer

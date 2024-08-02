import Sidebar from '@/components/Sidebar' // Import the Sidebar component
import { DashboardInterface } from '@/types/componentTypes' // Import the DashboardInterface type
import { Box, Container } from '@mui/material' // Import Box and Container components from Material-UI
import React from 'react' // Import React

// Common layout component for the structure
const Layout: React.FC<DashboardInterface> = ({ children }) => {
  return (
    <Box> {/* Main container box */}
      <Box 
        sx={{ display: "flex", p: 3, flexGrow: 1 }} 
        component={"main"}
      > {/* Box for layout structure with flex display and padding */}
        <Sidebar /> {/* Sidebar component */}
        <Container> {/* Container for the main content */}
          {children} {/* Render children components */}
        </Container>
      </Box>
    </Box>
  )
}

export default Layout // Export the Layout component as default

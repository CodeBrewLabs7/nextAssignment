// app/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemText, Drawer, Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import Image from 'next/image';

import earthPic from '@/app/public/assets/icons/Earth@3x.png'
import walletPic from '@/app/public/assets/icons/wallet.png'
import trashPic from '@/app/public/assets/icons/trash.png'

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{ width: 250, flexShrink: 0, '& .MuiDrawer-paper': { width: 250, boxSizing: 'border-box',background:"white" } }}
    >
      <List>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{display:"flex",alignItems:"center",}}>
          <Image src={earthPic} alt={''} width={25} height={25} />
          <Typography sx={{marginLeft:"12px"}}>Projects</Typography>
          </Box>
           
          </AccordionSummary>
          <AccordionDetails>
            <List component="div" disablePadding>
              <ListItem  component={Link} href="/dashboard/projects">
              <Image src={walletPic} alt={''} width={25} height={25} />
                <ListItemText primary="Add Projects" sx={{marginLeft:"12px"}}/>
              </ListItem>
              <ListItem  component={Link} href="/dashboard/projects">
              <Image src={earthPic} alt={''} width={25} height={25} />
                <ListItemText primary="Project Table" sx={{marginLeft:"12px"}}/>
              </ListItem>
              <ListItem  component={Link} href="/dashboard/projects">
              <Image src={trashPic} alt={''} width={25} height={25} />
                <ListItemText primary="Deleted" sx={{marginLeft:"12px"}}/>
              </ListItem>
              {/* Add more project-related navigation items here */}
            </List>
          </AccordionDetails>
        </Accordion>
        {/* Add more navigation sections here */}
      </List>
    </Drawer>
  );
};

export default Sidebar;
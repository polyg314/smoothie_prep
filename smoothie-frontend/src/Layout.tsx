import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { APP_NAME } from './utils/constants';
import InfoIcon from '@mui/icons-material/Info';


export const Layout = (props:any) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            {APP_NAME}
            </Typography>
        </Toolbar>
        </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer}>
        <List>
          {/* Add list items for your menu here */}
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="How to use this app" />
          </ListItem>
          {/* <ListItem button>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary="Mail" />
          </ListItem> */}
        </List>
      </Drawer>
      <Box component="main" flexGrow={1} style={{padding: 20}}>
        {props.children}
        </Box>
      <Box component="footer" sx={{ padding: 2, textAlign: 'center', marginTop: 'auto', backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} {APP_NAME}
        </Typography>
      </Box>
      </Box>
    </>

  );
};

export default Layout;

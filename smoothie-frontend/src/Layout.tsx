import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';
import { APP_NAME } from './utils/constants';
import InfoIcon from '@mui/icons-material/Info';
import { GoogleLogin } from '@react-oauth/google';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';


export const Layout = (props: any) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logged out');
    props.handleSignOut()
    handleClose();
  };

  const handleAccountInfo = () => {
    // Handle showing account info here
    console.log('Account info');

    handleClose();
  };

  console.log(props)

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
            <div style={{ position: "absolute", right: 15, top: 12 }}>
              {!props.isSignedIn && !props.loginLoading &&
                <div style={{ marginTop: 0 }}>
                  <GoogleLogin

                    text="signin"
                    onSuccess={credentialResponse => {
                      console.log(credentialResponse)
                      props.handleCredential(credentialResponse["credential"])
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    useOneTap
                  />
                </div>
              }

              {props.isSignedIn && !props.loginLoading &&

                <div>

                  <Avatar alt={props.user.firstName} onClick={handleMenu} src={props.user.photo} />
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {/* <MenuItem onClick={handleAccountInfo}>Account Info</MenuItem> */}
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>

              }
              {props.loginLoading &&
                <>

                  <CircularProgress style={{ color: "white" }} size={24} />

                </>

              }
            </div>
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
        <Box component="main" flexGrow={1} style={{ padding: 20 }}>
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

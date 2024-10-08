import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { containerStyle, brandStyle, linkStyle, iconButtonStyle, toolbarStyle, dropdownMenuStyle, rightSideContainerStyle } from './styles';
import { useAppContext } from '../../contexts/AppContext';
import LoginModal from './LoginModal';
import { useFirebase } from '../../contexts/firebaseContext';  // Import the Firebase context

export default function NavBar() {
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { showModal } = useAppContext();

  const { user, signInWithGoogle, signOut } = useFirebase(); // Consume Firebase context

  const handleSubMenuOpen = (event) => setSubMenuAnchorEl(event.currentTarget);
  const closeAndCallFunction = (fn) => {
    setSubMenuAnchorEl(null);
    setLanguageMenuAnchorEl(null);
    if (fn) fn();
  };
  const handleLanguageMenuOpen = (event) => setLanguageMenuAnchorEl(event.currentTarget);

  const handleLogin = (loggedInUser) => {
    setLoginModalOpen(false);  // Close the login modal after login
  };

  const handleLogout = () => {
    signOut(); // Use Firebase context's signOut method
  };

  return (
    <>
      <AppBar position="static" sx={containerStyle}>
        <Toolbar sx={toolbarStyle}>
          <Box sx={brandStyle}>
            <Typography variant="h5" color="inherit">
              Mockify
            </Typography>
          </Box>

          {/* Center Links */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {['Teachers', 'Pupils', 'About'].map((link) => (
              <Box key={link} sx={{ position: 'relative' }}>
                <Button
                  color="inherit"
                  sx={linkStyle}
                  endIcon={<ExpandMoreIcon />}
                  onClick={(e) => handleSubMenuOpen(e)}
                >
                  {link}
                </Button>
                {subMenuAnchorEl && subMenuAnchorEl.textContent === link && (
                  <Menu
                    anchorEl={subMenuAnchorEl}
                    open={Boolean(subMenuAnchorEl)}
                    onClose={() => closeAndCallFunction()}
                    MenuListProps={{ 'aria-labelledby': `submenu-${link}` }}
                    sx={dropdownMenuStyle}
                  >
                    {link === 'Teachers' && (
                      <>
                        <MenuItem onClick={() => closeAndCallFunction()}>Create Mock Exams</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction()}>Share Study Material</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction()}>Track Progress</MenuItem>
                      </>
                    )}
                    {link === 'Pupils' && (
                      <>
                        <MenuItem onClick={() => closeAndCallFunction()}>Take Mock Exams</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction()}>Review Results</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction()}>Study Resources</MenuItem>
                      </>
                    )}
                    {link === 'About' && (
                      <>
                        <MenuItem onClick={() => closeAndCallFunction(() => showModal('message:mission'))}>Our Mission</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction(() => showModal('message:howitworks'))}>How It Works</MenuItem>
                        <MenuItem onClick={() => closeAndCallFunction(() => showModal('message:contactus'))}>Contact Us</MenuItem>
                      </>
                    )}
                  </Menu>
                )}
              </Box>
            ))}
          </Box>

          {/* Right Hand Side - User Icon, Log In/Out, Language Selection */}
          <Box sx={rightSideContainerStyle}>
            {user ? (
              <>
                <Typography variant="body1" sx={{ mr: 2 }}>{`Welcome, ${user.displayName || 'User'}`}</Typography>
                <Button color="inherit" sx={linkStyle} onClick={handleLogout}>
                  Log Out
                </Button>
                <IconButton color="inherit" sx={iconButtonStyle}>
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Button color="inherit" sx={linkStyle} onClick={() => setLoginModalOpen(true)}>
                  Log In
                </Button>
              </>
            )}
            <IconButton color="inherit" sx={iconButtonStyle} onClick={handleLanguageMenuOpen}>
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={languageMenuAnchorEl}
              open={Boolean(languageMenuAnchorEl)}
              onClose={() => closeAndCallFunction()}
              MenuListProps={{ 'aria-labelledby': 'language-menu' }}
              sx={dropdownMenuStyle}
            >
              <MenuItem onClick={() => closeAndCallFunction()}>English</MenuItem>
              <MenuItem onClick={() => closeAndCallFunction()}>German</MenuItem>
              <MenuItem onClick={() => closeAndCallFunction()}>Spanish</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Login Modal */}
      <LoginModal
        open={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        handleLogin={handleLogin}
      />
    </>
  );
};
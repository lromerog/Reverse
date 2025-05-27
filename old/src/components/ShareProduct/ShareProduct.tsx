import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Share as ShareIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  WhatsApp as WhatsAppIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import styled from 'styled-components';

const ShareButton = styled(IconButton)`
  margin-left: 0.5rem;
`;

interface ShareProductProps {
  productName: string;
  productUrl: string;
}

const ShareProduct: React.FC<ShareProductProps> = ({ productName, productUrl }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShare = (platform: string) => {
    const shareText = `Check out this amazing ${productName} on Nike!`;
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${productUrl}`)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(`Check out this product: ${productUrl}`)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank');
      setSnackbarMessage(`Shared on ${platform}!`);
      setShowSnackbar(true);
    }

    handleClose();
  };

  return (
    <>
      <ShareButton color="inherit" onClick={handleClick}>
        <ShareIcon />
      </ShareButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200 },
        }}
      >
        <MenuItem onClick={() => handleShare('facebook')}>
          <ListItemIcon>
            <FacebookIcon color="primary" />
          </ListItemIcon>
          <ListItemText>Facebook</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('twitter')}>
          <ListItemIcon>
            <TwitterIcon color="info" />
          </ListItemIcon>
          <ListItemText>Twitter</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('whatsapp')}>
          <ListItemIcon>
            <WhatsAppIcon color="success" />
          </ListItemIcon>
          <ListItemText>WhatsApp</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleShare('email')}>
          <ListItemIcon>
            <EmailIcon color="action" />
          </ListItemIcon>
          <ListItemText>Email</ListItemText>
        </MenuItem>
      </Menu>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert severity="success" onClose={() => setShowSnackbar(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareProduct; 
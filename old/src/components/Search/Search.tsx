import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { Search as SearchIcon, Close } from '@mui/icons-material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const SearchDialog = styled(Dialog)`
  .MuiDialog-paper {
    width: 100%;
    max-width: 600px;
    margin: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

const SearchInput = styled(TextField)`
  width: 100%;
  margin-bottom: 1rem;
`;

const SearchResults = styled(List)`
  max-height: calc(100vh - 200px);
  overflow-y: auto;
`;

interface SearchProps {
  open: boolean;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useAppContext();

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchDialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Search Products</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <SearchInput
          autoFocus
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <SearchResults>
          {filteredProducts.map((product) => (
            <ListItem key={product.id} button>
              <ListItemText
                primary={product.name}
                secondary={product.category}
              />
            </ListItem>
          ))}
          {filteredProducts.length === 0 && (
            <Typography sx={{ textAlign: 'center', py: 2 }}>
              No products found
            </Typography>
          )}
        </SearchResults>
      </DialogContent>
    </SearchDialog>
  );
};

export default Search; 
import React from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import styled from 'styled-components';

const FilterContainer = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

interface FilterSortProps {
  onFilterChange: (category: string) => void;
  onSortChange: (sortBy: string) => void;
  selectedCategory: string;
  selectedSort: string;
}

const FilterSort: React.FC<FilterSortProps> = ({
  onFilterChange,
  onSortChange,
  selectedCategory,
  selectedSort,
}) => {
  const handleCategoryChange = (event: SelectChangeEvent) => {
    onFilterChange(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value);
  };

  return (
    <FilterContainer>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="all">All Categories</MenuItem>
          <MenuItem value="Men's Shoes">Men's Shoes</MenuItem>
          <MenuItem value="Women's Shoes">Women's Shoes</MenuItem>
          <MenuItem value="Kids' Shoes">Kids' Shoes</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={selectedSort}
          label="Sort By"
          onChange={handleSortChange}
        >
          <MenuItem value="price-asc">Price: Low to High</MenuItem>
          <MenuItem value="price-desc">Price: High to Low</MenuItem>
          <MenuItem value="name-asc">Name: A to Z</MenuItem>
          <MenuItem value="name-desc">Name: Z to A</MenuItem>
        </Select>
      </FormControl>
    </FilterContainer>
  );
};

export default FilterSort; 
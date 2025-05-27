import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface RewardCardProps {
  name: string;
  email: string;
  amount: string;
  avatar?: string;
}

const RewardCard: React.FC<RewardCardProps> = ({ name, email, amount, avatar }) => (
  <Box sx={{ background: '#181818', color: '#fff', borderRadius: 2, p: 2, mb: 2 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
      <Avatar src={avatar || '/assets/avatar.png'} alt={name} sx={{ mr: 2 }} />
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>{name}</Typography>
        <Typography variant="body2">{email}</Typography>
      </Box>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>{amount}</Typography>
      <img src="/assets/reward-voucher.png" alt="Voucher" style={{ height: 40 }} />
    </Box>
    <Typography variant="body2">Total rewards</Typography>
  </Box>
);

export default RewardCard; 
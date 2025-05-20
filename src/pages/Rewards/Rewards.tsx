import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Paper,
  useTheme
} from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import StarIcon from '@mui/icons-material/Star';
import { keyframes } from '@mui/system';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { useTranslation } from 'react-i18next';
import RewardVoucher from '../../components/RewardVoucher/RewardVoucher';
import { useGeolocation } from '../../hooks/useGeolocation';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const rewards = [
  {
    id: 1,
    name: 'Nike Air Max 2024',
    image: process.env.PUBLIC_URL + '/assets/airmax-placeholder.png',
    points: 120,
    description: 'Next-generation sports shoes.',
    category: 'Shoes',
  },
  {
    id: 2,
    name: 'Nike Dri-FIT Tee',
    image: process.env.PUBLIC_URL + '/assets/drifit-placeholder.png',
    points: 60,
    description: 'Breathable t-shirt for maximum performance.',
    category: 'Apparel',
  },
  {
    id: 3,
    name: 'Nike Sportswear Club Fleece',
    image: process.env.PUBLIC_URL + '/assets/fleece-placeholder.png',
    points: 80,
    description: 'Hoodie for maximum comfort.',
    category: 'Apparel',
  },
  {
    id: 4,
    name: 'Nike Air Force 1',
    image: process.env.PUBLIC_URL + '/assets/airforce-placeholder.png',
    points: 100,
    description: 'Classic Nike sneaker.',
    category: 'Shoes',
  },
];

const categories = ['All', 'Shoes', 'Apparel'];

const levels = [
  { level: 1, points: 0, name: 'Beginner' },
  { level: 2, points: 500, name: 'Bronze' },
  { level: 3, points: 1000, name: 'Silver' },
  { level: 4, points: 2000, name: 'Gold' },
  { level: 5, points: 5000, name: 'Diamond' },
];

const Rewards: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showHistory, setShowHistory] = useState(false);
  const [showRedeemDialog, setShowRedeemDialog] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const userPoints = 1250;
  const userLevel = levels.find(level => userPoints >= level.points) || levels[0];
  const nextLevel = levels.find(level => level.points > userPoints) || levels[levels.length - 1];
  const progressToNextLevel = ((userPoints - userLevel.points) / (nextLevel.points - userLevel.points)) * 100;
  const [activeTab, setActiveTab] = useState(0);
  const { latitude, longitude, error: locationError } = useGeolocation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleRedeem = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemDialog(true);
  };

  const confirmRedeem = () => {
    alert(`Congratulations! You have redeemed: ${selectedReward.name}`);
    setShowRedeemDialog(false);
  };

  return (
    <Box sx={{ bgcolor: '#F7F7F7', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        px: 3, 
        pt: 3, 
        pb: 1,
        background: 'linear-gradient(135deg, #232323 0%, #1a1a1a 100%)',
        color: '#fff'
      }}>
        <Box
          component="img"
          src="/assets/images/nike-swoosh.png"
          alt="Reverse Logo"
          sx={{ width: 40, height: 40, mr: 2 }}
          onError={(e: any) => {
            e.target.onerror = null;
            e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg';
          }}
        />
        <Typography variant="h6" fontWeight={700}>
          {t('rewards.title')}
        </Typography>
        <Box flex={1} />
        <IconButton onClick={() => setShowHistory(true)} sx={{ color: '#fff' }}>
          <HistoryIcon />
        </IconButton>
      </Box>

      {/* Location Status */}
      {locationError && (
        <Paper sx={{ m: 2, p: 2, bgcolor: '#fff3f3', color: '#d32f2f' }}>
          <Typography variant="body2">
            {locationError}
          </Typography>
        </Paper>
      )}

      {/* Level Card */}
      <Card sx={{ borderRadius: 4, boxShadow: 3, bgcolor: '#111', color: '#fff', p: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ bgcolor: '#fff', color: '#111', width: 56, height: 56, mr: 2 }}>
              <EmojiEventsIcon sx={{ color: '#F5B301', fontSize: 36 }} />
            </Avatar>
            <Box>
              <Typography variant="subtitle2" color="#F5B301" fontWeight={700}>
                Level {userLevel.level} - {userLevel.name}
              </Typography>
              <Typography variant="h4" fontWeight={700} color="#fff">
                {userPoints} points
              </Typography>
            </Box>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant="body2" color="#fff" gutterBottom>
              Next level: {nextLevel.name} ({nextLevel.points} points)
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progressToNextLevel} 
              sx={{ 
                height: 8, 
                borderRadius: 4,
                bgcolor: '#333',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#F5B301'
                }
              }} 
            />
          </Box>
        </CardContent>
      </Card>

      {/* Animated Banner */}
      <Card sx={{ 
        borderRadius: 4, 
        boxShadow: 3, 
        bgcolor: '#F5B301', 
        color: '#fff', 
        p: 2,
        animation: `${pulse} 2s infinite`
      }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700} align="center">
            Redeem your points and take your style to the next level!
          </Typography>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <Box sx={{ px: 3, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search rewards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              color={selectedCategory === category ? 'primary' : 'default'}
              sx={{ borderRadius: 2 }}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            mb: 3,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1rem'
            }
          }}
        >
          <Tab label={t('rewards.activeVouchers')} />
          <Tab label={t('rewards.expiredVouchers')} />
        </Tabs>

        {activeTab === 0 && (
          <Box>
            <RewardVoucher />
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {t('rewards.noExpiredVouchers')}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Rewards List */}
      <Box sx={{ px: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2} color="text.primary">
          Available Rewards
        </Typography>
        <Grid container spacing={2}>
          {filteredRewards.map((reward) => {
            const canRedeem = userPoints >= reward.points;
            return (
              <Grid item xs={12} sm={6} key={reward.id}>
                <Card sx={{ 
                  borderRadius: 3, 
                  boxShadow: 2, 
                  cursor: 'pointer', 
                  transition: '0.2s', 
                  '&:hover': { 
                    boxShadow: 6,
                    transform: 'translateY(-4px)'
                  } 
                }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={reward.image}
                    alt={reward.name}
                    sx={{ objectFit: 'contain', bgcolor: '#f5f5f5' }}
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/airmax-placeholder.png';
                    }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {reward.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {reward.description}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {reward.points} points
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={(userPoints / reward.points) * 100} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 4,
                          bgcolor: '#E0E0E0',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: canRedeem ? '#4CAF50' : '#F5B301'
                          }
                        }} 
                      />
                    </Box>
                    <Tooltip title={canRedeem ? "You can redeem this reward!" : "You need more points to redeem this reward"}>
                      <Button
                        variant="contained"
                        color={canRedeem ? "success" : "primary"}
                        fullWidth
                        sx={{ borderRadius: 3, fontWeight: 700, mt: 1 }}
                        onClick={() => canRedeem && handleRedeem(reward)}
                        disabled={!canRedeem}
                      >
                        {canRedeem ? "Redeem" : "Insufficient Points"}
                      </Button>
                    </Tooltip>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Redeem Dialog */}
      <Dialog open={showRedeemDialog} onClose={() => setShowRedeemDialog(false)}>
        <DialogTitle>
          Confirm Redeem
          <IconButton
            aria-label="close"
            onClick={() => setShowRedeemDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to redeem {selectedReward?.name} for {selectedReward?.points} points?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowRedeemDialog(false)}>Cancel</Button>
          <Button onClick={confirmRedeem} variant="contained" color="success">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Redeem History
          <IconButton
            aria-label="close"
            onClick={() => setShowHistory(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Redeemed Rewards
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              You haven't redeemed any rewards yet.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowHistory(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rewards; 
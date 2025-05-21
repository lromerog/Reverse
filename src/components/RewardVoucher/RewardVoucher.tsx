import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  IconButton,
  Tooltip,
  Card
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { useTranslation } from 'react-i18next';

const VoucherCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'linear-gradient(135deg, #F5B301 0%, #FFD700 100%)',
  color: '#232323',
  borderRadius: theme.spacing(2),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("/assets/images/nike-pattern.png")',
    opacity: 0.1,
    zIndex: 0
  }
}));

interface VoucherData {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  validUntil: string;
  description: string;
}

const RewardVoucher: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [voucherData, setVoucherData] = useState<VoucherData>({
    code: '',
    discount: 10,
    type: 'percentage',
    validUntil: '',
    description: ''
  });
  const [generatedVoucher, setGeneratedVoucher] = useState<VoucherData | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const generateVoucherCode = () => {
    const prefix = 'REVERSE';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  const handleGenerate = () => {
    const newVoucher: VoucherData = {
      ...voucherData,
      code: generateVoucherCode(),
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 30 days from now
    };
    setGeneratedVoucher(newVoucher);
    handleClose();
  };

  const handleCopyCode = () => {
    if (generatedVoucher) {
      navigator.clipboard.writeText(generatedVoucher.code);
    }
  };

  const handleDownloadQR = () => {
    if (generatedVoucher) {
      const canvas = document.getElementById('voucher-qr') as HTMLCanvasElement;
      if (canvas) {
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `voucher-${generatedVoucher.code}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        {t('rewards.generateVoucher')}
      </Button>

      {generatedVoucher && (
        <VoucherCard variant="outlined" animation="scale">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                {t('rewards.voucherTitle')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {generatedVoucher.description || t('rewards.defaultDescription')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Typography variant="h6">
                  {generatedVoucher.code}
                </Typography>
                <Tooltip title={t('common.copy')}>
                  <IconButton onClick={handleCopyCode} size="small">
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {t('rewards.validUntil')}: {new Date(generatedVoucher.validUntil).toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>
                <QRCode
                  id="voucher-qr"
                  value={JSON.stringify(generatedVoucher)}
                  size={128}
                  level="H"
                  includeMargin
                  as={QRCodeSVG}
                />
              </Box>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadQR}
                size="small"
              >
                {t('common.download')}
              </Button>
            </Grid>
          </Grid>
        </VoucherCard>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{t('rewards.createVoucher')}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={t('rewards.description')}
                  multiline
                  rows={2}
                  value={voucherData.description}
                  onChange={(e) => setVoucherData(prev => ({ ...prev, description: e.target.value }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label={t('rewards.discountAmount')}
                  value={voucherData.discount}
                  onChange={(e) => setVoucherData(prev => ({ ...prev, discount: Number(e.target.value) }))}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>{t('rewards.discountType')}</InputLabel>
                  <Select
                    value={voucherData.type}
                    label={t('rewards.discountType')}
                    onChange={(e) => setVoucherData(prev => ({ ...prev, type: e.target.value as 'percentage' | 'fixed' }))}
                  >
                    <MenuItem value="percentage">{t('rewards.percentage')}</MenuItem>
                    <MenuItem value="fixed">{t('rewards.fixedAmount')}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('common.cancel')}</Button>
          <Button onClick={handleGenerate} variant="contained" color="primary">
            {t('common.generate')}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RewardVoucher; 
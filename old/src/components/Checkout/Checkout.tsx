import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Paper,
} from '@mui/material';
import styled from 'styled-components';
import { useAppContext } from '../../context/AppContext';

const CheckoutContainer = styled(Box)`
  padding: 2rem;
`;

const FormSection = styled(Paper)`
  padding: 2rem;
  margin-bottom: 2rem;
`;

const steps = ['Shipping', 'Payment', 'Review'];

interface CheckoutProps {
  onClose: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { cart } = useAppContext();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <FormSection>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  label="State"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  fullWidth
                  label="ZIP Code"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                />
              </Grid>
            </Grid>
          </FormSection>
        );
      case 1:
        return (
          <FormSection>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Card Number"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name on Card"
                  name="cardName"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Expiry Date"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="CVV"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentChange}
                />
              </Grid>
            </Grid>
          </FormSection>
        );
      case 2:
        return (
          <FormSection>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {cart.map((item) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Typography>
                  {item.name} x {item.quantity}
                </Typography>
                <Typography color="text.secondary">
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Total: ${total.toFixed(2)}
            </Typography>
          </FormSection>
        );
      default:
        return null;
    }
  };

  return (
    <CheckoutContainer>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={activeStep === steps.length - 1 ? onClose : handleNext}
        >
          {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
        </Button>
      </Box>
    </CheckoutContainer>
  );
};

export default Checkout; 
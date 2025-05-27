import React from 'react';
import { Box, Container, Typography, Grid, Button, Chip } from '@mui/material';
import styled from 'styled-components';

const HeroSection = styled(Box)`
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  color: white;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
`;

const HeroContent = styled(Box)`
  position: relative;
  z-index: 1;
`;

const Section = styled(Box)`
  padding: 4rem 0;
`;

const ImageGrid = styled(Grid)`
  margin-top: 2rem;
`;

const ProjectImage = styled(Box)`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ReverseProjectDetails: React.FC = () => {
  const project = {
    id: 1,
    title: 'Nike Air Max 270',
    description: 'Custom design project for the iconic Air Max 270',
    longDescription: `The Nike Air Max 270 represents a bold step forward for the Air Max line. 
    The first-ever Nike Air unit designed specifically for Nike Sportswear, the 270 delivers 
    visible cushioning under every step with a large window and plush feel.`,
    image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png',
    status: 'In Progress',
    features: [
      'Air cushioning technology',
      'Breathable mesh upper',
      'Foam midsole',
      'Rubber outsole'
    ],
    images: [
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png',
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png'
    ]
  };

  return (
    <Box>
      <HeroSection
        sx={{
          backgroundImage: `url(${project.image})`
        }}
      >
        <Container>
          <HeroContent>
            <Typography variant="h2" component="h1" gutterBottom>
              {project.title}
            </Typography>
            <Chip
              label={project.status}
              color="primary"
              sx={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            />
          </HeroContent>
        </Container>
      </HeroSection>

      <Section>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Project Overview
              </Typography>
              <Typography variant="body1" paragraph>
                {project.longDescription}
              </Typography>
              <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Key Features
              </Typography>
              <Grid container spacing={2}>
                {project.features.map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body1">•</Typography>
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ position: 'sticky', top: '2rem' }}>
                <Typography variant="h5" gutterBottom>
                  Project Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Typography variant="body1">{project.status}</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth>
                  Download Technical Specs
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Section>

      <Section sx={{ backgroundColor: '#f5f5f5' }}>
        <Container>
          <Typography variant="h4" gutterBottom>
            Project Gallery
          </Typography>
          <ImageGrid container spacing={3}>
            {project.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProjectImage
                  sx={{
                    backgroundImage: `url(${image})`
                  }}
                />
              </Grid>
            ))}
          </ImageGrid>
        </Container>
      </Section>
    </Box>
  );
};

export default ReverseProjectDetails; 
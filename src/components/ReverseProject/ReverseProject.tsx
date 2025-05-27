import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import styled from 'styled-components';

const Container = styled(Box)`
  padding: 4rem 0;
  background-color: #f5f5f5;
`;

const ProjectCard = styled(Box)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProjectImage = styled(Box)`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const ReverseProject: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'Nike Air Max 270',
      description: 'Custom design project for the iconic Air Max 270',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-max-270-shoes-KkLcGR.png',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Nike Air Force 1',
      description: 'Reverse engineering of the classic Air Force 1',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/air-force-1-07-shoes-WrLlWX.png',
      status: 'Completed'
    },
    {
      id: 3,
      title: 'Nike ZoomX Vaporfly',
      description: 'Analysis of the revolutionary ZoomX technology',
      image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/zoomx-vaporfly-next-running-shoe-2p4p4p.png',
      status: 'Planning'
    }
  ];

  return (
    <Container>
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Reverse Engineering Projects
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our ongoing reverse engineering projects and learn about the technology behind Nike's innovative products.
        </Typography>
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard>
                <ProjectImage
                  sx={{
                    backgroundImage: `url(${project.image})`
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" color="primary">
                    {project.status}
                  </Typography>
                  <Button variant="outlined" color="primary">
                    View Details
                  </Button>
                </Box>
              </ProjectCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ReverseProject; 
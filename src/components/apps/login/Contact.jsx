import React from 'react'
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material'
import { motion } from 'framer-motion'

const Contact = () => {
  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const buttonVariants = {
    hover: { scale: 1.05, transition: { yoyo: Infinity, duration: 0.3 } },
  }

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div initial="hidden" animate="visible" variants={formVariants}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          We would love to hear from you! Please fill out the form below and we
          will get in touch with you as soon as possible.
        </Typography>
        <Box component="form" sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" variant="outlined" required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                type="email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <motion.div variants={buttonVariants} whileHover="hover">
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  Send Message
                </Button>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  )
}

export default Contact

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

function WishlistForm({ onAddItem, isSubmitting }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddItem({ name, link });
    setName('');
    setLink('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, animation: 'fadeInUp 0.5s ease-out 0.4s forwards', opacity: 0 }}>
      <TextField
        label="O que você deseja?"
        variant="outlined"
        value={name}
        disabled={isSubmitting}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Link (opcional)"
        variant="outlined"
        value={link}
        disabled={isSubmitting}
        onChange={(e) => setLink(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" size="large" disabled={isSubmitting} fullWidth>
        {isSubmitting ? 'Adicionando...' : 'Adicionar'}
      </Button>
    </Box>
  );
}

export default WishlistForm;
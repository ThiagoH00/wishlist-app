import React from 'react';
import { List, ListItem, ListItemText, IconButton, Checkbox, Link, Divider, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Wishlist({ items, onDeleteItem, onTogglePurchased }) {
  if (items.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" align="center" sx={{ p: 4 }}>
        Sua lista de desejos está vazia. Adicione o primeiro item!
      </Typography>
    );
  }

  return (
    <List sx={{ bgcolor: 'background.paper', borderRadius: 2, animation: 'fadeInUp 0.5s ease-out 0.6s forwards', opacity: 0 }}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <ListItem
            sx={{
              py: 2,
              transition: 'background-color 0.3s',
              opacity: item.purchased ? 0.5 : 1,
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
            secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(item.id)}>
                <DeleteIcon />
              </IconButton>
            }
          >
            <Checkbox
              edge="start"
              checked={item.purchased}
              onChange={() => onTogglePurchased(item.id, item.purchased)}
              sx={{ mr: 1 }}
            />
            <ListItemText
              primary={
                <Typography sx={{ textDecoration: item.purchased ? 'line-through' : 'none' }}>
                  {item.name}
                </Typography>
              }
              secondary={
                item.link && <Link href={item.link} target="_blank" rel="noopener noreferrer">Visitar link</Link>
              }
            />
          </ListItem>
          {index < items.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}

export default Wishlist;
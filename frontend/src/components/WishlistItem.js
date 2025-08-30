import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Checkbox, Link, Typography, TextField, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function WishlistItem({ item, isEditing, onSetEditing, onSaveEdit, onDeleteItem, onTogglePurchased }) {
  const [editedName, setEditedName] = useState(item.name);
  const [editedLink, setEditedLink] = useState(item.link);

  const handleSave = () => {
    onSaveEdit(item.id, { name: editedName, link: editedLink });
  };

  if (isEditing) {
    return (
      <ListItem sx={{ py: 2, bgcolor: 'action.hover' }}>
        <Box sx={{ flexGrow: 1, mr: 2 }}>
          <TextField
            variant="standard"
            fullWidth
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="standard"
            fullWidth
            value={editedLink}
            onChange={(e) => setEditedLink(e.target.value)}
            placeholder="Link (opcional)"
          />
        </Box>
        <IconButton edge="end" aria-label="save" onClick={handleSave}>
          <SaveIcon />
        </IconButton>
        <IconButton edge="end" aria-label="cancel" onClick={() => onSetEditing(null)}>
          <CancelIcon />
        </IconButton>
      </ListItem>
    );
  }

  return (
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
        <>
          <IconButton edge="end" aria-label="edit" onClick={() => onSetEditing(item.id)}>
            <EditIcon />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </>
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
  );
}

export default WishlistItem;
// /wishlist-app/frontend/src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {
  Container, Box, Typography, Alert, Card, CircularProgress,
  ToggleButton, ToggleButtonGroup
} from '@mui/material';
import WishlistForm from './components/WishlistForm';
import Wishlist from './components/Wishlist';

// Lê a URL da API das variáveis de ambiente, com um fallback para desenvolvimento local.
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3002/items';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [error, setError] = useState(null); // Novo estado para o erro
  const [filter, setFilter] = useState('all'); // 'all', 'purchased', 'unpurchased'

  const fetchItems = async () => {
    try {
      setError(null); // Limpa erros anteriores
      setLoading(true);
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens:", error);
      setError("Não foi possível carregar a lista. Verifique se o backend está rodando.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Efeito para limpar a mensagem de erro automaticamente após 5 segundos
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000);

      // Limpa o timer se o componente for desmontado ou o erro mudar
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleAddItem = async ({ name, link }) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await axios.post(API_URL, { name, link });
      setItems(prevItems => [...prevItems, response.data]);
    } catch (error) {
      setError("Não foi possível adicionar o item. Tente novamente.");
      console.error("Erro ao adicionar item:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteItem = async (id) => {
    // Otimização: Guarda o estado atual para o caso de a requisição falhar
    const originalItems = [...items];
    
    // Atualiza a UI imediatamente para uma experiência mais fluida
    setItems(prevItems => prevItems.filter(item => item.id !== id));   

    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      setError("Não foi possível deletar o item. Restaurando lista.");
      console.error("Erro ao deletar item:", error);
      // Se der erro, restaura a lista para o estado original
      setItems(originalItems);
    }
  };

  const handleUpdateItem = async (id, updatedData) => {
    const originalItems = [...items];
    // Otimização: Atualiza a UI imediatamente
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
    setEditingItemId(null); // Sai do modo de edição

    try {
      // Sincroniza com o backend. A resposta pode ter mais dados atualizados.
      const response = await axios.patch(`${API_URL}/${id}`, updatedData);
      setItems(prevItems => prevItems.map(item => (item.id === id ? response.data : item)));
    } catch (error) {
      setError("Erro ao salvar as alterações. Restaurando item.");
      console.error("Erro ao atualizar item:", error);
      // Em caso de erro, reverte para o estado original
      setItems(originalItems);
    }
  };

  const handleTogglePurchased = async (id, currentStatus) => {
    const originalItems = [...items];
    // Otimização: Atualiza a UI imediatamente para o checkbox parecer instantâneo
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, purchased: !currentStatus } : item
      )
    );

    try {
      // Sincroniza com o backend em segundo plano usando PATCH
      await axios.patch(`${API_URL}/${id}`, { purchased: !currentStatus });
    } catch (error) {
      setError("Erro ao atualizar o item. A alteração foi desfeita.");
      console.error("Erro ao atualizar item:", error);
      // Em caso de erro, reverte para o estado original
      setItems(originalItems);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredItems = items.filter(item => {
    if (filter === 'purchased') return item.purchased;
    if (filter === 'unpurchased') return !item.purchased;
    return true; // para 'all'
  });

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: { xs: 2, sm: 4 }, 
        mb: 4,
        // 1. Define a animação de entrada no container pai
        '@keyframes fadeInUp': {
          'from': {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      <Card 
        elevation={2} 
        sx={{ 
          p: { xs: 2, sm: 4 },
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px 0 rgba(0, 82, 204, 0.2)', // Efeito de brilho azul
          }
        }}
      >
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            align="center" 
            color="text.primary"
            sx={{ animation: 'fadeInUp 0.5s ease-out forwards', opacity: 0 }}
          >
            Wishlist
          </Typography>
          <Typography 
            variant="body1" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 4, animation: 'fadeInUp 0.5s ease-out 0.2s forwards', opacity: 0 }}
          >
            Adicione o que deseja comprar!
          </Typography>

          <WishlistForm onAddItem={handleAddItem} isSubmitting={isSubmitting} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <ToggleButtonGroup
                color="primary"
                value={filter}
                exclusive
                onChange={handleFilterChange}
                aria-label="Filtro de itens"
              >
                <ToggleButton value="all">Todos</ToggleButton>
                <ToggleButton value="unpurchased">A Comprar</ToggleButton>
                <ToggleButton value="purchased">Comprados</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Wishlist
              items={filteredItems}
              editingItemId={editingItemId}
              onSetEditing={setEditingItemId}
              onSaveEdit={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
              onTogglePurchased={handleTogglePurchased}
            />
            </>
          )}
      </Card>
    </Container>
  );
}

export default App;

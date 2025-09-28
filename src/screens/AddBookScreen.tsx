import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, TextInput, Button, ActivityIndicator, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ModernCard, ModernButton } from '../components/ModernCard';

interface BookSearchResult {
  id: string;
  title: string;
  author: string;
  cover: string;
  isbn?: string;
  year?: number;
}

export default function AddBookScreen() {
  const navigation = useNavigation();
  const { addBook, state } = useApp();
  const { theme } = useTheme();
  const { user } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const mockSearchResults: BookSearchResult[] = [
    {
      id: '1',
      title: 'O Hobbit',
      author: 'J.R.R. Tolkien',
      cover: 'https://covers.openlibrary.org/b/id/6979861-M.jpg',
      isbn: '9788533613379',
      year: 1937,
    },
    {
      id: '2',
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J.K. Rowling',
      cover: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
      isbn: '9788532511010',
      year: 1997,
    },
    {
      id: '3',
      title: 'O Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      cover: 'https://covers.openlibrary.org/b/id/6979861-M.jpg',
      isbn: '9788533613379',
      year: 1943,
    },
    {
      id: '4',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      cover: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
      isbn: '9788535928569',
      year: 1899,
    },
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 1000);
  };

  const handleAddBook = (book: BookSearchResult) => {
    if (user) {
      const newBook = {
        id: Date.now().toString(),
        title: book.title,
        author: book.author,
        cover: book.cover,
        isbn: book.isbn,
        year: book.year,
        status: 'available' as const,
        ownerId: user.id,
      };

      addBook(newBook);
      setSnackbarMessage(`"${book.title}" adicionado à sua biblioteca!`);
      setSnackbarVisible(true);

      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    }
  };

  const renderSearchResult = ({ item }: { item: BookSearchResult }) => (
    <ModernCard style={styles.resultCard} elevation={2}>
      <View style={styles.resultContent}>
        <Card.Cover
          source={{ uri: item.cover }}
          style={[styles.bookCover, { borderRadius: theme.borderRadius.md }]}
        />
        <View style={styles.bookInfo}>
          <Title style={[styles.bookTitle, { color: theme.colors.text }]} numberOfLines={2}>
            {item.title}
          </Title>
          <Paragraph style={[styles.bookAuthor, { color: theme.colors.textSecondary }]} numberOfLines={1}>
            {item.author}
          </Paragraph>
          {item.year && (
            <Paragraph style={[styles.bookYear, { color: theme.colors.textSecondary }]}>
              Publicado em {item.year}
            </Paragraph>
          )}
          {item.isbn && (
            <Paragraph style={[styles.bookIsbn, { color: theme.colors.textSecondary }]}>
              ISBN: {item.isbn}
            </Paragraph>
          )}
          <ModernButton
            title="Adicionar à Biblioteca"
            onPress={() => handleAddBook(item)}
            variant="primary"
            size="sm"
            icon="add"
            style={styles.addButton}
          />
        </View>
      </View>
    </ModernCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: theme.colors.surface }]}>
        <TextInput
          label="Buscar livro por título ou autor"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          mode="outlined"
          theme={{
            colors: {
              primary: theme.colors.primary,
              text: theme.colors.text,
              placeholder: theme.colors.textSecondary,
            },
          }}
        />
        <ModernButton
          title={isLoading ? 'Buscando...' : 'Buscar'}
          onPress={handleSearch}
          variant="primary"
          disabled={!searchQuery.trim() || isLoading}
          icon={isLoading ? undefined : 'search'}
        />
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Paragraph style={[styles.loadingText, { color: theme.colors.text }]}>
            Buscando livros...
          </Paragraph>
        </View>
      )}

      {searchResults.length > 0 && !isLoading && (
        <View style={styles.resultsContainer}>
          <Title style={[styles.resultsTitle, { color: theme.colors.text }]}>
            Resultados da busca ({searchResults.length})
          </Title>
          <FlatList
            data={searchResults}
            renderItem={renderSearchResult}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        </View>
      )}

      {searchResults.length === 0 && !isLoading && searchQuery && (
        <View style={styles.noResultsContainer}>
          <MaterialIcons name="search-off" size={80} color={theme.colors.textSecondary} />
          <Title style={[styles.noResultsTitle, { color: theme.colors.text }]}>
            Nenhum livro encontrado
          </Title>
          <Paragraph style={[styles.noResultsText, { color: theme.colors.textSecondary }]}>
            Tente buscar por outro título ou autor.
          </Paragraph>
        </View>
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: theme.colors.success }]}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  searchInput: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    padding: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  resultsList: {
    paddingBottom: 20,
  },
  resultCard: {
    marginBottom: 16,
  },
  resultContent: {
    flexDirection: 'row',
    padding: 16,
  },
  bookCover: {
    width: 80,
    height: 120,
    marginRight: 16,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookYear: {
    fontSize: 12,
    marginBottom: 4,
  },
  bookIsbn: {
    fontSize: 12,
    marginBottom: 12,
  },
  addButton: {
    alignSelf: 'flex-start',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noResultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  snackbar: {
    borderRadius: 12,
  },
});
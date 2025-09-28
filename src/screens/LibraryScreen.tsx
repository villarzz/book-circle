import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, FAB, Chip } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ModernCard, ModernButton } from '../components/ModernCard';
import { mockBooks, mockUser } from '../data/mockData';

export default function LibraryScreen() {
  const navigation = useNavigation();
  const { state, addBook, setUser } = useApp();
  const { theme } = useTheme();
  const { books } = state;

  useEffect(() => {
    if (books.length === 0) {
      setUser(mockUser);
      mockBooks.filter((book) => book.ownerId === mockUser.id).forEach((book) => addBook(book));
    }
  }, [books.length, addBook, setUser]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return theme.colors.success;
      case 'reading': return theme.colors.warning;
      case 'traded': return theme.colors.textSecondary;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponível';
      case 'reading': return 'Lendo';
      case 'traded': return 'Trocado';
      default: return 'Desconhecido';
    }
  };

  const renderBookItem = ({ item }: { item: any }) => (
    <ModernCard style={styles.bookCard} elevation={3}>
      <TouchableOpacity style={styles.bookTouchable}>
        <Card.Cover 
          source={{ uri: item.cover }} 
          style={[styles.bookCover, { borderRadius: theme.borderRadius.md }]} 
        />
        <View style={styles.bookContent}>
          <Title 
            style={[styles.bookTitle, { color: theme.colors.text }]} 
            numberOfLines={2}
          >
            {item.title}
          </Title>
          <Paragraph 
            style={[styles.bookAuthor, { color: theme.colors.textSecondary }]} 
            numberOfLines={1}
          >
            {item.author}
          </Paragraph>
          <View style={styles.statusContainer}>
            <View 
              style={[
                styles.statusChip, 
                { 
                  backgroundColor: getStatusColor(item.status),
                  borderRadius: theme.borderRadius.sm,
                }
              ]}
            >
              <Paragraph style={styles.statusText}>
                {getStatusText(item.status)}
              </Paragraph>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ModernCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Title style={[styles.headerTitle, { color: theme.colors.text }]}>
          Minha Biblioteca
        </Title>
        <Paragraph style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {books.length} livros
        </Paragraph>
      </View>
      
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
      
      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="plus"
        onPress={() => navigation.navigate('addBook' as never)}
        label="Adicionar Livro"
        color="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    marginBottom: 16,
  },
  bookTouchable: {
    flex: 1,
  },
  bookCover: {
    height: 200,
  },
  bookContent: {
    padding: 16,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  bookAuthor: {
    fontSize: 14,
    marginBottom: 12,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    borderRadius: 16,
  },
});
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button, Snackbar } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ModernCard, ModernButton, ModernAvatar } from '../components/ModernCard';
import { mockBooks, mockOtherUsers } from '../data/mockData';

const { width, height } = Dimensions.get('window');

export default function ExploreScreen() {
  const { addMatch } = useApp();
  const { theme } = useTheme();
  const [cards, setCards] = useState<any[]>([]);
  const [swipedAllCards, setSwipedAllCards] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const availableBooks = mockBooks.filter((book) => book.status === 'available');
    setCards(availableBooks);
  }, []);

  const onSwipedLeft = (cardIndex: number) => {
    setSnackbarMessage('Livro removido das sugestões');
    setSnackbarVisible(true);
  };

  const onSwipedRight = (cardIndex: number) => {
    const book = cards[cardIndex];
    const owner = mockOtherUsers.find((user) => user.id === book.ownerId);

    setSnackbarMessage(`Interesse demonstrado em "${book.title}" de ${owner?.name}!`);
    setSnackbarVisible(true);

    addMatch({
      id: Date.now().toString(),
      users: ['1', book.ownerId],
      books: ['1', book.id],
      timestamp: new Date().toISOString(),
    });
  };

  const onSwipedAllCards = () => {
    setSwipedAllCards(true);
  };

  const renderCard = (card: any) => {
    const owner = mockOtherUsers.find((user) => user.id === card.ownerId);

    return (
      <ModernCard style={[styles.card, { backgroundColor: theme.colors.card }]} elevation={8}>
        <View style={styles.cardHeader}>
          <ModernAvatar source={{ uri: owner?.avatar || '' }} size={50} />
          <View style={styles.ownerInfo}>
            <Title style={[styles.ownerName, { color: theme.colors.text }]}>
              {owner?.name}
            </Title>
            <Paragraph style={[styles.ownerLocation, { color: theme.colors.textSecondary }]}>
              {owner?.location}
            </Paragraph>
          </View>
        </View>

        <View style={styles.bookSection}>
          <Avatar.Image 
            size={120} 
            source={{ uri: card.cover }} 
            style={[styles.bookCover, { borderRadius: theme.borderRadius.lg }]}
          />
          <View style={styles.bookInfo}>
            <Title style={[styles.bookTitle, { color: theme.colors.text }]}>
              {card.title}
            </Title>
            <Paragraph style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}>
              {card.author}
            </Paragraph>
            {card.year && (
              <Paragraph style={[styles.bookYear, { color: theme.colors.textSecondary }]}>
                Publicado em {card.year}
              </Paragraph>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.passButton, { borderColor: theme.colors.error }]}
            onPress={() => onSwipedLeft(0)}
          >
            <MaterialIcons name="close" size={24} color={theme.colors.error} />
            <Paragraph style={[styles.actionText, { color: theme.colors.error }]}>
              Passar
            </Paragraph>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.likeButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => onSwipedRight(0)}
          >
            <MaterialIcons name="favorite" size={24} color="#FFFFFF" />
            <Paragraph style={[styles.actionText, { color: '#FFFFFF' }]}>
              Tenho Interesse
            </Paragraph>
          </TouchableOpacity>
        </View>
      </ModernCard>
    );
  };

  const renderNoMoreCards = () => (
    <ModernCard style={[styles.noMoreCards, { backgroundColor: theme.colors.card }]} elevation={2}>
      <View style={styles.noMoreCardsContent}>
        <MaterialIcons name="library-books" size={80} color={theme.colors.textSecondary} />
        <Title style={[styles.noMoreCardsTitle, { color: theme.colors.text }]}>
          Não há mais livros
        </Title>
        <Paragraph style={[styles.noMoreCardsText, { color: theme.colors.textSecondary }]}>
          Todos os livros disponíveis foram visualizados. Volte mais tarde para novas sugestões!
        </Paragraph>
      </View>
    </ModernCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {cards.length > 0 && !swipedAllCards ? (
        <Swiper
          cards={cards}
          renderCard={renderCard}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          onSwipedAllCards={onSwipedAllCards}
          cardIndex={0}
          backgroundColor="transparent"
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'PASSAR',
              style: {
                label: {
                  backgroundColor: theme.colors.error,
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                },
              },
            },
            right: {
              title: 'INTERESSE',
              style: {
                label: {
                  backgroundColor: theme.colors.primary,
                  color: '#FFFFFF',
                  fontSize: 24,
                  fontWeight: 'bold',
                  padding: 10,
                  borderRadius: 10,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                },
              },
            },
          }}
        />
      ) : (
        renderNoMoreCards()
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={[styles.snackbar, { backgroundColor: theme.colors.primary }]}
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
  card: {
    width: width * 0.9,
    height: height * 0.7,
    alignSelf: 'center',
    borderRadius: 24,
    padding: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  ownerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  ownerName: {
    fontSize: 18,
    fontWeight: '700',
  },
  ownerLocation: {
    fontSize: 14,
    marginTop: 2,
  },
  bookSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  bookCover: {
    marginBottom: 16,
  },
  bookInfo: {
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  bookAuthor: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
  },
  bookYear: {
    fontSize: 14,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  passButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  likeButton: {
    // backgroundColor is set dynamically
  },
  actionText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  noMoreCards: {
    width: width * 0.9,
    height: height * 0.5,
    alignSelf: 'center',
    marginTop: height * 0.1,
  },
  noMoreCardsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  noMoreCardsTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  noMoreCardsText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  snackbar: {
    borderRadius: 12,
  },
});
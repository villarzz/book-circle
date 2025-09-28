import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button, Chip, IconButton } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ModernCard, ModernButton, ModernAvatar } from '../components/ModernCard';
import { mockFeedItems } from '../data/mockData';

export default function FeedScreen() {
  const { state, addFeedItem, likeFeedItem } = useApp();
  const { theme } = useTheme();
  const { feed } = state;

  useEffect(() => {
    if (feed.length === 0) {
      mockFeedItems.forEach((item) => addFeedItem(item));
    }
  }, [feed.length, addFeedItem]);

  const renderFeedItem = ({ item }: { item: any }) => (
    <ModernCard style={styles.card} elevation={2}>
      <View style={styles.header}>
        <ModernAvatar source={{ uri: item.user.avatar }} size={48} />
        <View style={styles.userInfo}>
          <Title style={[styles.userName, { color: theme.colors.text }]}>
            {item.user.name}
          </Title>
          <Paragraph style={[styles.timestamp, { color: theme.colors.textSecondary }]}>
            {new Date(item.timestamp).toLocaleDateString('pt-BR')}
          </Paragraph>
        </View>
        <View style={[styles.typeChip, { backgroundColor: theme.colors.primary + '20' }]}>
          <Paragraph style={[styles.chipText, { color: theme.colors.primary }]}>
            {item.type === 'review' ? 'Resenha' : 
             item.type === 'activity' ? 'Atividade' : 'Recomendação'}
          </Paragraph>
        </View>
      </View>
      
      <View style={styles.bookInfo}>
        <Avatar.Image 
          size={80} 
          source={{ uri: item.book.cover }} 
          style={[styles.bookCover, { borderRadius: theme.borderRadius.md }]}
        />
        <View style={styles.bookDetails}>
          <Title style={[styles.bookTitle, { color: theme.colors.text }]}>
            {item.book.title}
          </Title>
          <Paragraph style={[styles.bookAuthor, { color: theme.colors.textSecondary }]}>
            {item.book.author}
          </Paragraph>
        </View>
      </View>
      
      <Paragraph style={[styles.content, { color: theme.colors.text }]}>
        {item.content}
      </Paragraph>
      
      <View style={styles.actions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}
          onPress={() => likeFeedItem(item.id)}
        >
          <MaterialIcons name="favorite" size={20} color={theme.colors.primary} />
          <Paragraph style={[styles.actionText, { color: theme.colors.text }]}>
            {item.likes}
          </Paragraph>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
          <MaterialIcons name="comment" size={20} color={theme.colors.secondary} />
          <Paragraph style={[styles.actionText, { color: theme.colors.text }]}>
            {item.comments}
          </Paragraph>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.surface }]}>
          <MaterialIcons name="share" size={20} color={theme.colors.success} />
          <Paragraph style={[styles.actionText, { color: theme.colors.text }]}>
            Compartilhar
          </Paragraph>
        </TouchableOpacity>
      </View>
    </ModernCard>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={feed}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {}}
            tintColor={theme.colors.primary}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 2,
  },
  typeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  bookInfo: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  bookCover: {
    marginRight: 16,
  },
  bookDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
  },
});
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button, TextInput, Divider, Chip, Switch } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import { ModernCard, ModernButton, ModernAvatar } from '../components/ModernCard';
import { mockUser } from '../data/mockData';

interface ProfileFormData {
  name: string;
  bio: string;
  location: string;
}

export default function ProfileScreen() {
  const { state, setUser } = useApp();
  const { theme, isDark, toggleTheme } = useTheme();
  const { user } = state;
  const [isEditing, setIsEditing] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
    },
  });

  useEffect(() => {
    if (!user) {
      setUser(mockUser);
    }
  }, [setUser, user]);

  const onEdit = () => {
    setIsEditing(true);
    reset({
      name: user?.name || '',
      bio: user?.bio || '',
      location: user?.location || '',
    });
  };

  const onSave = (data: ProfileFormData) => {
    if (user) {
      setUser({
        ...user,
        name: data.name,
        bio: data.bio,
        location: data.location,
      });
      setIsEditing(false);
    }
  };

  const onCancel = () => {
    setIsEditing(false);
    reset();
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ModernCard style={styles.loadingCard}>
          <Title style={{ color: theme.colors.text }}>Carregando...</Title>
        </ModernCard>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ModernCard style={styles.profileCard} elevation={3}>
        <View style={styles.profileContent}>
          <ModernAvatar source={{ uri: user.avatar }} size={100} />
          <Title style={[styles.userName, { color: theme.colors.text }]}>{user.name}</Title>
          <Paragraph style={[styles.userLocation, { color: theme.colors.textSecondary }]}>
            {user.location}
          </Paragraph>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Title style={[styles.statNumber, { color: theme.colors.primary }]}>
                {user.stats.booksCount}
              </Title>
              <Paragraph style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Livros
              </Paragraph>
            </View>
            <Divider style={[styles.statDivider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.statItem}>
              <Title style={[styles.statNumber, { color: theme.colors.primary }]}>
                {user.stats.tradesCount}
              </Title>
              <Paragraph style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                Trocas
              </Paragraph>
            </View>
          </View>
        </View>
      </ModernCard>

      <ModernCard style={styles.settingsCard} elevation={2}>
        <View style={styles.cardHeader}>
          <Title style={[styles.cardTitle, { color: theme.colors.text }]}>Configurações</Title>
        </View>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <MaterialIcons name="dark-mode" size={24} color={theme.colors.text} />
            <View style={styles.settingText}>
              <Paragraph style={[styles.settingTitle, { color: theme.colors.text }]}>
                Modo Escuro
              </Paragraph>
              <Paragraph style={[styles.settingSubtitle, { color: theme.colors.textSecondary }]}>
                {isDark ? 'Ativado' : 'Desativado'}
              </Paragraph>
            </View>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            color={theme.colors.primary}
          />
        </View>
      </ModernCard>

      <ModernCard style={styles.infoCard} elevation={2}>
        <View style={styles.cardHeader}>
          <Title style={[styles.cardTitle, { color: theme.colors.text }]}>Informações Pessoais</Title>
          {!isEditing && (
            <ModernButton
              title="Editar"
              onPress={onEdit}
              variant="outline"
              size="sm"
            />
          )}
        </View>

        {isEditing ? (
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              rules={{ required: 'Nome é obrigatório' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Nome"
                  value={value}
                  onChangeText={onChange}
                  style={[styles.input, { backgroundColor: theme.colors.surface }]}
                  error={!!errors.name}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      text: theme.colors.text,
                      placeholder: theme.colors.textSecondary,
                    },
                  }}
                />
              )}
            />
            {errors.name && (
              <Paragraph style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.name.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Biografia"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  numberOfLines={3}
                  style={[styles.input, { backgroundColor: theme.colors.surface }]}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      text: theme.colors.text,
                      placeholder: theme.colors.textSecondary,
                    },
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="location"
              rules={{ required: 'Localização é obrigatória' }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label="Localização"
                  value={value}
                  onChangeText={onChange}
                  style={[styles.input, { backgroundColor: theme.colors.surface }]}
                  error={!!errors.location}
                  theme={{
                    colors: {
                      primary: theme.colors.primary,
                      text: theme.colors.text,
                      placeholder: theme.colors.textSecondary,
                    },
                  }}
                />
              )}
            />
            {errors.location && (
              <Paragraph style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.location.message}
              </Paragraph>
            )}

            <View style={styles.formActions}>
              <ModernButton
                title="Cancelar"
                onPress={onCancel}
                variant="outline"
                style={styles.cancelButton}
              />
              <ModernButton
                title="Salvar"
                onPress={handleSubmit(onSave)}
                variant="primary"
                style={styles.saveButton}
              />
            </View>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Paragraph style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                Nome
              </Paragraph>
              <Paragraph style={[styles.infoValue, { color: theme.colors.text }]}>
                {user.name}
              </Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                Biografia
              </Paragraph>
              <Paragraph style={[styles.infoValue, { color: theme.colors.text }]}>
                {user.bio}
              </Paragraph>
            </View>
            <View style={styles.infoItem}>
              <Paragraph style={[styles.infoLabel, { color: theme.colors.textSecondary }]}>
                Localização
              </Paragraph>
              <Paragraph style={[styles.infoValue, { color: theme.colors.text }]}>
                {user.location}
              </Paragraph>
            </View>
          </View>
        )}
      </ModernCard>

      <ModernCard style={styles.activityCard} elevation={2}>
        <View style={styles.cardHeader}>
          <Title style={[styles.cardTitle, { color: theme.colors.text }]}>Atividade Recente</Title>
        </View>
        <View style={styles.activityItem}>
          <Chip 
            style={[styles.activityChip, { backgroundColor: theme.colors.primary + '20' }]}
            textStyle={[styles.activityChipText, { color: theme.colors.primary }]}
          >
            +1 Livro adicionado
          </Chip>
          <Paragraph style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
            Há 2 horas
          </Paragraph>
        </View>
        <View style={styles.activityItem}>
          <Chip 
            style={[styles.activityChip, { backgroundColor: theme.colors.success + '20' }]}
            textStyle={[styles.activityChipText, { color: theme.colors.success }]}
          >
            Match realizado
          </Chip>
          <Paragraph style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
            Ontem
          </Paragraph>
        </View>
        <View style={styles.activityItem}>
          <Chip 
            style={[styles.activityChip, { backgroundColor: theme.colors.warning + '20' }]}
            textStyle={[styles.activityChipText, { color: theme.colors.warning }]}
          >
            Troca concluída
          </Chip>
          <Paragraph style={[styles.activityTime, { color: theme.colors.textSecondary }]}>
            3 dias atrás
          </Paragraph>
        </View>
      </ModernCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingCard: {
    margin: 16,
    padding: 24,
    alignItems: 'center',
  },
  profileCard: {
    margin: 16,
    padding: 24,
  },
  profileContent: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  settingsCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
  },
  infoCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
  },
  activityCard: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    marginBottom: 32,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 12,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
  },
  formContainer: {
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 12,
    marginTop: -12,
    marginBottom: 8,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 12,
  },
  saveButton: {
    // Styles handled by ModernButton
  },
  infoContainer: {
    marginTop: 16,
  },
  infoItem: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  activityChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  activityChipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityTime: {
    fontSize: 12,
  },
});
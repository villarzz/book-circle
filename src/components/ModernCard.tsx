import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph, Avatar, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

interface ModernCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: any;
  elevation?: number;
}

export function ModernCard({ children, onPress, style, elevation = 0 }: ModernCardProps) {
  const { theme } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: elevation * 2 },
      shadowOpacity: elevation * 0.1,
      shadowRadius: elevation * 2,
      elevation: elevation,
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={cardStyle}>{children}</View>
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

interface ModernButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
  style?: any;
}

export function ModernButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md',
  icon,
  style 
}: ModernButtonProps) {
  const { theme } = useTheme();

  const getButtonStyle = () => {
    const baseStyle = {
      borderRadius: theme.borderRadius.md,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
    };

    const sizeStyle = {
      sm: { paddingVertical: theme.spacing.xs, paddingHorizontal: theme.spacing.sm },
      md: { paddingVertical: theme.spacing.sm, paddingHorizontal: theme.spacing.md },
      lg: { paddingVertical: theme.spacing.md, paddingHorizontal: theme.spacing.lg },
    };

    const variantStyle = {
      primary: {
        backgroundColor: theme.colors.primary,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
      },
    };

    return {
      ...baseStyle,
      ...sizeStyle[size],
      ...variantStyle[variant],
    };
  };

  const getTextStyle = () => {
    const baseStyle = {
      fontWeight: '600' as const,
      fontSize: size === 'sm' ? 14 : size === 'lg' ? 18 : 16,
    };

    const variantStyle = {
      primary: { color: '#FFFFFF' },
      secondary: { color: '#FFFFFF' },
      outline: { color: theme.colors.primary },
    };

    return {
      ...baseStyle,
      ...variantStyle[variant],
    };
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[getButtonStyle(), style]}
      activeOpacity={0.8}
    >
      {icon && (
        <MaterialIcons 
          name={icon as any} 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
          color={variant === 'outline' ? theme.colors.primary : '#FFFFFF'} 
          style={{ marginRight: theme.spacing.xs }}
        />
      )}
      <Paragraph style={getTextStyle()}>{title}</Paragraph>
    </TouchableOpacity>
  );
}

interface ModernAvatarProps {
  source: { uri: string };
  size?: number;
  style?: any;
}

export function ModernAvatar({ source, size = 40, style }: ModernAvatarProps) {
  const { theme } = useTheme();

  return (
    <Avatar.Image
      size={size}
      source={source}
      style={[
        {
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: theme.colors.primary,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
});

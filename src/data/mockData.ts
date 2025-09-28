import { User, Book, FeedItem } from '../store/useStore';

export const mockUser: User = {
  id: '1',
  name: 'João Silva',
  email: 'joao@email.com',
  bio: 'Apaixonado por literatura clássica e ficção científica',
  location: 'São Paulo, SP',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  stats: {
    booksCount: 12,
    tradesCount: 8,
  },
};

export const mockBooks: Book[] = [
  {
    id: '1',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    isbn: '9780451524935',
    year: 1949,
    status: 'available',
    ownerId: '1',
  },
  {
    id: '2',
    title: 'O Senhor dos Anéis',
    author: 'J.R.R. Tolkien',
    cover: 'https://covers.openlibrary.org/b/id/6979861-M.jpg',
    isbn: '9788533613379',
    year: 1954,
    status: 'reading',
    ownerId: '1',
  },
  {
    id: '3',
    title: 'Duna',
    author: 'Frank Herbert',
    cover: 'https://covers.openlibrary.org/b/id/7222246-M.jpg',
    isbn: '9780441013593',
    year: 1965,
    status: 'available',
    ownerId: '2',
  },
  {
    id: '4',
    title: 'Cem Anos de Solidão',
    author: 'Gabriel García Márquez',
    cover: 'https://covers.openlibrary.org/b/id/6979861-M.jpg',
    isbn: '9788535928569',
    year: 1967,
    status: 'available',
    ownerId: '3',
  },
];

export const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    type: 'review',
    user: {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      bio: 'Leitora voraz de ficção',
      location: 'Rio de Janeiro, RJ',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      stats: { booksCount: 25, tradesCount: 15 },
    },
    book: mockBooks[0],
    content:
      'Uma obra-prima da literatura distópica. Orwell consegue criar um mundo assustadoramente realista que nos faz refletir sobre o poder e a liberdade.',
    likes: 12,
    comments: 3,
    timestamp: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    type: 'activity',
    user: {
      id: '3',
      name: 'Pedro Costa',
      email: 'pedro@email.com',
      bio: 'Colecionador de livros raros',
      location: 'Belo Horizonte, MG',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      stats: { booksCount: 50, tradesCount: 30 },
    },
    book: mockBooks[1],
    content: 'Acabei de adicionar "O Senhor dos Anéis" à minha biblioteca!',
    likes: 8,
    comments: 1,
    timestamp: '2024-01-14T15:45:00Z',
  },
  {
    id: '3',
    type: 'recommendation',
    user: {
      id: '4',
      name: 'Ana Lima',
      email: 'ana@email.com',
      bio: 'Fã de fantasia e sci-fi',
      location: 'Porto Alegre, RS',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      stats: { booksCount: 18, tradesCount: 12 },
    },
    book: mockBooks[2],
    content:
      'Recomendo "Duna" para quem gosta de ficção científica épica. A construção de mundo é impressionante!',
    likes: 15,
    comments: 5,
    timestamp: '2024-01-13T09:20:00Z',
  },
];

export const mockOtherUsers: User[] = [
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@email.com',
    bio: 'Leitora voraz de ficção',
    location: 'Rio de Janeiro, RJ',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    stats: { booksCount: 25, tradesCount: 15 },
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@email.com',
    bio: 'Colecionador de livros raros',
    location: 'Belo Horizonte, MG',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    stats: { booksCount: 50, tradesCount: 30 },
  },
  {
    id: '4',
    name: 'Ana Lima',
    email: 'ana@email.com',
    bio: 'Fã de fantasia e sci-fi',
    location: 'Porto Alegre, RS',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    stats: { booksCount: 18, tradesCount: 12 },
  },
];


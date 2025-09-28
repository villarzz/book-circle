import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  avatar?: string;
  stats: {
    booksCount: number;
    tradesCount: number;
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  isbn?: string;
  year?: number;
  status: 'available' | 'reading' | 'traded';
  ownerId: string;
}

export interface FeedItem {
  id: string;
  type: 'review' | 'activity' | 'recommendation';
  user: User;
  book: Book;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Match {
  id: string;
  users: [string, string];
  books: [string, string];
  timestamp: string;
}

interface AppState {
  user: User | null;
  books: Book[];
  feed: FeedItem[];
  matches: Match[];
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'ADD_BOOK'; payload: Book }
  | { type: 'UPDATE_BOOK'; payload: { id: string; updates: Partial<Book> } }
  | { type: 'REMOVE_BOOK'; payload: string }
  | { type: 'ADD_FEED_ITEM'; payload: FeedItem }
  | { type: 'ADD_MATCH'; payload: Match }
  | { type: 'LIKE_FEED_ITEM'; payload: string };

const initialState: AppState = {
  user: null,
  books: [],
  feed: [],
  matches: [],
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? { ...book, ...action.payload.updates } : book
        ),
      };
    
    case 'REMOVE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    
    case 'ADD_FEED_ITEM':
      return { ...state, feed: [action.payload, ...state.feed] };
    
    case 'ADD_MATCH':
      return { ...state, matches: [...state.matches, action.payload] };
    
    case 'LIKE_FEED_ITEM':
      return {
        ...state,
        feed: state.feed.map((item) =>
          item.id === action.payload ? { ...item, likes: item.likes + 1 } : item
        ),
      };
    
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  setUser: (user: User) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  removeBook: (id: string) => void;
  addFeedItem: (item: FeedItem) => void;
  addMatch: (match: Match) => void;
  likeFeedItem: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setUser = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user });
  };

  const addBook = (book: Book) => {
    dispatch({ type: 'ADD_BOOK', payload: book });
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    dispatch({ type: 'UPDATE_BOOK', payload: { id, updates } });
  };

  const removeBook = (id: string) => {
    dispatch({ type: 'REMOVE_BOOK', payload: id });
  };

  const addFeedItem = (item: FeedItem) => {
    dispatch({ type: 'ADD_FEED_ITEM', payload: item });
  };

  const addMatch = (match: Match) => {
    dispatch({ type: 'ADD_MATCH', payload: match });
  };

  const likeFeedItem = (id: string) => {
    dispatch({ type: 'LIKE_FEED_ITEM', payload: id });
  };

  const value: AppContextType = {
    state,
    setUser,
    addBook,
    updateBook,
    removeBook,
    addFeedItem,
    addMatch,
    likeFeedItem,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

import { createContext, useContext, useEffect, useReducer } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';

// ─── Reducer ─────────────────────────────────────────────────────────────────
function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.user, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.loading };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

const initialState = {
  user: null,
  loading: true, // true on mount until Firebase resolves the session
  error: null,
};

// ─── Context ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null);

// ─── Provider ────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Subscribe to Firebase auth state changes once on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'SET_USER', user });
    });
    return unsubscribe;
  }, []);

  async function register(email, password, displayName) {
    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(user, { displayName });
      dispatch({ type: 'SET_USER', user: { ...user, displayName } });
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: formatFirebaseError(err.code) });
      throw err;
    }
  }

  async function login(email, password) {
    dispatch({ type: 'SET_LOADING', loading: true });
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged will set the user
    } catch (err) {
      dispatch({ type: 'SET_ERROR', error: formatFirebaseError(err.code) });
      throw err;
    }
  }

  async function logout() {
    await signOut(auth);
  }

  function clearError() {
    dispatch({ type: 'CLEAR_ERROR' });
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        isAuthenticated: !!state.user,
        register,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatFirebaseError(code) {
  const messages = {
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/invalid-credential': 'Invalid email or password.',
  };
  return messages[code] ?? 'Something went wrong. Please try again.';
}

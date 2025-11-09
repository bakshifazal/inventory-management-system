import { create } from 'zustand'

interface User {
  name: string
  role: string
}

interface Store {
  isAuthenticated: boolean
  currentUser: User | null
  login: (email: string, password: string) => void
  logout: () => void
}

export const useStore = create<Store>((set) => ({
  isAuthenticated: false,
  currentUser: null,
  login: (email: string, password: string) => {
    // Mock login for demo
    set({
      isAuthenticated: true,
      currentUser: {
        name: 'John Doe',
        role: 'Admin'
      }
    })
  },
  logout: () => {
    set({
      isAuthenticated: false,
      currentUser: null
    })
  }
}))
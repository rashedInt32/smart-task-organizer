'use client'

import { User } from '@/lib/db/types'
import {
  createContext,
  ReactNode,
  use,
  useContext,
  useEffect,
  useState,
} from 'react'

type UserContextType = {
  user: User | null
  setUser: (user: User | null) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function useUser(): UserContextType {
  let context = useContext(UserContext)
  if (context === null) {
    throw new Error('useUser must be used withing a UserProvider')
  }
  return context // {user, setUser}
}

export function UserProvider({
  children,
  userPromise,
}: {
  children: ReactNode
  userPromise: Promise<User | null>
}) {
  let initialUser = use(userPromise)
  let [user, setUser] = useState<User | null>(initialUser)

  useEffect(() => {
    setUser(initialUser)
  }, [initialUser])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

import { useAuth } from '@/data/contexts/AuthProvider/useAuth'
import { ProtectedLayout } from './ProtectedLayout.tsx/ProtectedLayout'
 
export default function Page() {
  const { user, logout } = useAuth()

  return (
    <ProtectedLayout>
      <div>
        HOME
        <br />
          Welcome {user?.name} - {user?.email}
          <br />
          Cookie {user?.token}
          <div>
            <button onClick={logout}>LOGOUT</button>
          </div>
      </div>
    </ProtectedLayout>
  )
}
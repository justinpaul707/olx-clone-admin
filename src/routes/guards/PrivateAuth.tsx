import { useEffect, useState } from 'react'
import {  Navigate, Outlet, useLocation } from 'react-router-dom'
import type { AuthRouteProps } from '@app/types'
import LayoutContainer from '@app/components/layouts'

const PrivateAuthProvider = ({ loginStatus }: AuthRouteProps) => {

  const [auth, setAuth] = useState<boolean>(!!localStorage.getItem("AUTH_TOKEN"))
  const location = useLocation()
  
  useEffect(() => {
    const authStatus: string | null = localStorage.getItem("AUTH_TOKEN")
    setAuth(authStatus !== null)
  }, [loginStatus])  
  return (
    auth ? <LayoutContainer loginStatus={loginStatus}>
        <Outlet />
        </LayoutContainer> : <Navigate to="/login" replace state={{ from: location }} />
  )
    
}

export default PrivateAuthProvider
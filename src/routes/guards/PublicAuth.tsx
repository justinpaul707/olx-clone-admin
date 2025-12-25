import { Outlet,} from 'react-router-dom'
import type { AuthRouteProps } from '@app/types'
import LayoutContainer from '@app/components/layouts';

const PublicAuthProvider = ({ loginStatus }: AuthRouteProps) => {
    return (
        <LayoutContainer loginStatus={loginStatus} >
        <Outlet />
        </LayoutContainer>
  ) 
}

export default PublicAuthProvider

import { Navigate, useLocation } from 'react-router'
import { useUser } from '../Providers/UserProvider'

const PrivateRoute = ({ children }) => {
    const {user} = useUser();
    const location = useLocation();

    if (user) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
}

export default PrivateRoute
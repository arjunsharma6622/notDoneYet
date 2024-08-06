import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Ensure the path is correct

const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
};

export default useAuth;
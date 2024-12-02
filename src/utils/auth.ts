import { API_CONFIG } from '@/services/constants';
import { NextRouter } from 'next/router';


export const logout = async (router: NextRouter) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        // const response = await fetch('https://neon-demo-production.up.railway.app/api/auth/logout', {
        const response = await fetch(API_CONFIG.BASE_URL + '/auth/logout', {
        
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            localStorage.removeItem('token');
            router.push('/');
        } else {
            const errorData = await response.json();
            console.error('Error during logout:', errorData.message);
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

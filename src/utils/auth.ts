import { NextRouter } from 'next/router';


export const logout = async (router: NextRouter) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return;
    }
    try {
        const response = await fetch('http://localhost:3333/auth/logout', {
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

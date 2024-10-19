export const API_CONFIG = {
    BASE_URL: 'http://localhost:3333',
    ENDPOINTS: {
        PERSONAL: '/admin/personal',
        CLIENTES: '/admin/clientes',
        MASCOTAS: '/admin/mascotas',
        LOGS: '/admin/logs'
    },
    ITEMS_PER_PAGE: 6
} as const;

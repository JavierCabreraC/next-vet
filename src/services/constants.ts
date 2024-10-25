export const API_CONFIG = {
    BASE_URL: 'http://localhost:3333',
    ENDPOINTS: {
        ADM_PERSONAL:   '/api/admin/personal',
        ADM_CLIENTES:   '/api/admin/clientes',
        ADM_MASCOTAS:   '/api/admin/mascotas',
        ADM_LOGS:       '/api/admin/logs',
        CLI_MASCOTAS:   '/api/cliente/mascotas'
    },
    ITEMS_PER_PAGE: 6
} as const;

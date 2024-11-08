export const API_CONFIG = {
    BASE_URL: 'http://localhost:3333/api',
    ENDPOINTS: {
        ADM_PERSONAL:          '/admin/personal',
        ADM_CLIENTES:          '/admin/clientes',
        ADM_MASCOTAS:          '/admin/mascotas',
        ADM_LOGS:              '/admin/logs',
        ADM_USERS:             '/admin/usuarios',
        ADM_RESERV:            '/admin/reservacion',
        CLI_MASCOTAS:          '/cliente/mascotas',
        CLI_RESERVA:           '/cliente/reservacion',
        CLI_RESERVACLI:        '/cliente/reservacion/cli',
        CLI_RESERVAGRAL:       '/cliente/reservacion/gral',
        DOC_VACUNAS:           '/vetdoc/vacunas',
        DOC_REGVAC:            '/vetdoc/regvac',
        DOC_RESERVPEN:         '/vetdoc/reservaciones',
        DOC_SERVPELU:          '/vetdoc/servicios/peluqueria',
        DOC_SERVPELUACT:       '/vetdoc/servicios/peluqueria/active',
        DOC_MASCOTAS:          '/vetdoc/mascotas',
        DOC_SERVACT:           '/vetdoc/servicios/active'
    },
    ITEMS_PER_PAGE: 6
} as const;

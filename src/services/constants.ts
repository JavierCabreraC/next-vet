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
        DOC_RESERVPEN:         '/vetdoc/reservaciones',            // lee las reservaciones pendientes
        DOC_SERVPELU:          '/vetdoc/servicios/peluqueria',      // para registrar servicio de peluqueria
        DOC_SERVCONS:          '/vetdoc/servicios/consulta',
        DOC_MASCOTAS:          '/vetdoc/mascotas',                 // lee las mascotaservicios/completed
        DOC_SERVACT:           '/vetdoc/servicios/active',         // lee servicios en proceso
        DOC_SERVEND:           '/vetdoc/servicios',                // para marcar un servicio como completado
        DOC_SERVCOM:           '/vetdoc/servicios/completed'      // lee servicios completados
    },
    ITEMS_PER_PAGE: 6
} as const;

export const API_CONFIG = {
    BASE_URL: 'http://localhost:3333/api',
    ENDPOINTS: {
        ADM_PERSONAL:                   '/admin/personal',
        ADM_CLIENTES:                   '/admin/clientes',
        ADM_MASCOTAS:                   '/admin/mascotas',
        ADM_RAZA:                       '/admin/raza',
        ADM_LOGS:                       '/admin/logs',
        ADM_USERS:                      '/admin/usuarios',
        ADM_USERSINACTIVOS:             '/admin/usuariosInactivos',
        ADM_RESERV:                     '/admin/reservacion',
        ADM_RESERVCLI:                  '/admin/reserv',
        ADM_REPORTBITACORA:             '/admin/report/bitacora',
        ADM_REPORTSERVICIO:             '/admin/report/servicios',
        ADM_REPORTVETSERV:              '/admin/reporte/vetservicios',
        ADM_REPORTDINAMICO:             '/admin/reporte/dinamico',
        ADM_SERVRECIBO:                 '/admin/servicios/recibo',
        ADM_CREARRECIBO:                '/admin/recibo',
        CLI_MASCOTAS:                   '/cliente/mascotas',
        CLI_RESERVA:                    '/cliente/reservacion',
        CLI_RESERVACLI:                 '/cliente/reservacion/cli',
        CLI_RESERVAGRAL:                '/cliente/reservacion/gral',
        CLI_HISRECETAS:                 '/cliente/historial/recetas',
        CLI_HISVACUNAS:                 '/cliente/historial/vacunas',
        CLI_HISSERVICIOS:               '/cliente/historial/servicios',
        CLI_HISDIAGNOS:                 '/cliente/historial/diagnosticos',
        DOC_VACUNAS:                    '/vetdoc/vacunas',
        DOC_REGVAC:                     '/vetdoc/regvac',
        DOC_RESERVPEN:                  '/vetdoc/reservaciones',
        DOC_RESERVCIRUGIA:              '/vetdoc/reservCirugia',
        DOC_SERVPELU:                   '/vetdoc/servicios/peluqueria',
        DOC_SERVCONS:                   '/vetdoc/servicios/consulta',
        DOC_SERVINTER:                  '/vetdoc/servicios/internacion',
        DOC_SERVCIRU:                   '/vetdoc/servicios/cirugia',
        DOC_MASCOTAS:                   '/vetdoc/mascotas',
        DOC_SERVACT:                    '/vetdoc/servicios/active',
        DOC_SERVEND:                    '/vetdoc/servicios/peluqueria',
        DOC_SERVCOM:                    '/vetdoc/servicios/completed',
        DOC_RECETACONS:                 '/vetdoc/receta/consulta',
        DOC_RECETAINT:                  '/vetdoc/receta/internacion',
        DOC_ANALISISINT:                '/vetdoc/analisis/internacion',
        DOC_ANALISISCONS:               '/vetdoc/analisis/consulta',
        DOC_ANALISIS:                   '/vetdoc/analisis',
        DOC_ANALISISMASCOTA:            '/vetdoc/analisisMascota',
        DOC_RECETAMASCOTA:              '/vetdoc/recetasMascota',
        DOC_RECETA:                     '/vetdoc/receta',
        DOC_RESERVACIRUGIA:             '/vetdoc/reservacion',
        DOC_CIRUGIAFIN:                 '/vetdoc/cirugiaFin'
    },
    ITEMS_PER_PAGE: 6
} as const;

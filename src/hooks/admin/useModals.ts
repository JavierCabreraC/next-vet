import { useState } from 'react';
import { API_CONFIG, ApiService } from '@/services/index.services';
import { Bitacora, Cliente, Mascota, Personal, Reservacion, Usuario } from '@/types/index.types';


export const useAdminModals = () => {
    const [activeForm, setActiveForm] = useState<'personal' | 'cliente' | 'mascota' | null>(null);
    
    const setShowPersonalForm = (show: boolean) => setActiveForm(show ? 'personal' : null);
    const setShowClienteForm = (show: boolean) => setActiveForm(show ? 'cliente' : null);
    const setShowMascotaForm = (show: boolean) => setActiveForm(show ? 'mascota' : null);

    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showMascotaModal, setShowMascotaModal] = useState(false);
    const [showBitacoraModal, setShowBitacoraModal] = useState(false);
    const [showReservacionModal, setShowReservacionModal] = useState(false);
    const [showUsuarioModal, setShowUsuarioModal] = useState(false);
    const [usuarioList, setUsuarioList] = useState<Usuario[]>([]);
    const [reservacionList, setReservacionList] = useState<Reservacion[]>([]);
    const [personalList, setPersonalList] = useState<Personal[]>([]);
    const [clienteList, setClienteList] = useState<Cliente[]>([]);
    const [mascotaList, setMascotaList] = useState<Mascota[]>([]);
    const [bitacoraList, setBitacoraList] = useState<Bitacora[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // <----- cantidad de registros por página

    const fetchData = async <T,>(endpoint: string, setData: React.Dispatch<React.SetStateAction<T[]>>) => {
        try {
            const data: T[] = await ApiService.fetch(endpoint, {
                method: 'GET',
            });
            setData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleViewList = async (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora' | 'reservacion' | 'usuarios') => {
        switch (type) {
            case 'personal':
                await fetchData<Personal>(API_CONFIG.ENDPOINTS.ADM_PERSONAL, setPersonalList);
                setShowPersonalModal(true);
                break;
            case 'clientes':
                await fetchData<Cliente>(API_CONFIG.ENDPOINTS.ADM_CLIENTES, setClienteList);
                setShowClienteModal(true);
                break;
            case 'mascotas':
                await fetchData<Mascota>(API_CONFIG.ENDPOINTS.ADM_MASCOTAS, setMascotaList);
                setShowMascotaModal(true);
                break;
            case 'bitacora':
                await fetchData<Bitacora>(API_CONFIG.ENDPOINTS.ADM_LOGS, setBitacoraList);
                setShowBitacoraModal(true);
                break;
            case 'reservacion':
                await fetchData<Reservacion>(API_CONFIG.ENDPOINTS.ADM_RESERV, setReservacionList);
                setShowReservacionModal(true);
                break;
            case 'usuarios':
                await fetchData<Usuario>(API_CONFIG.ENDPOINTS.ADM_USERS, setUsuarioList);
                setShowUsuarioModal(true);
                break;
        }
        setCurrentPage(1);
    };

    return {
        showPersonalForm: activeForm === 'personal',
        showClienteForm: activeForm === 'cliente',
        showMascotaForm: activeForm === 'mascota',
        setShowPersonalForm, setShowClienteForm, setShowMascotaForm,
        personalList, clienteList, mascotaList, bitacoraList, reservacionList, usuarioList,
        showUsuarioModal, setShowUsuarioModal,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        showReservacionModal, setShowReservacionModal,
        currentPage, setCurrentPage,
        itemsPerPage, handleViewList
    };
};

import { ApiService } from '@/services/index.services';
import { Bitacora, Cliente, Mascota, Personal } from '@/types/index.types';
import { useState } from 'react';


export const useAdminModals = () => {
    const [showPersonalForm, setShowPersonalForm] = useState(false);
    const [showClienteForm, setShowClienteForm] = useState(false);
    const [showMascotaForm, setShowMascotaForm] = useState(false);
    const [showPersonalModal, setShowPersonalModal] = useState(false);
    const [showClienteModal, setShowClienteModal] = useState(false);
    const [showMascotaModal, setShowMascotaModal] = useState(false);
    const [showBitacoraModal, setShowBitacoraModal] = useState(false);
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

    const handleViewList = async (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora') => {
        switch (type) {
            case 'personal':
                await fetchData<Personal>('/admin/personal/', setPersonalList);
                setShowPersonalModal(true);
                break;
            case 'clientes':
                await fetchData<Cliente>('/admin/clientes/', setClienteList);
                setShowClienteModal(true);
                break;
            case 'mascotas':
                await fetchData<Mascota>('/admin/mascotas/', setMascotaList);
                setShowMascotaModal(true);
                break;
            case 'bitacora':
                await fetchData<Bitacora>('/admin/logs/', setBitacoraList);
                setShowBitacoraModal(true);
                break;
        }
        setCurrentPage(1);
    };

    return {
        showPersonalForm, setShowPersonalForm,
        showClienteForm, setShowClienteForm,
        showMascotaForm, setShowMascotaForm,
        personalList, clienteList, mascotaList, bitacoraList,
        showPersonalModal, setShowPersonalModal,
        showClienteModal, setShowClienteModal,
        showMascotaModal, setShowMascotaModal,
        showBitacoraModal, setShowBitacoraModal,
        currentPage, setCurrentPage,
        itemsPerPage, handleViewList
    };
};

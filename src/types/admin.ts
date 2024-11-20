import React from 'react';
import { ApiResponse } from './index.types';


export interface Personal extends Record<string, unknown> {
    ID: number;
    Nombre: string;
    Telefono: string;
    Direccion: string;
    Fecha_De_Contratacion: string;
    Activo: boolean;
    Email: string;
    Cargo: string;
    Profesion: string;
}

export interface Cliente extends Record<string, unknown> {
    ClienteID: number;
    NombreCompleto: string;
    CI: string;
    Telefono: string;
    Direccion: string;
    Email: string;
}

export interface Mascota extends Record<string, unknown> {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Observaciones: string;
    Especie: string;
    Raza: string;
    DueñoID: string;
}

export interface Bitacora extends Record<string, unknown> {
    ID: number;
    UsuarioID: number;
    Accion: string;
    Fecha_Hora: string;
    IPDir: string;
}

export interface Reservacion extends Record<string, unknown> {
    ReservacionID: number;
    Fecha_Hora: string;
    UsuarioID: number;
    NombreCliente: string;
    Estado: string;
}

export interface Usuario extends Record<string, unknown> {
    UsuarioID: number;
    Rol: string;
    Estado: string;
}

export interface AdminActionsProps {
    onViewList: (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora' | 'reservacion' | 'usuarios') => void;
}

export interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export interface AdminCardsProps {
    onShowPersonalForm: () => void;
    onShowClienteForm: () => void;
    onShowMascotaForm: () => void;
}

export interface AdminHeaderProps {
    onLogout: () => void;
}

export interface RenderFormProps<T extends FormTypes> {
    title: string;
    form: T;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    onClose: () => void;
    handleSubmit: (formType: 'personal' | 'cliente' | 'mascota') => void;
}

export interface UpdateableRecord {
    PersonalID?: number;
    ClienteID?: number;
    MascotaID?: number;
}

export interface RenderModalProps<T extends Record<string, unknown>> {
    title: string;
    data: T[];
    onClose: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage?: number;
    onEdit?: (record: T) => void;
}

export interface AdminCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

export interface ResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    response: ApiResponse | null;
    title: string;
}

export interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: UpdateType | null;
    updateForm: UpdateForms;
    setUpdateForm: (form: UpdateForms) => void;
    onSubmit: () => void;
    setShowPersonalModal: (show: boolean) => void;
    setShowClienteModal: (show: boolean) => void;
    setShowMascotaModal: (show: boolean) => void;
}

export type PersonalForm = {
    NombreCompleto: string;
    Telefono: string;
    NumeroCI: number;
    Direccion: string;
    Email: string;
    FechaContratacion: string;
    CargoID: number;
    ProfesionID: number;
};

export type ClienteForm = {
    NombreCompleto: string;
    Telefono: string;
    Direccion: string;
    Email: string;
    NumeroCI: number;
};

export type MascotaForm = {
    Nombre: string;
    Sexo: string;
    FechaDeNacimiento: string;
    Observaciones: string;
    ClienteCI: number;
    RazaID: number;
};

export type FormTypes = PersonalForm | ClienteForm | MascotaForm;

export interface CurrentItemType {
    personal?: Personal;
    cliente?: Cliente;
    mascota?: Mascota;
    reservacion?: Reservacion;
    usuario?: Usuario;
}

export interface ReservacionUpdate extends Record<string, unknown> {
    ReservacionID: number;
}

export interface UsuarioUpdate extends Record<string, unknown> {
    UsuarioID: number;
}

export type UpdateType = 'personal' | 'cliente' | 'mascota' | 'reservacion' | 'usuario';

export interface UpdateForms {
    personalUpdate: {
        ID?: number;
        NombreCompleto?: string;
        Telefono?: string;
        Direccion?: string;
        CargoID?: string;
    };
    clienteUpdate: {
        ClienteID?: number;
        NombreCompleto?: string;
        Telefono?: string;
        Direccion?: string;
    };
    mascotaUpdate: {
        ID?: number;
        Nombre?: string;
        Sexo?: string;
        Observaciones?: string;
        ClienteID?: string;
    };
    reservacionUpdate: { ReservacionID: number };
    usuarioUpdate: { UsuarioID: number };
}

export type ViewListType = 'personal' | 'clientes' | 'mascotas' | 'bitacora' | 'usuarios' | 'reservacion';

export type HandleViewListFunction = (type: ViewListType) => Promise<void>;

export interface UseAdminUpdatesProps {
    setShowPersonalModal: (show: boolean) => void;
    setShowClienteModal: (show: boolean) => void;
    setShowMascotaModal: (show: boolean) => void;
    setShowUsuarioModal: (show: boolean) => void;
    setShowReservacionModal: (show: boolean) => void;
    handleViewList: HandleViewListFunction;
}

export interface Raza {
    RazaID: number;
    NombreRaza: string;
    NombreEspecie: string;
}

export interface RazaForm {
    NombreRaza: string;
    EspecieID: number;
}

export interface AutoTableColumn {
    header: string;
    dataKey?: string;
 }
 
 export interface AutoTableSettings {
    head: string[][];
    body: string[][];
    startY?: number;
    theme?: 'striped' | 'grid' | 'plain';
    margin?: { top: number; right: number; bottom: number; left: number };
    headStyles?: {
        fillColor?: number[];
        textColor?: number[];
        fontStyle?: 'normal' | 'bold' | 'italic';
        fontSize?: number;
    };
    bodyStyles?: {
        fillColor?: number[];
        textColor?: number[];
        fontSize?: number;
    };
    alternateRowStyles?: {
        fillColor?: number[];
    };
    tableWidth?: 'auto' | number;
    tableLineColor?: number[];
    tableLineWidth?: number;
 }

export interface BitacoraReport {
    FechaHora: string;
    IPDir: string;
    Accion: string;
}

export interface ServicioReport {
    TipoServicio: string;
    "Total Servicios": number;
}

export type ViewState = 
    // Usuarios
    | 'create-personal' | 'list-personal' 
    | 'create-cliente' | 'list-cliente'
    | 'list-usuarios-activos' | 'list-usuarios-inactivos'
    | 'list-logs'
    // Mascotas
    | 'list-raza' | 'create-raza' | 'create-mascota' | 'list-mascota'
    // Reservaciones
    | 'list-reservaciones'
    // Servicios
    | 'list-completed-services' | 'create-receipt' | 'list-receipts'
    // Reportes
    | 'report-bitacora' | 'report-servicios';

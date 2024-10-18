import React from 'react';
import { ApiResponse } from './index.types';


export interface Personal extends Record<string, unknown> {
    PersonalID: number;
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
    Telefono: string;
    Direccion: string;
    Email: string;
}

export interface Mascota extends Record<string, unknown> {
    MascotaID: number;
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
    IP: string;
}

// *****************************************************************************************************

export interface AdminActionsProps {
    onViewList: (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora') => void;
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

// *****************************************************************************************************

export type PersonalForm = {
    NombreCompleto: string;
    Telefono: string;
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
};

export type MascotaForm = {
    Nombre: string;
    Sexo: string;
    FechaDeNacimiento: string;
    Observaciones: string;
    ClienteID: number;
    RazaID: number;
};

export type FormTypes = PersonalForm | ClienteForm | MascotaForm;

// *****************************************************************************************************

// src/types/admin.types.ts
export interface CurrentItemType {
    personal?: Personal;
    cliente?: Cliente;
    mascota?: Mascota;
}

// export interface PersonalUpdateForm {
//     PersonalID: number;
//     NombreCompleto?: string;
//     Telefono?: string;
//     Direccion?: string;
//     CargoID?: number;
// }

// export interface ClienteUpdateForm {
//     ClienteID: number;
//     NombreCompleto?: string;
//     Telefono?: string;
//     Direccion?: string;
// }

// export interface MascotaUpdateForm {
//     MascotaID: number;
//     Nombre?: string;
//     Sexo?: string;
//     Observaciones?: string;
//     ClienteID?: number;
// }

// export interface UpdateForms {
//     personalUpdate: PersonalUpdateForm;
//     clienteUpdate: ClienteUpdateForm;
//     mascotaUpdate: MascotaUpdateForm;
// }

// export type UpdateType = 'personal' | 'cliente' | 'mascota';



// Definición más clara de tipos
export type UpdateType = 'personal' | 'cliente' | 'mascota';

export interface UpdateForms {
    personalUpdate: {
        PersonalID?: number;
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
        MascotaID?: number;
        Nombre?: string;
        Sexo?: string;
        Observaciones?: string;
        ClienteID?: string;
    };
}


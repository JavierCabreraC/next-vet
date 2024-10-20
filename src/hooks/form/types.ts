import { ApiResponse } from '@/types/responses';


export type FormConfig<T> = {
    initialState: T;
    endpoint: string;
    formType: 'personal' | 'cliente' | 'mascota';
    onSuccess?: (response: ApiResponse) => void;
    onError?: (error: Error) => void;
};

export type FormState<T> = {
    data: T;
    isSubmitting: boolean;
    error: string | null;
    response: ApiResponse | null;
};

export type UseGenericFormReturn<T> = {
    form: FormState<T>;
    setFormData: React.Dispatch<React.SetStateAction<T>>;  // Cambiado para coincidir con el tipo esperado
    handleSubmit: () => Promise<void>;
    resetForm: () => void;
    responseModal: {
        isOpen: boolean;
        response: ApiResponse | null;
        title: string;
        onClose: () => void;
    };
};

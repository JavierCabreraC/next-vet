import { useState } from 'react';
import { ApiService } from '@/services/index.services';
import type { FormConfig, FormState, UseGenericFormReturn } from './types';
import type { ApiResponse } from '@/types/index.types';


export function useGenericForm<T extends Record<string, unknown>>({
    initialState,
    endpoint,
    // formType,
    onSuccess,
    onError
}: FormConfig<T>): UseGenericFormReturn<T> {
    const [form, setForm] = useState<FormState<T>>({
        data: initialState,
        isSubmitting: false,
        error: null,
        response: null
    });

    const setFormData: React.Dispatch<React.SetStateAction<T>> = (value) => {
        setForm(prev => ({
            ...prev,
            data: value instanceof Function ? value(prev.data) : value
        }));
    };

    const [modalOpen, setModalOpen] = useState(false);

    const resetForm = () => {
        setForm({
            data: initialState,
            isSubmitting: false,
            error: null,
            response: null
        });
    };

    const handleSubmit = async () => {
        setForm(prev => ({
            ...prev,
            isSubmitting: true,
            error: null
        }));

        try {
            const response = await ApiService.fetch<ApiResponse>(endpoint, {
                method: 'POST',
                body: JSON.stringify(form.data)
            });

            setForm(prev => ({
                ...prev,
                isSubmitting: false,
                response
            }));

            onSuccess?.(response);
            resetForm();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            
            setForm(prev => ({
                ...prev,
                isSubmitting: false,
                error: errorMessage
            }));

            onError?.(error instanceof Error ? error : new Error(errorMessage));
        }
    };

    return {
        form,
        setFormData,
        handleSubmit,
        resetForm,
        responseModal: {
            isOpen: modalOpen,
            response: form.response,
            title: form.error || 'Operación exitosa',
            onClose: () => setModalOpen(false)
        }
    };
}

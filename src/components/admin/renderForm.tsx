import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FormTypes } from '@/types/admin';



interface RenderFormProps<T extends FormTypes> {
    title: string;
    form: T;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    onClose: () => void;
    handleSubmit: (formType: 'personal' | 'cliente' | 'mascota') => void;
}

export const renderForm = <T extends FormTypes>({
    title,
    form,
    setForm,
    onClose,
    handleSubmit
}: RenderFormProps<T>) => {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{title}</h2>
                <Button variant="ghost" onClick={onClose}>X</Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(title.split(' ')[1].toLowerCase() as 'personal' | 'cliente' | 'mascota'); }} className="space-y-4">
                    {(Object.keys(form) as Array<keyof T>).map((key) => (
                        <div key={key as string}>
                            <label htmlFor={key as string} className="block text-sm font-medium text-gray-700">{key as string}</label>
                            <Input
                                type={typeof form[key] === 'number' ? 'number' : 'text'}
                                id={key as string}
                                value={form[key]?.toString() ?? ''}
                                onChange={(e) => {
                                    const value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
                                    setForm(prev => ({ ...prev, [key]: value }));
                                }}
                                className="mt-1"
                                required
                            />
                        </div>
                    ))}
                    <Button type="submit" className="w-full">Registrar</Button>
                </form>
            </CardContent>
        </Card>
    );
};

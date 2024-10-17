import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const CreateClienteForm = () => {
    const [clienteData, setClienteData] = useState({
        NombreCompleto: '',
        Telefono: '',
        Direccion: '',
        Email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClienteData({ ...clienteData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/admin/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(clienteData),
        });
        if (response.ok) {
            alert('Cliente creado exitosamente');
        } else {
            alert('Error al crear cliente');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input name="NombreCompleto" value={clienteData.NombreCompleto} onChange={handleInputChange} placeholder="Nombre Completo" />
            <Input name="Telefono" value={clienteData.Telefono} onChange={handleInputChange} placeholder="Teléfono" />
            <Input name="Direccion" value={clienteData.Direccion} onChange={handleInputChange} placeholder="Dirección" />
            <Input name="Email" value={clienteData.Email} onChange={handleInputChange} placeholder="Email" />
            <Button type="submit">Registrar Cliente</Button>
        </form>
    );
};

export default CreateClienteForm;

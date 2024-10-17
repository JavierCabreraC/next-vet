import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 


const CreateMascotaForm = () => {
    const [mascotaData, setMascotaData] = useState({
        Nombre: '',
        Sexo: '',
        FechaDeNacimiento: '',
        Observaciones: '',
        ClienteID: '',
        RazaID: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMascotaData({ ...mascotaData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/admin/mascota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(mascotaData),
        });
        if (response.ok) {
            alert('Mascota creada exitosamente');
        } else {
            alert('Error al crear mascota');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input name="Nombre" value={mascotaData.Nombre} onChange={handleInputChange} placeholder="Nombre" />
            <Input name="Sexo" value={mascotaData.Sexo} onChange={handleInputChange} placeholder="Sexo" />
            <Input name="FechaDeNacimiento" type="date" value={mascotaData.FechaDeNacimiento} onChange={handleInputChange} />
            <Input name="Observaciones" value={mascotaData.Observaciones} onChange={handleInputChange} placeholder="Observaciones" />
            <Input name="ClienteID" value={mascotaData.ClienteID} onChange={handleInputChange} placeholder="Cliente ID" />
            <Input name="RazaID" value={mascotaData.RazaID} onChange={handleInputChange} placeholder="Raza ID" />
            <Button type="submit">Registrar Mascota</Button>
        </form>
    );
};

export default CreateMascotaForm;

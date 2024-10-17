import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


const CreatePersonalForm = () => {
    const [personalData, setPersonalData] = useState({
        NombreCompleto: '',
        Telefono: '',
        Direccion: '',
        Email: '',
        FechaContratacion: '',
        CargoID: '',
        ProfesionID: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonalData({ ...personalData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3333/admin/personal', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(personalData),
        });
        if (response.ok) {
            alert('Personal creado exitosamente');
        } else {
            alert('Error al crear personal');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input name="NombreCompleto" value={personalData.NombreCompleto} onChange={handleInputChange} placeholder="Nombre Completo" />
            <Input name="Telefono" value={personalData.Telefono} onChange={handleInputChange} placeholder="Teléfono" />
            <Input name="Direccion" value={personalData.Direccion} onChange={handleInputChange} placeholder="Dirección" />
            <Input name="Email" value={personalData.Email} onChange={handleInputChange} placeholder="Email" />
            <Input name="FechaContratacion" type="date" value={personalData.FechaContratacion} onChange={handleInputChange} />
            <Input name="CargoID" value={personalData.CargoID} onChange={handleInputChange} placeholder="Cargo ID" />
            <Input name="ProfesionID" value={personalData.ProfesionID} onChange={handleInputChange} placeholder="Profesión ID" />
            <Button type="submit">Registrar Personal</Button>
        </form>
    );
};

export default CreatePersonalForm;

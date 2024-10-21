import React from 'react';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


interface Mascota {
    ID: number;
    Nombre: string;
    Sexo: string;
    Fecha_De_Nacimiento: string;
    Años: string;
    Meses: string;
    Especie: string;
    Raza: string;
}

interface MascotasListProps {
    mascotas: Mascota[];
}

export const MascotasList: React.FC<MascotasListProps> = ({ mascotas }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sexo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edad</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Especie</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raza</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {mascotas.map((mascota) => (
                        <tr key={mascota.ID}>
                            <td className="px-6 py-4 whitespace-nowrap">{mascota.Nombre}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mascota.Sexo}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{`${mascota.Años} años, ${mascota.Meses} meses`}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mascota.Especie}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{mascota.Raza}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

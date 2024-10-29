import React from 'react';
import { MascotaCli } from '@/types/index.types';


interface MascotasListProps {
    mascotas: MascotaCli[];
}

export const MascotasList: React.FC<MascotasListProps> = ({ mascotas }) => {
    // Renderizado para dispositivos móviles
    const renderMobileCard = (mascota: MascotaCli) => (
        <div key={mascota.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Nombre: </span>
                <span className="text-gray-600">{mascota.Nombre}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Sexo: </span>
                <span className="text-gray-600">{mascota.Sexo}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Edad: </span>
                <span className="text-gray-600">{`${mascota.Años} años, ${mascota.Meses} meses`}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Especie: </span>
                <span className="text-gray-600">{mascota.Especie}</span>
            </div>
            <div className="mb-2 text-center">
                <span className="font-semibold text-gray-700">Raza: </span>
                <span className="text-gray-600">{mascota.Raza}</span>
            </div>
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Nombre
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Sexo
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Edad
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Especie
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Raza
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map((mascota) => (
                        <tr 
                            key={mascota.ID}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Nombre}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Sexo}</td>
                            <td className="p-3 text-center border-b border-gray-200">{`${mascota.Años} años, ${mascota.Meses} meses`}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Especie}</td>
                            <td className="p-3 text-center border-b border-gray-200">{mascota.Raza}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {/* Vista móvil */}
            <div className="md:hidden">
                {mascotas.map(mascota => renderMobileCard(mascota))}
            </div>

            {/* Vista desktop */}
            <div className="hidden md:block">
                {renderDesktopTable()}
            </div>
        </div>
    );
};

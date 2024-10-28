import type { VacunacionRegistro } from '@/types/index.types';


interface VacunacionListProps {
    registros: VacunacionRegistro[];
}

export const VacunacionList: React.FC<VacunacionListProps> = ({ registros }) => {
    const formatDate = (dateString: string): string => {
        return new Date(dateString).toLocaleDateString();
    };

    const renderMobileCard = (registro: VacunacionRegistro) => (
        <div key={`${registro.Nombre}-${registro.Fecha_De_Vacunacion}`} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">MascotaID: </span>
                <span className="text-gray-600">{registro.MascotaID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Mascota: </span>
                <span className="text-gray-600">{registro.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Raza: </span>
                <span className="text-gray-600">{registro.Raza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Vacuna: </span>
                <span className="text-gray-600">{registro.Vacuna}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha de Vacunación: </span>
                <span className="text-gray-600">{formatDate(registro.Fecha_De_Vacunacion)}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Próxima Fecha: </span>
                <span className="text-gray-600">{formatDate(registro.Proxima_Fecha)}</span>
            </div>
        </div>
    );

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold">MascotaID</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Mascota</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Raza</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Vacuna</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Fecha de Vacunación</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Próxima Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map((registro, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{registro.MascotaID}</td>
                            <td className="p-3 border-b">{registro.Nombre}</td>
                            <td className="p-3 border-b">{registro.Raza}</td>
                            <td className="p-3 border-b">{registro.Vacuna}</td>
                            <td className="p-3 border-b text-center">{formatDate(registro.Fecha_De_Vacunacion)}</td>
                            <td className="p-3 border-b text-center">{formatDate(registro.Proxima_Fecha)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="md:hidden">
                {registros.map((registro) => renderMobileCard(registro))}
            </div>
            <div className="hidden md:block">
                {renderDesktopTable()}
            </div>
        </div>
    );
};

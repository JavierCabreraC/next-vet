interface Vacuna {
    ID: number;
    Vacuna: string;
    Descripcion: string;
    Laboratorio: string;
    Tipo: string;
    EdadMinima: number;
}

interface VacunasListProps {
    vacunas: Vacuna[];
}

export const VacunasList: React.FC<VacunasListProps> = ({ vacunas }) => {
    const renderMobileCard = (vacuna: Vacuna) => (
        <div key={vacuna.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Nombre: </span>
                <span className="text-gray-600">{vacuna.Vacuna}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Descripción: </span>
                <span className="text-gray-600">{vacuna.Descripcion}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Laboratorio: </span>
                <span className="text-gray-600">{vacuna.Laboratorio}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Tipo: </span>
                <span className="text-gray-600">{vacuna.Tipo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Edad Mínima: </span>
                <span className="text-gray-600">{vacuna.EdadMinima} meses</span>
            </div>
        </div>
    );

    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Nombre</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Descripción</th>
                        <th className="p-3 bg-gray-100 text-left font-semibold">Laboratorio</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Tipo</th>
                        <th className="p-3 bg-gray-100 text-center font-semibold">Edad Mínima</th>
                    </tr>
                </thead>
                <tbody>
                    {vacunas.map((vacuna) => (
                        <tr key={vacuna.ID} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{vacuna.Vacuna}</td>
                            <td className="p-3 border-b">{vacuna.Descripcion}</td>
                            <td className="p-3 border-b">{vacuna.Laboratorio}</td>
                            <td className="p-3 border-b text-center">{vacuna.Tipo}</td>
                            <td className="p-3 border-b text-center">{vacuna.EdadMinima} meses</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            <div className="md:hidden">
                {vacunas.map(vacuna => renderMobileCard(vacuna))}
            </div>
            <div className="hidden md:block">
                {renderDesktopTable()}
            </div>
        </div>
    );
};

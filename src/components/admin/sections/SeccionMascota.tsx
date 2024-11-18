import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/index.ui';
import { Mascota, ViewState } from '@/types/admin';
import { CrearRazaForm, RazaList } from '../index.admincomp';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';


interface MascotaSectionProps {
    view: ViewState;
    setCurrentView: (view: ViewState) => void;
}

export const MascotaSection: React.FC<MascotaSectionProps> = ({ view, setCurrentView }) => {
    const [petList, setPetList] = useState<Mascota[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const petColumns: Column<Mascota>[] = [
        { key: 'ID', header: 'ID' },
        { key: 'Nombre', header: 'Nombre' },
        { key: 'Sexo', header: 'Sexo' },
        { key: 'Especie', header: 'Especie' },
        { key: 'Raza', header: 'Raza' },
        { key: 'Observaciones', header: 'Observaciones' },
        { key: 'DueñoID', header: 'ID Dueño' },
        { 
            key: 'Fecha_De_Nacimiento', 
            header: 'Fecha de Nacimiento',
            render: (mascota: Mascota) => new Date(mascota.Fecha_De_Nacimiento).toLocaleDateString()
        },
        {
            key: 'actions',
            header: 'Editar',
            render: (mascota: Mascota) => (
                <Button
                    onClick={() => handleEditMascota(mascota)}
                    className="bg-yellow-500 hover:bg-yellow-600"
                    size="sm"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )
        }
    ];

    const renderPetMobileCard = (mascota: Mascota) => (
        <div key={mascota.ID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{mascota.ID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Nombre: </span>
                <span>{mascota.Nombre}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Sexo: </span>
                <span>{mascota.Sexo}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Especie: </span>
                <span>{mascota.Especie}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Raza: </span>
                <span>{mascota.Raza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Obs: </span>
                <span>{mascota.Observaciones}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Dueño ID: </span>
                <span>{mascota.DueñoID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Fecha de Nacimiento: </span>
                <span>{new Date(mascota.Fecha_De_Nacimiento).toLocaleDateString()}</span>
            </div>
            <Button
                onClick={() => handleEditMascota(mascota)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 mt-2"
            >
                <Pencil className="h-4 w-4 mr-2" />
                Editar
            </Button>
        </div>
    );

    const loadPetData = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Mascota[]>(`${API_CONFIG.ENDPOINTS.ADM_MASCOTAS}`, {
                method: 'GET',
            });
            setPetList(data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditMascota = (personal: Mascota) => {
        // Implementar lógica de edición
        console.log('Editar Cliente:', personal);
    };

    useEffect(() => {
        if (view === 'list-pets') {
            loadPetData();
        }
    }, [view]);

    switch (view) {
        case 'list-pets':
            return (
                <div>
                    <h2 className="text-2xl font-bold mb-6">Lista de Mascotas</h2>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={petList}
                            columns={petColumns}
                            renderMobileCard={renderPetMobileCard}
                        />
                    )}
                </div>
            );

        case 'list-raza':
            return <RazaList 
                isLoading={isLoading} 
                setIsLoading={setIsLoading}
                setCurrentView={setCurrentView}
            />;

        case 'create-raza':
            return <CrearRazaForm setCurrentView={setCurrentView} />;
            
        // Implementar otros casos...
        default:
            return null;
    }
};

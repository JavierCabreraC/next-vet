import { useState, useEffect } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { Button, Input } from '@/components/ui/index.ui';
import { Mascota, Raza, RazaForm, ViewState } from '@/types/admin';
import { API_CONFIG, ApiService,  } from '@/services/index.services';
import { Column, DataTable } from '@/components/vetdoc/common/DataTable';


interface MascotaSectionProps {
    view: ViewState;
    setCurrentView: (view: ViewState) => void;
}

export const MascotaSection: React.FC<MascotaSectionProps> = ({ view, setCurrentView }) => {
    const [petList, setPetList] = useState<Mascota[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [breedList, setBreedList] = useState<Raza[]>([]);
    const [breedForm, setBreedForm] = useState<RazaForm>({
        NombreRaza: '',
        EspecieID: 1
    });

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

    // Columnas para la tabla de razas
    const breedColumns: Column<Raza>[] = [
        { key: 'RazaID', header: 'ID' },
        { key: 'NombreRaza', header: 'Raza' },
        { key: 'NombreEspecie', header: 'Especie' }
    ];

    // Renderizado móvil para razas
    const renderBreedMobileCard = (raza: Raza) => (
        <div key={raza.RazaID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold">ID: </span>
                <span>{raza.RazaID}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Raza: </span>
                <span>{raza.NombreRaza}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold">Especie: </span>
                <span>{raza.NombreEspecie}</span>
            </div>
        </div>
    );

    // Cargar razas
    const loadBreeds = async () => {
        try {
            setIsLoading(true);
            const data = await ApiService.fetch<Raza[]>(`${API_CONFIG.ENDPOINTS.ADM_RAZA}`, {
                method: 'GET',
            });
            setBreedList(data);
        } catch (error) {
            console.error('Error al cargar razas:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Crear nueva raza
    const handleCreateBreed = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await ApiService.fetch(`${API_CONFIG.ENDPOINTS.ADM_RAZA}`, {
                method: 'POST',
                body: JSON.stringify(breedForm)
            });
            // Resetear formulario
            setBreedForm({ NombreRaza: '', EspecieID: 1 });
            // Recargar lista
            await loadBreeds();
            // Volver a la lista
            setCurrentView('manage-breeds');
        } catch (error) {
            console.error('Error al crear raza:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (view === 'manage-breeds') {
            loadBreeds();
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
        case 'manage-breeds':
            return (
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Razas Registradas</h2>
                        <Button onClick={() => setCurrentView('create-breed')}>
                            <Plus className="mr-2" size={16} />
                            Nueva Raza
                        </Button>
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8">
                            Cargando...
                        </div>
                    ) : (
                        <DataTable
                            data={breedList}
                            columns={breedColumns}
                            renderMobileCard={renderBreedMobileCard}
                        />
                    )}
                </div>
            );
        case 'create-breed':
            return (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Registrar Nueva Raza</h2>
                    <form onSubmit={handleCreateBreed} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Nombre de la Raza
                            </label>
                            <Input
                                value={breedForm.NombreRaza}
                                onChange={(e) => setBreedForm({
                                    ...breedForm,
                                    NombreRaza: e.target.value
                                })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Especie
                            </label>
                            <select
                                className="w-full border rounded-md p-2"
                                value={breedForm.EspecieID}
                                onChange={(e) => setBreedForm({
                                    ...breedForm,
                                    EspecieID: parseInt(e.target.value)
                                })}
                                required
                            >
                                <option value={1}>Perro</option>
                                <option value={2}>Gato</option>
                                <option value={3}>Roedor</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <Button 
                                type="button" 
                                variant="outline"
                                onClick={() => setCurrentView('manage-breeds')}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">
                                Registrar Raza
                            </Button>
                        </div>
                    </form>
                </div>
            );
        // Implementar otros casos...
        default:
            return null;
    }
};

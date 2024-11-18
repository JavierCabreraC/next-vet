import { useState } from 'react';
import { ViewState } from '@/types/admin';
import { CrearRazaForm, MascotaList, RazaList } from '../index.admincomp';


interface MascotaSectionProps {
    view: ViewState;
    setCurrentView: (view: ViewState) => void;
}

export const MascotaSection: React.FC<MascotaSectionProps> = ({ view, setCurrentView }) => {
    const [isLoading, setIsLoading] = useState(false);

    switch (view) {
        case 'list-mascota':
            return <MascotaList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
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

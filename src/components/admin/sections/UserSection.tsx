import { useState } from 'react';
import { ViewState } from '@/types/admin';
import { BitacoraList, ClienteList, CrearPersonalForm, 
    PersonalList, UsuarioList } from '@/components/admin/index.admincomp';
import { CreateClienteForm } from '../usuarios/formularios/CrearClienteForm';


interface UserSectionProps {
    view: ViewState;
}

export const UserSection: React.FC<UserSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);

    switch (view) {
        case 'create-cliente':
            return <CreateClienteForm />;

        case 'create-personal':
            return <CrearPersonalForm />;

        case 'list-personal':
            return <PersonalList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
        case 'list-cliente':
            return <ClienteList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
            
        case 'list-active-users':
            return <UsuarioList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
    
        case 'list-logs':
            return <BitacoraList isLoading={ isLoading } setIsLoading={ setIsLoading } />;
    
        // Implementar otros casos...
        default:
            return null;
    }
};

import React from 'react';
import { Button } from '@/components/ui/button';


interface AdminActionsProps {
    onViewList: (type: 'personal' | 'clientes' | 'mascotas' | 'bitacora') => void;
}

export const AdminActions: React.FC<AdminActionsProps> = ({ onViewList }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <Button onClick={() => onViewList('personal')} className="w-full">Ver Lista de Personal</Button>
          <Button onClick={() => onViewList('clientes')} className="w-full">Ver Lista de Clientes</Button>
          <Button onClick={() => onViewList('mascotas')} className="w-full">Ver Lista de Mascotas</Button>
          <Button onClick={() => onViewList('bitacora')} className="w-full">Ver Bitácora</Button>
      </div>
    );
};

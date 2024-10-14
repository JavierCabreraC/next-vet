import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ApiResponse } from '@/types/responses';



interface ResponseModalProps {
    isOpen: boolean;
    onClose: () => void;
    response: ApiResponse | null;
    title: string;
}

const ResponseModal: React.FC<ResponseModalProps> = ({ isOpen, onClose, response, title }) => {
    if (!response) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            {Object.entries(response).map(([key, value]) => (
              <p key={key} className="text-sm text-gray-500">
                <span className="font-medium">{key}:</span> {value}
              </p>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
};

export default ResponseModal;

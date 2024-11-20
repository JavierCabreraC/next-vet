import { useState } from "react";
import { ViewState } from "@/types/admin";
import { ReservacionList } from "../index.admincomp";


interface ReservacionSectionProps {
    view: ViewState;
}

export const ReservacionSection: React.FC<ReservacionSectionProps> = ({ view }) => {
    const [isLoading, setIsLoading] = useState(false);

    switch (view) {
        case 'list-reservaciones':
            return <ReservacionList isLoading={isLoading} setIsLoading={setIsLoading} />;
            
        default:
            return null;
    }
};

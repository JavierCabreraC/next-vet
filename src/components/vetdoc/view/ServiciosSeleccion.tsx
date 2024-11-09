import { ServiceType } from "@/types/vetdoc";
import { Activity, BedDouble, Scissors, Syringe, TestTube } from "lucide-react";


interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-105 cursor-pointer"
    >
        <div className="text-blue-500 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

interface ServicioSelectionProps {
    onServiceSelect: (service: ServiceType) => void;
}

export const ServicioSelection: React.FC<ServicioSelectionProps> = ({ onServiceSelect }) => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Nuevo Servicio</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
                icon={<Activity size={40} />}
                title="Consulta Médica"
                description="Registro de consulta veterinaria"
                onClick={() => onServiceSelect('consulta')}
            />
            <ServiceCard
                icon={<Scissors size={40} />}
                title="Peluquería"
                description="Registro de servicio de peluquería"
                onClick={() => onServiceSelect('peluqueria')}
            />
            <ServiceCard
                icon={<BedDouble size={40} />}
                title="Internación"
                description="Registro de internación"
                onClick={() => onServiceSelect('internacion')}
            />
            <ServiceCard
                icon={<TestTube size={40} />}
                title="Análisis Clínico"
                description="Registro de análisis clínico"
                onClick={() => onServiceSelect('analisis')}
            />
            <ServiceCard
                icon={<Syringe size={40} />}
                title="Cirugía"
                description="Registro de cirugía"
                onClick={() => onServiceSelect('cirugia')}
            />
        </div>
    </div>
);

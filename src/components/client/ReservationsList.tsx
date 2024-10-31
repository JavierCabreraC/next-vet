import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { PendingReservation } from '@/types/index.types';


interface ReservationsListProps {
    reservations: PendingReservation[];
}

export const ReservationsList: React.FC<ReservationsListProps> = ({ reservations }) => {
    const formatDateTime = (dateTimeStr: string): string => {
        const date = new Date(dateTimeStr);
        return format(date, "d 'de' MMMM 'de' yyyy 'a las' HH:mm", { locale: es });
    };

    // Renderizado para dispositivos móviles
    const renderMobileCard = (reservation: PendingReservation) => (
        <div key={reservation.ReservacionID} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Fecha y Hora: </span>
                <span className="text-gray-600">
                    {formatDateTime(reservation.Fecha_Hora)}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Estado: </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {reservation.Estado}
                </span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">ID Reservación: </span>
                <span className="text-gray-600">#{reservation.ReservacionID}</span>
            </div>
        </div>
    );

    // Renderizado para desktop
    const renderDesktopTable = () => (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            ID Reservación
                        </th>
                        <th className="p-3 bg-gray-100 text-left font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Fecha y Hora
                        </th>
                        <th className="p-3 bg-gray-100 text-center font-semibold text-sm text-gray-600 uppercase tracking-wider">
                            Estado
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reservations.map((reservation) => (
                        <tr 
                            key={reservation.ReservacionID}
                            className="hover:bg-gray-50 transition-colors"
                        >
                            <td className="p-3 border-b border-gray-200">
                                #{reservation.ReservacionID}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                {formatDateTime(reservation.Fecha_Hora)}
                            </td>
                            <td className="p-3 border-b border-gray-200">
                                <div className="flex justify-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                        {reservation.Estado}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow p-4">
            {reservations.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                    No tienes reservaciones pendientes
                </div>
            ) : (
                <>
                    {/* Vista móvil */}
                    <div className="md:hidden">
                        {reservations.map(reservation => renderMobileCard(reservation))}
                    </div>

                    {/* Vista desktop */}
                    <div className="hidden md:block">
                        {renderDesktopTable()}
                    </div>
                </>
            )}
        </div>
    );
};
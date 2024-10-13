import React from 'react';
import { Button } from '@/components/ui/button';



interface RenderModalProps<T extends Record<string, unknown>> {
    title: string;
    data: T[];
    onClose: () => void;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    itemsPerPage?: number;
}

export const renderModal = <T extends Record<string, unknown>>({
    title,
    data,
    onClose,
    currentPage,
    setCurrentPage,
    itemsPerPage = 5
}: RenderModalProps<T>) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const renderPagination = (totalItems: number) => {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        return (
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        className="mx-1"
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-3/4 max-h-[80vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <table className="w-full">
                    <thead>
                        <tr>
                            {Object.keys(currentItems[0] || {}).map((key) => (
                                <th key={key} className="text-left p-2">{key}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                {Object.values(item).map((value, valueIndex) => (
                                    <td key={valueIndex} className="p-2">{value?.toString()}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {renderPagination(data.length)}
                <Button onClick={onClose} className="mt-4">Cerrar</Button>
            </div>
        </div>
    );
};

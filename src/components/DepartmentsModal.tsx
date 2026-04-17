"use client";

import { Briefcase, Tv, Monitor, Heart, CookingPot, Smartphone, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

type DepartmentsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export function DepartmentsModal({ isOpen, onClose }: DepartmentsModalProps) {
    if (!isOpen) return null;

    const departments = [
        { name: "Papelaria & Escritório", icon: Briefcase, slug: "papelaria-e-escritorio" },
        { name: "Eletrônicos & TVs", icon: Tv, slug: "eletronicos-e-tvs" },
        { name: "Informática & Acessórios", icon: Monitor, slug: "informatica-e-acessorios" },
        { name: "Saúde, Nutrição & Bem-Estar", icon: Heart, slug: "saude-nutricao-e-bem-estar" },
        { name: "Utilidades Domésticas", icon: CookingPot, slug: "utilidades-domesticas" },
        { name: "Áudio, Vídeo & Mobile", icon: Smartphone, slug: "audio-video-e-mobile" },
    ];

    return (
        <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto relative z-10 animate-slide-up pb-safe">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
                    <h2 className="font-bold text-lg text-gray-900">Departamentos</h2>
                    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                <div className="p-2">
                    {departments.map((dept, index) => (
                        <Link 
                            key={index}
                            href={`/departamento/${dept.slug}`}
                            className="flex items-center gap-4 p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 active:bg-blue-50 transition-colors rounded-lg"
                            onClick={onClose}
                        >
                            <div className="p-2 bg-blue-50 text-[#0464D5] rounded-lg">
                                <dept.icon className="w-6 h-6" />
                            </div>
                            <span className="font-medium text-gray-700 flex-1">{dept.name}</span>
                            <ChevronRight className="w-5 h-5 text-gray-300" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

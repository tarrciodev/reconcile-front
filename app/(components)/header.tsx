// components/Header.tsx
import { Button } from "@/components/ui/button"; // Assumindo que este caminho está correto
import { Building2, Moon, Sun } from "lucide-react";
import React from "react";

interface HeaderProps {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    isDarkMode,
    toggleDarkMode,
}) => {
    return (
        <header className='sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60'>
            <div className='container mx-auto px-6 py-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center justify-center w-10 h-10 rounded-xl bg-orange text-white'>
                            <Building2 className='w-6 h-6' />
                        </div>
                        <h1 className='text-2xl font-bold text-foreground'>
                            Reconciliação Bancária
                        </h1>
                    </div>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={toggleDarkMode}
                        className='rounded-full bg-transparent'
                    >
                        {isDarkMode ? (
                            <Sun className='w-4 h-4' />
                        ) : (
                            <Moon className='w-4 h-4' />
                        )}
                    </Button>
                </div>
            </div>
        </header>
    );
};

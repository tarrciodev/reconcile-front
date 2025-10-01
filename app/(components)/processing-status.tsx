// components/ProcessingStatus.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

interface ProcessingStatusProps {
    progress: number;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
    progress,
}) => {
    return (
        <Card>
            <CardContent className='pt-6'>
                <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 border-2 border-orange border-t-transparent rounded-full animate-spin' />
                        <div>
                            <p className='font-medium text-foreground'>
                                Processando reconciliação...
                            </p>
                            <p className='text-sm text-muted-foreground'>
                                Isso pode levar alguns segundos
                            </p>
                        </div>
                    </div>
                    <Progress value={progress} className='w-full' />
                    <p className='text-sm text-muted-foreground text-center'>
                        {progress}% concluído
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

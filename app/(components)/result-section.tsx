// components/ResultSection.tsx
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ReconciliationResult } from "@/services/upload-service";
import { AlertCircle, CheckCircle, Download, FileText } from "lucide-react";
import React from "react";

// Tipos devem ser importados ou definidos aqui

interface ResultSectionProps {
    filesLength: number;
    result: ReconciliationResult | null;
    downloadReport: () => Promise<void>;
    isDowloading: boolean;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
    filesLength,
    result,
    downloadReport,
    isDowloading,
}) => {
    console.log(result);
    return (
        <Card className='border-green-200 bg-green-50/50'>
            <CardHeader>
                <CardTitle className='flex items-center gap-2 text-xl text-green-700'>
                    <CheckCircle className='w-5 h-5' />
                    Relatório Gerado com Sucesso
                </CardTitle>
                <CardDescription>
                    Total de Transações no Banco:{" "}
                    {result?.totalBanckTransactions}
                </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
                {/* Summary Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <div className='bg-blue-light rounded-lg p-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-blue'>
                                    Total da Empresa
                                </p>
                                <p className='text-2xl font-bold text-blue'>
                                    {result?.totalCompanyTransactions}
                                </p>
                            </div>
                            <FileText className='w-8 h-8 text-blue' />
                        </div>
                    </div>

                    <div className='bg-green-100 rounded-lg p-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-green-700'>
                                    Total de Transações Reconciliadas
                                </p>
                                <p className='text-2xl font-bold text-green-700'>
                                    {result?.reconciledTransactions.toLocaleString()}
                                </p>
                            </div>
                            <CheckCircle className='w-8 h-8 text-green-700' />
                        </div>
                    </div>

                    <div className='bg-orange-light rounded-lg p-4'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-sm font-medium text-orange'>
                                    Total de Transações Pendentes
                                </p>
                                <p className='text-2xl font-bold text-orange'>
                                    {result?.pendingTransactions.toLocaleString()}
                                </p>
                            </div>
                            <AlertCircle className='w-8 h-8 text-orange' />
                        </div>
                    </div>
                </div>

                {/* Total Amount
                <div className='bg-card border rounded-lg p-6'>
                    <div className='text-center'>
                        <p className='text-sm font-medium text-muted-foreground'>
                            Valor Total Processado
                        </p>
                        <p className='text-3xl font-bold text-foreground'>
                            R${" "}
                            {result.totalAmount.toLocaleString("pt-BR", {
                                minimumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                </div> */}

                {/* Download Button */}
                <Button
                    onClick={downloadReport}
                    className='w-full bg-blue hover:bg-blue/90 text-white font-medium py-3 text-base'
                    size='lg'
                >
                    <Download className='w-5 h-5 mr-2' />
                    Baixar Relatório Completo (.xlsx)
                </Button>
            </CardContent>
        </Card>
    );
};

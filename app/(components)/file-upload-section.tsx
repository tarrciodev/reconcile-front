// components/FileUploadSection.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormDataProps, FormProps } from "@/services/upload-service";
import { Upload } from "lucide-react";

// Tipos devem ser importados ou definidos aqui

interface FileUploadSectionProps {
    isSubmitting: boolean;
    form: FormProps;
    handleUploadFiles: (data: FormDataProps) => Promise<void>;
}

export function FileUploadSection({
    form,
    isSubmitting,
    handleUploadFiles,
}: FileUploadSectionProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUploadFiles)}>
                <Card className='border-2 border-dashed border-border hover:border-orange/50 transition-colors'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-2 text-xl'>
                            <Upload className='w-5 h-5 text-orange' />
                            Upload de Arquivos
                        </CardTitle>
                        <CardDescription>
                            Selecione ou arraste arquivos Excel (.xlsx, .xls) e
                            PDF para processar a reconciliação bancária
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-6'>
                        {/* File Upload Area */}
                        <div className='relative border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-orange/50 transition-colors cursor-pointer bg-muted/30'>
                            <Input
                                type='file'
                                multiple
                                name='files'
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (!files) return;
                                    const filesArray = Array.from(files);
                                    form.setValue("files", filesArray);
                                }}
                                accept='.xlsx,.xls,.pdf'
                                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                            />
                            <div className='space-y-4'>
                                <div className='w-16 h-16 mx-auto bg-orange-light rounded-full flex items-center justify-center'>
                                    <Upload className='w-8 h-8 text-orange' />
                                </div>
                                <div>
                                    <p className='text-lg font-medium text-foreground'>
                                        Arraste arquivos aqui
                                    </p>
                                    <p className='text-sm text-muted-foreground'>
                                        ou clique para selecionar
                                    </p>
                                </div>
                                <p className='text-xs text-muted-foreground'>
                                    Suporta arquivos Excel (.xlsx, .xls) e PDF
                                    até 10MB cada
                                </p>
                            </div>
                        </div>

                        {/* Process Button */}
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full bg-orange hover:bg-orange/90 text-white font-medium py-3 text-base'
                            size='lg'
                        >
                            {isSubmitting
                                ? "Processando..."
                                : "Enviar para Processamento"}
                        </Button>
                    </CardContent>
                </Card>
            </form>
        </Form>
    );
}

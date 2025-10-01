"use client";
import { BASE_URL } from "@/config/define-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const excelExtensions = [".xls", ".xlsx"];
const pdfExtensions = [".pdf"];

const schema = z.object({
    files: z
        .array(z.any())
        .min(1, "É obrigatório enviar arquivos.")
        .refine(
            (files) => {
                if (!files || files.length === 0) return false;

                // Verifica se são objetos File válidos
                const validFiles = files.filter(
                    (file) =>
                        file &&
                        typeof file === "object" &&
                        "name" in file &&
                        "size" in file &&
                        "type" in file
                );

                if (validFiles.length === 0) return false;

                const hasExcel = validFiles.some((file) =>
                    excelExtensions.some((ext) =>
                        file.name.toLowerCase().endsWith(ext)
                    )
                );
                const hasPdf = validFiles.some((file) =>
                    pdfExtensions.some((ext) =>
                        file.name.toLowerCase().endsWith(ext)
                    )
                );

                return hasExcel && hasPdf;
            },
            {
                message:
                    "Envie pelo menos 1 arquivo Excel (.xls ou .xlsx) e 1 arquivo PDF.",
            }
        ),
});

export type FormDataProps = z.infer<typeof schema>;
export type FormProps = ReturnType<typeof useForm<FormDataProps>>;

export interface ReconciliationResult {
    totalBanckTransactions: number;
    totalCompanyTransactions: number;
    reconciledTransactions: number;
    pendingTransactions: number;
    reportName: string;
}

interface UploadService {
    handleUploadFiles: (data: FormDataProps) => Promise<void>;
    handleDownloadReport: () => Promise<void>;
    form: FormProps;
    isSubmitting: boolean;
    isSubmitted: boolean;
    result: ReconciliationResult | null;
    isDownloading: boolean;
}

// Option 1: Convert to a custom hook (recommended)
export function useUploadService(): UploadService {
    const form = useForm<FormDataProps>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    const [result, setResult] = useState<ReconciliationResult | null>(null);
    const [reportName, setReportName] = useState<string | null>(null);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);

    async function handleUploadFiles(data: FormDataProps) {
        // VALIDAÇÃO EXTRA NO CLIENTE - garante que há arquivos
        if (!data.files || data.files.length === 0) {
            console.error("Nenhum arquivo selecionado");
            return;
        }

        // Filtra apenas arquivos válidos
        const validFiles = data.files.filter(
            (file) =>
                file &&
                typeof file === "object" &&
                "name" in file &&
                "size" in file &&
                "type" in file
        );

        if (validFiles.length === 0) {
            console.error("Nenhum arquivo válido encontrado");
            return;
        }

        const formData = new FormData();

        validFiles.forEach((file) => formData.append("files", file));

        try {
            console.log(
                "Enviando arquivos:",
                validFiles.map((f) => f.name)
            );

            const response = await fetch(
                `${BASE_URL}/api/transactions/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const getData = await response.json();
            console.log({ getData });

            if (getData?.reconciliation?.[0]) {
                setResult(getData.reconciliation[0]);
                setReportName(getData.reconciliation[0].reportName);
            }
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
    }

    async function handleDownloadReport() {
        if (!reportName) {
            console.error("No report name provided");
            return;
        }

        setIsDownloading(true);
        try {
            const response = await fetch(
                `${BASE_URL}/api/reports/download/${reportName}`,
                {
                    method: "GET",
                }
            );

            if (!response.ok) {
                throw new Error(`Download failed: ${response.statusText}`);
            }

            // Get the blob from response
            const blob = await response.blob();

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = reportName;
            document.body.appendChild(a);
            a.click();

            // Clean up
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            await fetch(`${BASE_URL}/transactions/clean`, {
                method: "DELETE",
            });

            console.log(`✅ Report downloaded successfully: ${reportName}`);
        } catch (error) {
            console.error("Download failed:", error);
            throw error;
        } finally {
            setIsDownloading(false);
        }
    }

    return {
        handleUploadFiles,
        handleDownloadReport,
        form,
        isSubmitting: form.formState.isSubmitting,
        isSubmitted: form.formState.isSubmitted,
        result,
        isDownloading,
    };
}

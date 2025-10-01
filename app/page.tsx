"use client";
import { useUploadService } from "@/services/upload-service";
import type React from "react";
import { useState } from "react";
import { FileUploadSection } from "./(components)/file-upload-section";
import { Header } from "./(components)/header";
import { ResultSection } from "./(components)/result-section";

interface UploadedFile {
    name: string;
    size: number;
    type: string;
}

interface ReconciliationResult {
    totalTransactions: number;
    reconciledTransactions: number;
    pendingTransactions: number;
    discrepancies: number;
    totalAmount: number;
}
export default function ReconciliationDashboard() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        const fileData = droppedFiles.map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
        }));
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle("dark");
    };

    const {
        form,
        handleUploadFiles,
        isSubmitting,
        isSubmitted,
        result,
        handleDownloadReport,
        isDownloading,
    } = useUploadService();

    return (
        <div className='min-h-screen bg-background'>
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            <main className='container mx-auto px-6 py-8 space-y-8'>
                <FileUploadSection
                    isSubmitting={isSubmitting}
                    form={form}
                    handleUploadFiles={handleUploadFiles}
                />
                {isSubmitted && !isSubmitting && (
                    <ResultSection
                        filesLength={0}
                        isDowloading={isDownloading}
                        result={result}
                        downloadReport={handleDownloadReport}
                    />
                )}
            </main>
        </div>
    );
}

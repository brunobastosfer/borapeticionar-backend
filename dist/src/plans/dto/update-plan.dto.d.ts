export declare class UpdatePlanDto {
    name?: string;
    price?: number;
    monthlyLimit?: number | null;
    isAvailable?: boolean;
    canExportPdf?: boolean;
    canExportWord?: boolean;
    practiceAreas?: string[];
    hasDashboard?: boolean;
    hasFullHistory?: boolean;
    hasExpandedLibrary?: boolean;
    isMultiUser?: boolean;
    hasTeamManagement?: boolean;
    hasPriority?: boolean;
    hasCustomTemplates?: boolean;
    hasRealTimePreview?: boolean;
    hasBasicEditor?: boolean;
    hasBasicExport?: boolean;
    features?: string[];
}

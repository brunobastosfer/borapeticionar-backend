import { PlanType } from '../../../generated/prisma/client.js';
export declare class CreatePlanDto {
    name: string;
    type: PlanType;
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

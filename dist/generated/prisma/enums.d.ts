export declare const Sex: {
    readonly MALE: "MALE";
    readonly FEMALE: "FEMALE";
    readonly OTHER: "OTHER";
};
export type Sex = (typeof Sex)[keyof typeof Sex];
export declare const PlanType: {
    readonly FREE: "FREE";
    readonly ESSENTIAL: "ESSENTIAL";
    readonly PROFESSIONAL: "PROFESSIONAL";
    readonly OFFICE: "OFFICE";
};
export type PlanType = (typeof PlanType)[keyof typeof PlanType];
export declare const PetitionStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type PetitionStatus = (typeof PetitionStatus)[keyof typeof PetitionStatus];
export declare const Role: {
    readonly USER: "USER";
    readonly COMPANY: "COMPANY";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];

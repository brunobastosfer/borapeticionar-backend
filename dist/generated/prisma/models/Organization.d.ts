import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrganizationModel = runtime.Types.Result.DefaultSelection<Prisma.$OrganizationPayload>;
export type AggregateOrganization = {
    _count: OrganizationCountAggregateOutputType | null;
    _min: OrganizationMinAggregateOutputType | null;
    _max: OrganizationMaxAggregateOutputType | null;
};
export type OrganizationMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    cnpj: string | null;
    ownerId: string | null;
    planId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrganizationMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    cnpj: string | null;
    ownerId: string | null;
    planId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OrganizationCountAggregateOutputType = {
    id: number;
    name: number;
    cnpj: number;
    ownerId: number;
    planId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OrganizationMinAggregateInputType = {
    id?: true;
    name?: true;
    cnpj?: true;
    ownerId?: true;
    planId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrganizationMaxAggregateInputType = {
    id?: true;
    name?: true;
    cnpj?: true;
    ownerId?: true;
    planId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OrganizationCountAggregateInputType = {
    id?: true;
    name?: true;
    cnpj?: true;
    ownerId?: true;
    planId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OrganizationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrganizationCountAggregateInputType;
    _min?: OrganizationMinAggregateInputType;
    _max?: OrganizationMaxAggregateInputType;
};
export type GetOrganizationAggregateType<T extends OrganizationAggregateArgs> = {
    [P in keyof T & keyof AggregateOrganization]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrganization[P]> : Prisma.GetScalarType<T[P], AggregateOrganization[P]>;
};
export type OrganizationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithAggregationInput | Prisma.OrganizationOrderByWithAggregationInput[];
    by: Prisma.OrganizationScalarFieldEnum[] | Prisma.OrganizationScalarFieldEnum;
    having?: Prisma.OrganizationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrganizationCountAggregateInputType | true;
    _min?: OrganizationMinAggregateInputType;
    _max?: OrganizationMaxAggregateInputType;
};
export type OrganizationGroupByOutputType = {
    id: string;
    name: string;
    cnpj: string | null;
    ownerId: string;
    planId: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: OrganizationCountAggregateOutputType | null;
    _min: OrganizationMinAggregateOutputType | null;
    _max: OrganizationMaxAggregateOutputType | null;
};
export type GetOrganizationGroupByPayload<T extends OrganizationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrganizationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrganizationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrganizationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrganizationGroupByOutputType[P]>;
}>>;
export type OrganizationWhereInput = {
    AND?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    OR?: Prisma.OrganizationWhereInput[];
    NOT?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    id?: Prisma.StringFilter<"Organization"> | string;
    name?: Prisma.StringFilter<"Organization"> | string;
    cnpj?: Prisma.StringNullableFilter<"Organization"> | string | null;
    ownerId?: Prisma.StringFilter<"Organization"> | string;
    planId?: Prisma.StringNullableFilter<"Organization"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    plan?: Prisma.XOR<Prisma.PlanNullableScalarRelationFilter, Prisma.PlanWhereInput> | null;
    members?: Prisma.OrganizationMemberListRelationFilter;
};
export type OrganizationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    planId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    owner?: Prisma.UserOrderByWithRelationInput;
    plan?: Prisma.PlanOrderByWithRelationInput;
    members?: Prisma.OrganizationMemberOrderByRelationAggregateInput;
};
export type OrganizationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    cnpj?: string;
    AND?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    OR?: Prisma.OrganizationWhereInput[];
    NOT?: Prisma.OrganizationWhereInput | Prisma.OrganizationWhereInput[];
    name?: Prisma.StringFilter<"Organization"> | string;
    ownerId?: Prisma.StringFilter<"Organization"> | string;
    planId?: Prisma.StringNullableFilter<"Organization"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    owner?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    plan?: Prisma.XOR<Prisma.PlanNullableScalarRelationFilter, Prisma.PlanWhereInput> | null;
    members?: Prisma.OrganizationMemberListRelationFilter;
}, "id" | "cnpj">;
export type OrganizationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrderInput | Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    planId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OrganizationCountOrderByAggregateInput;
    _max?: Prisma.OrganizationMaxOrderByAggregateInput;
    _min?: Prisma.OrganizationMinOrderByAggregateInput;
};
export type OrganizationScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrganizationScalarWhereWithAggregatesInput | Prisma.OrganizationScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrganizationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrganizationScalarWhereWithAggregatesInput | Prisma.OrganizationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Organization"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Organization"> | string;
    cnpj?: Prisma.StringNullableWithAggregatesFilter<"Organization"> | string | null;
    ownerId?: Prisma.StringWithAggregatesFilter<"Organization"> | string;
    planId?: Prisma.StringNullableWithAggregatesFilter<"Organization"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Organization"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Organization"> | Date | string;
};
export type OrganizationCreateInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedOrganizationsInput;
    plan?: Prisma.PlanCreateNestedOneWithoutOrganizationsInput;
    members?: Prisma.OrganizationMemberCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    ownerId: string;
    planId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput;
    plan?: Prisma.PlanUpdateOneWithoutOrganizationsNestedInput;
    members?: Prisma.OrganizationMemberUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationCreateManyInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    ownerId: string;
    planId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrganizationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationListRelationFilter = {
    every?: Prisma.OrganizationWhereInput;
    some?: Prisma.OrganizationWhereInput;
    none?: Prisma.OrganizationWhereInput;
};
export type OrganizationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrganizationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrganizationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrganizationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    cnpj?: Prisma.SortOrder;
    ownerId?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OrganizationScalarRelationFilter = {
    is?: Prisma.OrganizationWhereInput;
    isNot?: Prisma.OrganizationWhereInput;
};
export type OrganizationCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput> | Prisma.OrganizationCreateWithoutOwnerInput[] | Prisma.OrganizationUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutOwnerInput | Prisma.OrganizationCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.OrganizationCreateManyOwnerInputEnvelope;
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
};
export type OrganizationUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput> | Prisma.OrganizationCreateWithoutOwnerInput[] | Prisma.OrganizationUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutOwnerInput | Prisma.OrganizationCreateOrConnectWithoutOwnerInput[];
    createMany?: Prisma.OrganizationCreateManyOwnerInputEnvelope;
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
};
export type OrganizationUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput> | Prisma.OrganizationCreateWithoutOwnerInput[] | Prisma.OrganizationUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutOwnerInput | Prisma.OrganizationCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput | Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.OrganizationCreateManyOwnerInputEnvelope;
    set?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    disconnect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    delete?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    update?: Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput | Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput | Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
};
export type OrganizationUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput> | Prisma.OrganizationCreateWithoutOwnerInput[] | Prisma.OrganizationUncheckedCreateWithoutOwnerInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutOwnerInput | Prisma.OrganizationCreateOrConnectWithoutOwnerInput[];
    upsert?: Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput | Prisma.OrganizationUpsertWithWhereUniqueWithoutOwnerInput[];
    createMany?: Prisma.OrganizationCreateManyOwnerInputEnvelope;
    set?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    disconnect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    delete?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    update?: Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput | Prisma.OrganizationUpdateWithWhereUniqueWithoutOwnerInput[];
    updateMany?: Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput | Prisma.OrganizationUpdateManyWithWhereWithoutOwnerInput[];
    deleteMany?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
};
export type OrganizationCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput> | Prisma.OrganizationCreateWithoutPlanInput[] | Prisma.OrganizationUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutPlanInput | Prisma.OrganizationCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.OrganizationCreateManyPlanInputEnvelope;
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
};
export type OrganizationUncheckedCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput> | Prisma.OrganizationCreateWithoutPlanInput[] | Prisma.OrganizationUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutPlanInput | Prisma.OrganizationCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.OrganizationCreateManyPlanInputEnvelope;
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
};
export type OrganizationUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput> | Prisma.OrganizationCreateWithoutPlanInput[] | Prisma.OrganizationUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutPlanInput | Prisma.OrganizationCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.OrganizationUpsertWithWhereUniqueWithoutPlanInput | Prisma.OrganizationUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.OrganizationCreateManyPlanInputEnvelope;
    set?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    disconnect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    delete?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    update?: Prisma.OrganizationUpdateWithWhereUniqueWithoutPlanInput | Prisma.OrganizationUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.OrganizationUpdateManyWithWhereWithoutPlanInput | Prisma.OrganizationUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
};
export type OrganizationUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput> | Prisma.OrganizationCreateWithoutPlanInput[] | Prisma.OrganizationUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutPlanInput | Prisma.OrganizationCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.OrganizationUpsertWithWhereUniqueWithoutPlanInput | Prisma.OrganizationUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.OrganizationCreateManyPlanInputEnvelope;
    set?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    disconnect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    delete?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    connect?: Prisma.OrganizationWhereUniqueInput | Prisma.OrganizationWhereUniqueInput[];
    update?: Prisma.OrganizationUpdateWithWhereUniqueWithoutPlanInput | Prisma.OrganizationUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.OrganizationUpdateManyWithWhereWithoutPlanInput | Prisma.OrganizationUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
};
export type OrganizationCreateNestedOneWithoutMembersInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutMembersInput, Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutMembersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateOneRequiredWithoutMembersNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationCreateWithoutMembersInput, Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
    connectOrCreate?: Prisma.OrganizationCreateOrConnectWithoutMembersInput;
    upsert?: Prisma.OrganizationUpsertWithoutMembersInput;
    connect?: Prisma.OrganizationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput, Prisma.OrganizationUpdateWithoutMembersInput>, Prisma.OrganizationUncheckedUpdateWithoutMembersInput>;
};
export type OrganizationCreateWithoutOwnerInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plan?: Prisma.PlanCreateNestedOneWithoutOrganizationsInput;
    members?: Prisma.OrganizationMemberCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutOwnerInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    planId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutOwnerInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput>;
};
export type OrganizationCreateManyOwnerInputEnvelope = {
    data: Prisma.OrganizationCreateManyOwnerInput | Prisma.OrganizationCreateManyOwnerInput[];
    skipDuplicates?: boolean;
};
export type OrganizationUpsertWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutOwnerInput, Prisma.OrganizationUncheckedUpdateWithoutOwnerInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutOwnerInput, Prisma.OrganizationUncheckedCreateWithoutOwnerInput>;
};
export type OrganizationUpdateWithWhereUniqueWithoutOwnerInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutOwnerInput, Prisma.OrganizationUncheckedUpdateWithoutOwnerInput>;
};
export type OrganizationUpdateManyWithWhereWithoutOwnerInput = {
    where: Prisma.OrganizationScalarWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyWithoutOwnerInput>;
};
export type OrganizationScalarWhereInput = {
    AND?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
    OR?: Prisma.OrganizationScalarWhereInput[];
    NOT?: Prisma.OrganizationScalarWhereInput | Prisma.OrganizationScalarWhereInput[];
    id?: Prisma.StringFilter<"Organization"> | string;
    name?: Prisma.StringFilter<"Organization"> | string;
    cnpj?: Prisma.StringNullableFilter<"Organization"> | string | null;
    ownerId?: Prisma.StringFilter<"Organization"> | string;
    planId?: Prisma.StringNullableFilter<"Organization"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Organization"> | Date | string;
};
export type OrganizationCreateWithoutPlanInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedOrganizationsInput;
    members?: Prisma.OrganizationMemberCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationUncheckedCreateWithoutPlanInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    ownerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    members?: Prisma.OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput;
};
export type OrganizationCreateOrConnectWithoutPlanInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput>;
};
export type OrganizationCreateManyPlanInputEnvelope = {
    data: Prisma.OrganizationCreateManyPlanInput | Prisma.OrganizationCreateManyPlanInput[];
    skipDuplicates?: boolean;
};
export type OrganizationUpsertWithWhereUniqueWithoutPlanInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutPlanInput, Prisma.OrganizationUncheckedUpdateWithoutPlanInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutPlanInput, Prisma.OrganizationUncheckedCreateWithoutPlanInput>;
};
export type OrganizationUpdateWithWhereUniqueWithoutPlanInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutPlanInput, Prisma.OrganizationUncheckedUpdateWithoutPlanInput>;
};
export type OrganizationUpdateManyWithWhereWithoutPlanInput = {
    where: Prisma.OrganizationScalarWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyWithoutPlanInput>;
};
export type OrganizationCreateWithoutMembersInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    owner: Prisma.UserCreateNestedOneWithoutOwnedOrganizationsInput;
    plan?: Prisma.PlanCreateNestedOneWithoutOrganizationsInput;
};
export type OrganizationUncheckedCreateWithoutMembersInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    ownerId: string;
    planId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrganizationCreateOrConnectWithoutMembersInput = {
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutMembersInput, Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
};
export type OrganizationUpsertWithoutMembersInput = {
    update: Prisma.XOR<Prisma.OrganizationUpdateWithoutMembersInput, Prisma.OrganizationUncheckedUpdateWithoutMembersInput>;
    create: Prisma.XOR<Prisma.OrganizationCreateWithoutMembersInput, Prisma.OrganizationUncheckedCreateWithoutMembersInput>;
    where?: Prisma.OrganizationWhereInput;
};
export type OrganizationUpdateToOneWithWhereWithoutMembersInput = {
    where?: Prisma.OrganizationWhereInput;
    data: Prisma.XOR<Prisma.OrganizationUpdateWithoutMembersInput, Prisma.OrganizationUncheckedUpdateWithoutMembersInput>;
};
export type OrganizationUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput;
    plan?: Prisma.PlanUpdateOneWithoutOrganizationsNestedInput;
};
export type OrganizationUncheckedUpdateWithoutMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationCreateManyOwnerInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    planId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrganizationUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plan?: Prisma.PlanUpdateOneWithoutOrganizationsNestedInput;
    members?: Prisma.OrganizationMemberUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateManyWithoutOwnerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationCreateManyPlanInput = {
    id?: string;
    name: string;
    cnpj?: string | null;
    ownerId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OrganizationUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    owner?: Prisma.UserUpdateOneRequiredWithoutOwnedOrganizationsNestedInput;
    members?: Prisma.OrganizationMemberUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    members?: Prisma.OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput;
};
export type OrganizationUncheckedUpdateManyWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    cnpj?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ownerId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationCountOutputType = {
    members: number;
};
export type OrganizationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    members?: boolean | OrganizationCountOutputTypeCountMembersArgs;
};
export type OrganizationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationCountOutputTypeSelect<ExtArgs> | null;
};
export type OrganizationCountOutputTypeCountMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationMemberWhereInput;
};
export type OrganizationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    cnpj?: boolean;
    ownerId?: boolean;
    planId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
    members?: boolean | Prisma.Organization$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.OrganizationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    cnpj?: boolean;
    ownerId?: boolean;
    planId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    cnpj?: boolean;
    ownerId?: boolean;
    planId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
}, ExtArgs["result"]["organization"]>;
export type OrganizationSelectScalar = {
    id?: boolean;
    name?: boolean;
    cnpj?: boolean;
    ownerId?: boolean;
    planId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OrganizationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "cnpj" | "ownerId" | "planId" | "createdAt" | "updatedAt", ExtArgs["result"]["organization"]>;
export type OrganizationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
    members?: boolean | Prisma.Organization$membersArgs<ExtArgs>;
    _count?: boolean | Prisma.OrganizationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OrganizationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
};
export type OrganizationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    owner?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    plan?: boolean | Prisma.Organization$planArgs<ExtArgs>;
};
export type $OrganizationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Organization";
    objects: {
        owner: Prisma.$UserPayload<ExtArgs>;
        plan: Prisma.$PlanPayload<ExtArgs> | null;
        members: Prisma.$OrganizationMemberPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        cnpj: string | null;
        ownerId: string;
        planId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["organization"]>;
    composites: {};
};
export type OrganizationGetPayload<S extends boolean | null | undefined | OrganizationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrganizationPayload, S>;
export type OrganizationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrganizationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrganizationCountAggregateInputType | true;
};
export interface OrganizationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Organization'];
        meta: {
            name: 'Organization';
        };
    };
    findUnique<T extends OrganizationFindUniqueArgs>(args: Prisma.SelectSubset<T, OrganizationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrganizationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrganizationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrganizationFindFirstArgs>(args?: Prisma.SelectSubset<T, OrganizationFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrganizationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrganizationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrganizationFindManyArgs>(args?: Prisma.SelectSubset<T, OrganizationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrganizationCreateArgs>(args: Prisma.SelectSubset<T, OrganizationCreateArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrganizationCreateManyArgs>(args?: Prisma.SelectSubset<T, OrganizationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrganizationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrganizationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrganizationDeleteArgs>(args: Prisma.SelectSubset<T, OrganizationDeleteArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrganizationUpdateArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrganizationDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrganizationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrganizationUpdateManyArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrganizationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrganizationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrganizationUpsertArgs>(args: Prisma.SelectSubset<T, OrganizationUpsertArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrganizationCountArgs>(args?: Prisma.Subset<T, OrganizationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrganizationCountAggregateOutputType> : number>;
    aggregate<T extends OrganizationAggregateArgs>(args: Prisma.Subset<T, OrganizationAggregateArgs>): Prisma.PrismaPromise<GetOrganizationAggregateType<T>>;
    groupBy<T extends OrganizationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrganizationGroupByArgs['orderBy'];
    } : {
        orderBy?: OrganizationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrganizationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrganizationFieldRefs;
}
export interface Prisma__OrganizationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    owner<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    plan<T extends Prisma.Organization$planArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$planArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    members<T extends Prisma.Organization$membersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Organization$membersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrganizationFieldRefs {
    readonly id: Prisma.FieldRef<"Organization", 'String'>;
    readonly name: Prisma.FieldRef<"Organization", 'String'>;
    readonly cnpj: Prisma.FieldRef<"Organization", 'String'>;
    readonly ownerId: Prisma.FieldRef<"Organization", 'String'>;
    readonly planId: Prisma.FieldRef<"Organization", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Organization", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Organization", 'DateTime'>;
}
export type OrganizationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where?: Prisma.OrganizationWhereInput;
    orderBy?: Prisma.OrganizationOrderByWithRelationInput | Prisma.OrganizationOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationScalarFieldEnum | Prisma.OrganizationScalarFieldEnum[];
};
export type OrganizationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationCreateInput, Prisma.OrganizationUncheckedCreateInput>;
};
export type OrganizationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrganizationCreateManyInput | Prisma.OrganizationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrganizationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    data: Prisma.OrganizationCreateManyInput | Prisma.OrganizationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrganizationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrganizationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationUpdateInput, Prisma.OrganizationUncheckedUpdateInput>;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
};
export type OrganizationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationUpdateManyMutationInput, Prisma.OrganizationUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
    include?: Prisma.OrganizationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrganizationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationCreateInput, Prisma.OrganizationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrganizationUpdateInput, Prisma.OrganizationUncheckedUpdateInput>;
};
export type OrganizationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
    where: Prisma.OrganizationWhereUniqueInput;
};
export type OrganizationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationWhereInput;
    limit?: number;
};
export type Organization$planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where?: Prisma.PlanWhereInput;
};
export type Organization$membersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    where?: Prisma.OrganizationMemberWhereInput;
    orderBy?: Prisma.OrganizationMemberOrderByWithRelationInput | Prisma.OrganizationMemberOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OrganizationMemberScalarFieldEnum | Prisma.OrganizationMemberScalarFieldEnum[];
};
export type OrganizationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationOmit<ExtArgs> | null;
    include?: Prisma.OrganizationInclude<ExtArgs> | null;
};

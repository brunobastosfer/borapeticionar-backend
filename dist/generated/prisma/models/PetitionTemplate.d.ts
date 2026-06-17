import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PetitionTemplateModel = runtime.Types.Result.DefaultSelection<Prisma.$PetitionTemplatePayload>;
export type AggregatePetitionTemplate = {
    _count: PetitionTemplateCountAggregateOutputType | null;
    _min: PetitionTemplateMinAggregateOutputType | null;
    _max: PetitionTemplateMaxAggregateOutputType | null;
};
export type PetitionTemplateMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    content: string | null;
    category: string | null;
    planId: string | null;
    isPublic: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetitionTemplateMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    content: string | null;
    category: string | null;
    planId: string | null;
    isPublic: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PetitionTemplateCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    content: number;
    category: number;
    planId: number;
    isPublic: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PetitionTemplateMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    content?: true;
    category?: true;
    planId?: true;
    isPublic?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetitionTemplateMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    content?: true;
    category?: true;
    planId?: true;
    isPublic?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PetitionTemplateCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    content?: true;
    category?: true;
    planId?: true;
    isPublic?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PetitionTemplateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionTemplateWhereInput;
    orderBy?: Prisma.PetitionTemplateOrderByWithRelationInput | Prisma.PetitionTemplateOrderByWithRelationInput[];
    cursor?: Prisma.PetitionTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PetitionTemplateCountAggregateInputType;
    _min?: PetitionTemplateMinAggregateInputType;
    _max?: PetitionTemplateMaxAggregateInputType;
};
export type GetPetitionTemplateAggregateType<T extends PetitionTemplateAggregateArgs> = {
    [P in keyof T & keyof AggregatePetitionTemplate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePetitionTemplate[P]> : Prisma.GetScalarType<T[P], AggregatePetitionTemplate[P]>;
};
export type PetitionTemplateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionTemplateWhereInput;
    orderBy?: Prisma.PetitionTemplateOrderByWithAggregationInput | Prisma.PetitionTemplateOrderByWithAggregationInput[];
    by: Prisma.PetitionTemplateScalarFieldEnum[] | Prisma.PetitionTemplateScalarFieldEnum;
    having?: Prisma.PetitionTemplateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PetitionTemplateCountAggregateInputType | true;
    _min?: PetitionTemplateMinAggregateInputType;
    _max?: PetitionTemplateMaxAggregateInputType;
};
export type PetitionTemplateGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    content: string;
    category: string;
    planId: string | null;
    isPublic: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PetitionTemplateCountAggregateOutputType | null;
    _min: PetitionTemplateMinAggregateOutputType | null;
    _max: PetitionTemplateMaxAggregateOutputType | null;
};
export type GetPetitionTemplateGroupByPayload<T extends PetitionTemplateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PetitionTemplateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PetitionTemplateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PetitionTemplateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PetitionTemplateGroupByOutputType[P]>;
}>>;
export type PetitionTemplateWhereInput = {
    AND?: Prisma.PetitionTemplateWhereInput | Prisma.PetitionTemplateWhereInput[];
    OR?: Prisma.PetitionTemplateWhereInput[];
    NOT?: Prisma.PetitionTemplateWhereInput | Prisma.PetitionTemplateWhereInput[];
    id?: Prisma.StringFilter<"PetitionTemplate"> | string;
    name?: Prisma.StringFilter<"PetitionTemplate"> | string;
    description?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    content?: Prisma.StringFilter<"PetitionTemplate"> | string;
    category?: Prisma.StringFilter<"PetitionTemplate"> | string;
    planId?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    isPublic?: Prisma.BoolFilter<"PetitionTemplate"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
    plan?: Prisma.XOR<Prisma.PlanNullableScalarRelationFilter, Prisma.PlanWhereInput> | null;
};
export type PetitionTemplateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    planId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    plan?: Prisma.PlanOrderByWithRelationInput;
};
export type PetitionTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PetitionTemplateWhereInput | Prisma.PetitionTemplateWhereInput[];
    OR?: Prisma.PetitionTemplateWhereInput[];
    NOT?: Prisma.PetitionTemplateWhereInput | Prisma.PetitionTemplateWhereInput[];
    name?: Prisma.StringFilter<"PetitionTemplate"> | string;
    description?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    content?: Prisma.StringFilter<"PetitionTemplate"> | string;
    category?: Prisma.StringFilter<"PetitionTemplate"> | string;
    planId?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    isPublic?: Prisma.BoolFilter<"PetitionTemplate"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
    plan?: Prisma.XOR<Prisma.PlanNullableScalarRelationFilter, Prisma.PlanWhereInput> | null;
}, "id">;
export type PetitionTemplateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    planId?: Prisma.SortOrderInput | Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PetitionTemplateCountOrderByAggregateInput;
    _max?: Prisma.PetitionTemplateMaxOrderByAggregateInput;
    _min?: Prisma.PetitionTemplateMinOrderByAggregateInput;
};
export type PetitionTemplateScalarWhereWithAggregatesInput = {
    AND?: Prisma.PetitionTemplateScalarWhereWithAggregatesInput | Prisma.PetitionTemplateScalarWhereWithAggregatesInput[];
    OR?: Prisma.PetitionTemplateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PetitionTemplateScalarWhereWithAggregatesInput | Prisma.PetitionTemplateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PetitionTemplate"> | string;
    name?: Prisma.StringWithAggregatesFilter<"PetitionTemplate"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"PetitionTemplate"> | string | null;
    content?: Prisma.StringWithAggregatesFilter<"PetitionTemplate"> | string;
    category?: Prisma.StringWithAggregatesFilter<"PetitionTemplate"> | string;
    planId?: Prisma.StringNullableWithAggregatesFilter<"PetitionTemplate"> | string | null;
    isPublic?: Prisma.BoolWithAggregatesFilter<"PetitionTemplate"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PetitionTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PetitionTemplate"> | Date | string;
};
export type PetitionTemplateCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plan?: Prisma.PlanCreateNestedOneWithoutTemplatesInput;
};
export type PetitionTemplateUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    planId?: string | null;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetitionTemplateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plan?: Prisma.PlanUpdateOneWithoutTemplatesNestedInput;
};
export type PetitionTemplateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    planId?: string | null;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetitionTemplateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    planId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateListRelationFilter = {
    every?: Prisma.PetitionTemplateWhereInput;
    some?: Prisma.PetitionTemplateWhereInput;
    none?: Prisma.PetitionTemplateWhereInput;
};
export type PetitionTemplateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PetitionTemplateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetitionTemplateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetitionTemplateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    planId?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PetitionTemplateCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput> | Prisma.PetitionTemplateCreateWithoutPlanInput[] | Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput | Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PetitionTemplateCreateManyPlanInputEnvelope;
    connect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
};
export type PetitionTemplateUncheckedCreateNestedManyWithoutPlanInput = {
    create?: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput> | Prisma.PetitionTemplateCreateWithoutPlanInput[] | Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput | Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput[];
    createMany?: Prisma.PetitionTemplateCreateManyPlanInputEnvelope;
    connect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
};
export type PetitionTemplateUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput> | Prisma.PetitionTemplateCreateWithoutPlanInput[] | Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput | Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PetitionTemplateUpsertWithWhereUniqueWithoutPlanInput | Prisma.PetitionTemplateUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PetitionTemplateCreateManyPlanInputEnvelope;
    set?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    disconnect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    delete?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    connect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    update?: Prisma.PetitionTemplateUpdateWithWhereUniqueWithoutPlanInput | Prisma.PetitionTemplateUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PetitionTemplateUpdateManyWithWhereWithoutPlanInput | Prisma.PetitionTemplateUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PetitionTemplateScalarWhereInput | Prisma.PetitionTemplateScalarWhereInput[];
};
export type PetitionTemplateUncheckedUpdateManyWithoutPlanNestedInput = {
    create?: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput> | Prisma.PetitionTemplateCreateWithoutPlanInput[] | Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput[];
    connectOrCreate?: Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput | Prisma.PetitionTemplateCreateOrConnectWithoutPlanInput[];
    upsert?: Prisma.PetitionTemplateUpsertWithWhereUniqueWithoutPlanInput | Prisma.PetitionTemplateUpsertWithWhereUniqueWithoutPlanInput[];
    createMany?: Prisma.PetitionTemplateCreateManyPlanInputEnvelope;
    set?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    disconnect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    delete?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    connect?: Prisma.PetitionTemplateWhereUniqueInput | Prisma.PetitionTemplateWhereUniqueInput[];
    update?: Prisma.PetitionTemplateUpdateWithWhereUniqueWithoutPlanInput | Prisma.PetitionTemplateUpdateWithWhereUniqueWithoutPlanInput[];
    updateMany?: Prisma.PetitionTemplateUpdateManyWithWhereWithoutPlanInput | Prisma.PetitionTemplateUpdateManyWithWhereWithoutPlanInput[];
    deleteMany?: Prisma.PetitionTemplateScalarWhereInput | Prisma.PetitionTemplateScalarWhereInput[];
};
export type PetitionTemplateCreateWithoutPlanInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetitionTemplateUncheckedCreateWithoutPlanInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetitionTemplateCreateOrConnectWithoutPlanInput = {
    where: Prisma.PetitionTemplateWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput>;
};
export type PetitionTemplateCreateManyPlanInputEnvelope = {
    data: Prisma.PetitionTemplateCreateManyPlanInput | Prisma.PetitionTemplateCreateManyPlanInput[];
    skipDuplicates?: boolean;
};
export type PetitionTemplateUpsertWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PetitionTemplateWhereUniqueInput;
    update: Prisma.XOR<Prisma.PetitionTemplateUpdateWithoutPlanInput, Prisma.PetitionTemplateUncheckedUpdateWithoutPlanInput>;
    create: Prisma.XOR<Prisma.PetitionTemplateCreateWithoutPlanInput, Prisma.PetitionTemplateUncheckedCreateWithoutPlanInput>;
};
export type PetitionTemplateUpdateWithWhereUniqueWithoutPlanInput = {
    where: Prisma.PetitionTemplateWhereUniqueInput;
    data: Prisma.XOR<Prisma.PetitionTemplateUpdateWithoutPlanInput, Prisma.PetitionTemplateUncheckedUpdateWithoutPlanInput>;
};
export type PetitionTemplateUpdateManyWithWhereWithoutPlanInput = {
    where: Prisma.PetitionTemplateScalarWhereInput;
    data: Prisma.XOR<Prisma.PetitionTemplateUpdateManyMutationInput, Prisma.PetitionTemplateUncheckedUpdateManyWithoutPlanInput>;
};
export type PetitionTemplateScalarWhereInput = {
    AND?: Prisma.PetitionTemplateScalarWhereInput | Prisma.PetitionTemplateScalarWhereInput[];
    OR?: Prisma.PetitionTemplateScalarWhereInput[];
    NOT?: Prisma.PetitionTemplateScalarWhereInput | Prisma.PetitionTemplateScalarWhereInput[];
    id?: Prisma.StringFilter<"PetitionTemplate"> | string;
    name?: Prisma.StringFilter<"PetitionTemplate"> | string;
    description?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    content?: Prisma.StringFilter<"PetitionTemplate"> | string;
    category?: Prisma.StringFilter<"PetitionTemplate"> | string;
    planId?: Prisma.StringNullableFilter<"PetitionTemplate"> | string | null;
    isPublic?: Prisma.BoolFilter<"PetitionTemplate"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PetitionTemplate"> | Date | string;
};
export type PetitionTemplateCreateManyPlanInput = {
    id?: string;
    name: string;
    description?: string | null;
    content: string;
    category: string;
    isPublic?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PetitionTemplateUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateUncheckedUpdateWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateUncheckedUpdateManyWithoutPlanInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.StringFieldUpdateOperationsInput | string;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PetitionTemplateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    content?: boolean;
    category?: boolean;
    planId?: boolean;
    isPublic?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
}, ExtArgs["result"]["petitionTemplate"]>;
export type PetitionTemplateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    content?: boolean;
    category?: boolean;
    planId?: boolean;
    isPublic?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
}, ExtArgs["result"]["petitionTemplate"]>;
export type PetitionTemplateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    content?: boolean;
    category?: boolean;
    planId?: boolean;
    isPublic?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
}, ExtArgs["result"]["petitionTemplate"]>;
export type PetitionTemplateSelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    content?: boolean;
    category?: boolean;
    planId?: boolean;
    isPublic?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PetitionTemplateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "content" | "category" | "planId" | "isPublic" | "createdAt" | "updatedAt", ExtArgs["result"]["petitionTemplate"]>;
export type PetitionTemplateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
};
export type PetitionTemplateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
};
export type PetitionTemplateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plan?: boolean | Prisma.PetitionTemplate$planArgs<ExtArgs>;
};
export type $PetitionTemplatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PetitionTemplate";
    objects: {
        plan: Prisma.$PlanPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        content: string;
        category: string;
        planId: string | null;
        isPublic: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["petitionTemplate"]>;
    composites: {};
};
export type PetitionTemplateGetPayload<S extends boolean | null | undefined | PetitionTemplateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload, S>;
export type PetitionTemplateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PetitionTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PetitionTemplateCountAggregateInputType | true;
};
export interface PetitionTemplateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PetitionTemplate'];
        meta: {
            name: 'PetitionTemplate';
        };
    };
    findUnique<T extends PetitionTemplateFindUniqueArgs>(args: Prisma.SelectSubset<T, PetitionTemplateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PetitionTemplateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PetitionTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PetitionTemplateFindFirstArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateFindFirstArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PetitionTemplateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PetitionTemplateFindManyArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PetitionTemplateCreateArgs>(args: Prisma.SelectSubset<T, PetitionTemplateCreateArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PetitionTemplateCreateManyArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PetitionTemplateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PetitionTemplateDeleteArgs>(args: Prisma.SelectSubset<T, PetitionTemplateDeleteArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PetitionTemplateUpdateArgs>(args: Prisma.SelectSubset<T, PetitionTemplateUpdateArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PetitionTemplateDeleteManyArgs>(args?: Prisma.SelectSubset<T, PetitionTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PetitionTemplateUpdateManyArgs>(args: Prisma.SelectSubset<T, PetitionTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PetitionTemplateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PetitionTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PetitionTemplateUpsertArgs>(args: Prisma.SelectSubset<T, PetitionTemplateUpsertArgs<ExtArgs>>): Prisma.Prisma__PetitionTemplateClient<runtime.Types.Result.GetResult<Prisma.$PetitionTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PetitionTemplateCountArgs>(args?: Prisma.Subset<T, PetitionTemplateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PetitionTemplateCountAggregateOutputType> : number>;
    aggregate<T extends PetitionTemplateAggregateArgs>(args: Prisma.Subset<T, PetitionTemplateAggregateArgs>): Prisma.PrismaPromise<GetPetitionTemplateAggregateType<T>>;
    groupBy<T extends PetitionTemplateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PetitionTemplateGroupByArgs['orderBy'];
    } : {
        orderBy?: PetitionTemplateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PetitionTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetitionTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PetitionTemplateFieldRefs;
}
export interface Prisma__PetitionTemplateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plan<T extends Prisma.PetitionTemplate$planArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PetitionTemplate$planArgs<ExtArgs>>): Prisma.Prisma__PlanClient<runtime.Types.Result.GetResult<Prisma.$PlanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PetitionTemplateFieldRefs {
    readonly id: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly name: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly description: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly content: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly category: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly planId: Prisma.FieldRef<"PetitionTemplate", 'String'>;
    readonly isPublic: Prisma.FieldRef<"PetitionTemplate", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PetitionTemplate", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PetitionTemplate", 'DateTime'>;
}
export type PetitionTemplateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where: Prisma.PetitionTemplateWhereUniqueInput;
};
export type PetitionTemplateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where: Prisma.PetitionTemplateWhereUniqueInput;
};
export type PetitionTemplateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where?: Prisma.PetitionTemplateWhereInput;
    orderBy?: Prisma.PetitionTemplateOrderByWithRelationInput | Prisma.PetitionTemplateOrderByWithRelationInput[];
    cursor?: Prisma.PetitionTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionTemplateScalarFieldEnum | Prisma.PetitionTemplateScalarFieldEnum[];
};
export type PetitionTemplateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where?: Prisma.PetitionTemplateWhereInput;
    orderBy?: Prisma.PetitionTemplateOrderByWithRelationInput | Prisma.PetitionTemplateOrderByWithRelationInput[];
    cursor?: Prisma.PetitionTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionTemplateScalarFieldEnum | Prisma.PetitionTemplateScalarFieldEnum[];
};
export type PetitionTemplateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where?: Prisma.PetitionTemplateWhereInput;
    orderBy?: Prisma.PetitionTemplateOrderByWithRelationInput | Prisma.PetitionTemplateOrderByWithRelationInput[];
    cursor?: Prisma.PetitionTemplateWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionTemplateScalarFieldEnum | Prisma.PetitionTemplateScalarFieldEnum[];
};
export type PetitionTemplateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionTemplateCreateInput, Prisma.PetitionTemplateUncheckedCreateInput>;
};
export type PetitionTemplateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PetitionTemplateCreateManyInput | Prisma.PetitionTemplateCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PetitionTemplateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    data: Prisma.PetitionTemplateCreateManyInput | Prisma.PetitionTemplateCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PetitionTemplateIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PetitionTemplateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionTemplateUpdateInput, Prisma.PetitionTemplateUncheckedUpdateInput>;
    where: Prisma.PetitionTemplateWhereUniqueInput;
};
export type PetitionTemplateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PetitionTemplateUpdateManyMutationInput, Prisma.PetitionTemplateUncheckedUpdateManyInput>;
    where?: Prisma.PetitionTemplateWhereInput;
    limit?: number;
};
export type PetitionTemplateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionTemplateUpdateManyMutationInput, Prisma.PetitionTemplateUncheckedUpdateManyInput>;
    where?: Prisma.PetitionTemplateWhereInput;
    limit?: number;
    include?: Prisma.PetitionTemplateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PetitionTemplateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where: Prisma.PetitionTemplateWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetitionTemplateCreateInput, Prisma.PetitionTemplateUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PetitionTemplateUpdateInput, Prisma.PetitionTemplateUncheckedUpdateInput>;
};
export type PetitionTemplateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
    where: Prisma.PetitionTemplateWhereUniqueInput;
};
export type PetitionTemplateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionTemplateWhereInput;
    limit?: number;
};
export type PetitionTemplate$planArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PlanSelect<ExtArgs> | null;
    omit?: Prisma.PlanOmit<ExtArgs> | null;
    include?: Prisma.PlanInclude<ExtArgs> | null;
    where?: Prisma.PlanWhereInput;
};
export type PetitionTemplateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionTemplateSelect<ExtArgs> | null;
    omit?: Prisma.PetitionTemplateOmit<ExtArgs> | null;
    include?: Prisma.PetitionTemplateInclude<ExtArgs> | null;
};

import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OrganizationMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$OrganizationMemberPayload>;
export type AggregateOrganizationMember = {
    _count: OrganizationMemberCountAggregateOutputType | null;
    _min: OrganizationMemberMinAggregateOutputType | null;
    _max: OrganizationMemberMaxAggregateOutputType | null;
};
export type OrganizationMemberMinAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    userId: string | null;
    role: string | null;
    joinedAt: Date | null;
};
export type OrganizationMemberMaxAggregateOutputType = {
    id: string | null;
    organizationId: string | null;
    userId: string | null;
    role: string | null;
    joinedAt: Date | null;
};
export type OrganizationMemberCountAggregateOutputType = {
    id: number;
    organizationId: number;
    userId: number;
    role: number;
    joinedAt: number;
    _all: number;
};
export type OrganizationMemberMinAggregateInputType = {
    id?: true;
    organizationId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
};
export type OrganizationMemberMaxAggregateInputType = {
    id?: true;
    organizationId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
};
export type OrganizationMemberCountAggregateInputType = {
    id?: true;
    organizationId?: true;
    userId?: true;
    role?: true;
    joinedAt?: true;
    _all?: true;
};
export type OrganizationMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationMemberWhereInput;
    orderBy?: Prisma.OrganizationMemberOrderByWithRelationInput | Prisma.OrganizationMemberOrderByWithRelationInput[];
    cursor?: Prisma.OrganizationMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OrganizationMemberCountAggregateInputType;
    _min?: OrganizationMemberMinAggregateInputType;
    _max?: OrganizationMemberMaxAggregateInputType;
};
export type GetOrganizationMemberAggregateType<T extends OrganizationMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateOrganizationMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOrganizationMember[P]> : Prisma.GetScalarType<T[P], AggregateOrganizationMember[P]>;
};
export type OrganizationMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationMemberWhereInput;
    orderBy?: Prisma.OrganizationMemberOrderByWithAggregationInput | Prisma.OrganizationMemberOrderByWithAggregationInput[];
    by: Prisma.OrganizationMemberScalarFieldEnum[] | Prisma.OrganizationMemberScalarFieldEnum;
    having?: Prisma.OrganizationMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OrganizationMemberCountAggregateInputType | true;
    _min?: OrganizationMemberMinAggregateInputType;
    _max?: OrganizationMemberMaxAggregateInputType;
};
export type OrganizationMemberGroupByOutputType = {
    id: string;
    organizationId: string;
    userId: string;
    role: string;
    joinedAt: Date;
    _count: OrganizationMemberCountAggregateOutputType | null;
    _min: OrganizationMemberMinAggregateOutputType | null;
    _max: OrganizationMemberMaxAggregateOutputType | null;
};
export type GetOrganizationMemberGroupByPayload<T extends OrganizationMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OrganizationMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OrganizationMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OrganizationMemberGroupByOutputType[P]>;
}>>;
export type OrganizationMemberWhereInput = {
    AND?: Prisma.OrganizationMemberWhereInput | Prisma.OrganizationMemberWhereInput[];
    OR?: Prisma.OrganizationMemberWhereInput[];
    NOT?: Prisma.OrganizationMemberWhereInput | Prisma.OrganizationMemberWhereInput[];
    id?: Prisma.StringFilter<"OrganizationMember"> | string;
    organizationId?: Prisma.StringFilter<"OrganizationMember"> | string;
    userId?: Prisma.StringFilter<"OrganizationMember"> | string;
    role?: Prisma.StringFilter<"OrganizationMember"> | string;
    joinedAt?: Prisma.DateTimeFilter<"OrganizationMember"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type OrganizationMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    organization?: Prisma.OrganizationOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type OrganizationMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    organizationId_userId?: Prisma.OrganizationMemberOrganizationIdUserIdCompoundUniqueInput;
    AND?: Prisma.OrganizationMemberWhereInput | Prisma.OrganizationMemberWhereInput[];
    OR?: Prisma.OrganizationMemberWhereInput[];
    NOT?: Prisma.OrganizationMemberWhereInput | Prisma.OrganizationMemberWhereInput[];
    organizationId?: Prisma.StringFilter<"OrganizationMember"> | string;
    userId?: Prisma.StringFilter<"OrganizationMember"> | string;
    role?: Prisma.StringFilter<"OrganizationMember"> | string;
    joinedAt?: Prisma.DateTimeFilter<"OrganizationMember"> | Date | string;
    organization?: Prisma.XOR<Prisma.OrganizationScalarRelationFilter, Prisma.OrganizationWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "organizationId_userId">;
export type OrganizationMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
    _count?: Prisma.OrganizationMemberCountOrderByAggregateInput;
    _max?: Prisma.OrganizationMemberMaxOrderByAggregateInput;
    _min?: Prisma.OrganizationMemberMinOrderByAggregateInput;
};
export type OrganizationMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.OrganizationMemberScalarWhereWithAggregatesInput | Prisma.OrganizationMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.OrganizationMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OrganizationMemberScalarWhereWithAggregatesInput | Prisma.OrganizationMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"OrganizationMember"> | string;
    organizationId?: Prisma.StringWithAggregatesFilter<"OrganizationMember"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"OrganizationMember"> | string;
    role?: Prisma.StringWithAggregatesFilter<"OrganizationMember"> | string;
    joinedAt?: Prisma.DateTimeWithAggregatesFilter<"OrganizationMember"> | Date | string;
};
export type OrganizationMemberCreateInput = {
    id?: string;
    role?: string;
    joinedAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutMembersInput;
    user: Prisma.UserCreateNestedOneWithoutOrganizationMembershipsInput;
};
export type OrganizationMemberUncheckedCreateInput = {
    id?: string;
    organizationId: string;
    userId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutOrganizationMembershipsNestedInput;
};
export type OrganizationMemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberCreateManyInput = {
    id?: string;
    organizationId: string;
    userId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberListRelationFilter = {
    every?: Prisma.OrganizationMemberWhereInput;
    some?: Prisma.OrganizationMemberWhereInput;
    none?: Prisma.OrganizationMemberWhereInput;
};
export type OrganizationMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OrganizationMemberOrganizationIdUserIdCompoundUniqueInput = {
    organizationId: string;
    userId: string;
};
export type OrganizationMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type OrganizationMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type OrganizationMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    organizationId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    joinedAt?: Prisma.SortOrder;
};
export type OrganizationMemberCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput> | Prisma.OrganizationMemberCreateWithoutUserInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutUserInput | Prisma.OrganizationMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OrganizationMemberCreateManyUserInputEnvelope;
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
};
export type OrganizationMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput> | Prisma.OrganizationMemberCreateWithoutUserInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutUserInput | Prisma.OrganizationMemberCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.OrganizationMemberCreateManyUserInputEnvelope;
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
};
export type OrganizationMemberUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput> | Prisma.OrganizationMemberCreateWithoutUserInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutUserInput | Prisma.OrganizationMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OrganizationMemberCreateManyUserInputEnvelope;
    set?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    disconnect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    delete?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    update?: Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OrganizationMemberUpdateManyWithWhereWithoutUserInput | Prisma.OrganizationMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
};
export type OrganizationMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput> | Prisma.OrganizationMemberCreateWithoutUserInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutUserInput | Prisma.OrganizationMemberCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutUserInput | Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.OrganizationMemberCreateManyUserInputEnvelope;
    set?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    disconnect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    delete?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    update?: Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutUserInput | Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.OrganizationMemberUpdateManyWithWhereWithoutUserInput | Prisma.OrganizationMemberUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
};
export type OrganizationMemberCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput> | Prisma.OrganizationMemberCreateWithoutOrganizationInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput | Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.OrganizationMemberCreateManyOrganizationInputEnvelope;
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
};
export type OrganizationMemberUncheckedCreateNestedManyWithoutOrganizationInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput> | Prisma.OrganizationMemberCreateWithoutOrganizationInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput | Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput[];
    createMany?: Prisma.OrganizationMemberCreateManyOrganizationInputEnvelope;
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
};
export type OrganizationMemberUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput> | Prisma.OrganizationMemberCreateWithoutOrganizationInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput | Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.OrganizationMemberCreateManyOrganizationInputEnvelope;
    set?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    disconnect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    delete?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    update?: Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput | Prisma.OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
};
export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationNestedInput = {
    create?: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput> | Prisma.OrganizationMemberCreateWithoutOrganizationInput[] | Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput[];
    connectOrCreate?: Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput | Prisma.OrganizationMemberCreateOrConnectWithoutOrganizationInput[];
    upsert?: Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput | Prisma.OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput[];
    createMany?: Prisma.OrganizationMemberCreateManyOrganizationInputEnvelope;
    set?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    disconnect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    delete?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    connect?: Prisma.OrganizationMemberWhereUniqueInput | Prisma.OrganizationMemberWhereUniqueInput[];
    update?: Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput | Prisma.OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput[];
    updateMany?: Prisma.OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput | Prisma.OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput[];
    deleteMany?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
};
export type OrganizationMemberCreateWithoutUserInput = {
    id?: string;
    role?: string;
    joinedAt?: Date | string;
    organization: Prisma.OrganizationCreateNestedOneWithoutMembersInput;
};
export type OrganizationMemberUncheckedCreateWithoutUserInput = {
    id?: string;
    organizationId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberCreateOrConnectWithoutUserInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput>;
};
export type OrganizationMemberCreateManyUserInputEnvelope = {
    data: Prisma.OrganizationMemberCreateManyUserInput | Prisma.OrganizationMemberCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type OrganizationMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrganizationMemberUpdateWithoutUserInput, Prisma.OrganizationMemberUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutUserInput, Prisma.OrganizationMemberUncheckedCreateWithoutUserInput>;
};
export type OrganizationMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateWithoutUserInput, Prisma.OrganizationMemberUncheckedUpdateWithoutUserInput>;
};
export type OrganizationMemberUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.OrganizationMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateManyMutationInput, Prisma.OrganizationMemberUncheckedUpdateManyWithoutUserInput>;
};
export type OrganizationMemberScalarWhereInput = {
    AND?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
    OR?: Prisma.OrganizationMemberScalarWhereInput[];
    NOT?: Prisma.OrganizationMemberScalarWhereInput | Prisma.OrganizationMemberScalarWhereInput[];
    id?: Prisma.StringFilter<"OrganizationMember"> | string;
    organizationId?: Prisma.StringFilter<"OrganizationMember"> | string;
    userId?: Prisma.StringFilter<"OrganizationMember"> | string;
    role?: Prisma.StringFilter<"OrganizationMember"> | string;
    joinedAt?: Prisma.DateTimeFilter<"OrganizationMember"> | Date | string;
};
export type OrganizationMemberCreateWithoutOrganizationInput = {
    id?: string;
    role?: string;
    joinedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutOrganizationMembershipsInput;
};
export type OrganizationMemberUncheckedCreateWithoutOrganizationInput = {
    id?: string;
    userId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberCreateOrConnectWithoutOrganizationInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput>;
};
export type OrganizationMemberCreateManyOrganizationInputEnvelope = {
    data: Prisma.OrganizationMemberCreateManyOrganizationInput | Prisma.OrganizationMemberCreateManyOrganizationInput[];
    skipDuplicates?: boolean;
};
export type OrganizationMemberUpsertWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.OrganizationMemberUpdateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedUpdateWithoutOrganizationInput>;
    create: Prisma.XOR<Prisma.OrganizationMemberCreateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedCreateWithoutOrganizationInput>;
};
export type OrganizationMemberUpdateWithWhereUniqueWithoutOrganizationInput = {
    where: Prisma.OrganizationMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateWithoutOrganizationInput, Prisma.OrganizationMemberUncheckedUpdateWithoutOrganizationInput>;
};
export type OrganizationMemberUpdateManyWithWhereWithoutOrganizationInput = {
    where: Prisma.OrganizationMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateManyMutationInput, Prisma.OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput>;
};
export type OrganizationMemberCreateManyUserInput = {
    id?: string;
    organizationId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    organization?: Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput;
};
export type OrganizationMemberUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    organizationId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberCreateManyOrganizationInput = {
    id?: string;
    userId: string;
    role?: string;
    joinedAt?: Date | string;
};
export type OrganizationMemberUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutOrganizationMembershipsNestedInput;
};
export type OrganizationMemberUncheckedUpdateWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberUncheckedUpdateManyWithoutOrganizationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.StringFieldUpdateOperationsInput | string;
    joinedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OrganizationMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["organizationMember"]>;
export type OrganizationMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["organizationMember"]>;
export type OrganizationMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    organizationId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["organizationMember"]>;
export type OrganizationMemberSelectScalar = {
    id?: boolean;
    organizationId?: boolean;
    userId?: boolean;
    role?: boolean;
    joinedAt?: boolean;
};
export type OrganizationMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "organizationId" | "userId" | "role" | "joinedAt", ExtArgs["result"]["organizationMember"]>;
export type OrganizationMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OrganizationMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type OrganizationMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    organization?: boolean | Prisma.OrganizationDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $OrganizationMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "OrganizationMember";
    objects: {
        organization: Prisma.$OrganizationPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        organizationId: string;
        userId: string;
        role: string;
        joinedAt: Date;
    }, ExtArgs["result"]["organizationMember"]>;
    composites: {};
};
export type OrganizationMemberGetPayload<S extends boolean | null | undefined | OrganizationMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload, S>;
export type OrganizationMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OrganizationMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OrganizationMemberCountAggregateInputType | true;
};
export interface OrganizationMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['OrganizationMember'];
        meta: {
            name: 'OrganizationMember';
        };
    };
    findUnique<T extends OrganizationMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, OrganizationMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OrganizationMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OrganizationMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OrganizationMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OrganizationMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OrganizationMemberFindManyArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OrganizationMemberCreateArgs>(args: Prisma.SelectSubset<T, OrganizationMemberCreateArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OrganizationMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OrganizationMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OrganizationMemberDeleteArgs>(args: Prisma.SelectSubset<T, OrganizationMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OrganizationMemberUpdateArgs>(args: Prisma.SelectSubset<T, OrganizationMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OrganizationMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, OrganizationMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OrganizationMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, OrganizationMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OrganizationMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OrganizationMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OrganizationMemberUpsertArgs>(args: Prisma.SelectSubset<T, OrganizationMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__OrganizationMemberClient<runtime.Types.Result.GetResult<Prisma.$OrganizationMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OrganizationMemberCountArgs>(args?: Prisma.Subset<T, OrganizationMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OrganizationMemberCountAggregateOutputType> : number>;
    aggregate<T extends OrganizationMemberAggregateArgs>(args: Prisma.Subset<T, OrganizationMemberAggregateArgs>): Prisma.PrismaPromise<GetOrganizationMemberAggregateType<T>>;
    groupBy<T extends OrganizationMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OrganizationMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: OrganizationMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OrganizationMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrganizationMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OrganizationMemberFieldRefs;
}
export interface Prisma__OrganizationMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    organization<T extends Prisma.OrganizationDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OrganizationDefaultArgs<ExtArgs>>): Prisma.Prisma__OrganizationClient<runtime.Types.Result.GetResult<Prisma.$OrganizationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OrganizationMemberFieldRefs {
    readonly id: Prisma.FieldRef<"OrganizationMember", 'String'>;
    readonly organizationId: Prisma.FieldRef<"OrganizationMember", 'String'>;
    readonly userId: Prisma.FieldRef<"OrganizationMember", 'String'>;
    readonly role: Prisma.FieldRef<"OrganizationMember", 'String'>;
    readonly joinedAt: Prisma.FieldRef<"OrganizationMember", 'DateTime'>;
}
export type OrganizationMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    where: Prisma.OrganizationMemberWhereUniqueInput;
};
export type OrganizationMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    where: Prisma.OrganizationMemberWhereUniqueInput;
};
export type OrganizationMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OrganizationMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OrganizationMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OrganizationMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationMemberCreateInput, Prisma.OrganizationMemberUncheckedCreateInput>;
};
export type OrganizationMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OrganizationMemberCreateManyInput | Prisma.OrganizationMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OrganizationMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    data: Prisma.OrganizationMemberCreateManyInput | Prisma.OrganizationMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OrganizationMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OrganizationMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateInput, Prisma.OrganizationMemberUncheckedUpdateInput>;
    where: Prisma.OrganizationMemberWhereUniqueInput;
};
export type OrganizationMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateManyMutationInput, Prisma.OrganizationMemberUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationMemberWhereInput;
    limit?: number;
};
export type OrganizationMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OrganizationMemberUpdateManyMutationInput, Prisma.OrganizationMemberUncheckedUpdateManyInput>;
    where?: Prisma.OrganizationMemberWhereInput;
    limit?: number;
    include?: Prisma.OrganizationMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OrganizationMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    where: Prisma.OrganizationMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.OrganizationMemberCreateInput, Prisma.OrganizationMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OrganizationMemberUpdateInput, Prisma.OrganizationMemberUncheckedUpdateInput>;
};
export type OrganizationMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
    where: Prisma.OrganizationMemberWhereUniqueInput;
};
export type OrganizationMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OrganizationMemberWhereInput;
    limit?: number;
};
export type OrganizationMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OrganizationMemberSelect<ExtArgs> | null;
    omit?: Prisma.OrganizationMemberOmit<ExtArgs> | null;
    include?: Prisma.OrganizationMemberInclude<ExtArgs> | null;
};

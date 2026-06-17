import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PetitionUsageModel = runtime.Types.Result.DefaultSelection<Prisma.$PetitionUsagePayload>;
export type AggregatePetitionUsage = {
    _count: PetitionUsageCountAggregateOutputType | null;
    _avg: PetitionUsageAvgAggregateOutputType | null;
    _sum: PetitionUsageSumAggregateOutputType | null;
    _min: PetitionUsageMinAggregateOutputType | null;
    _max: PetitionUsageMaxAggregateOutputType | null;
};
export type PetitionUsageAvgAggregateOutputType = {
    year: number | null;
    month: number | null;
    count: number | null;
};
export type PetitionUsageSumAggregateOutputType = {
    year: number | null;
    month: number | null;
    count: number | null;
};
export type PetitionUsageMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    year: number | null;
    month: number | null;
    count: number | null;
};
export type PetitionUsageMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    year: number | null;
    month: number | null;
    count: number | null;
};
export type PetitionUsageCountAggregateOutputType = {
    id: number;
    userId: number;
    year: number;
    month: number;
    count: number;
    _all: number;
};
export type PetitionUsageAvgAggregateInputType = {
    year?: true;
    month?: true;
    count?: true;
};
export type PetitionUsageSumAggregateInputType = {
    year?: true;
    month?: true;
    count?: true;
};
export type PetitionUsageMinAggregateInputType = {
    id?: true;
    userId?: true;
    year?: true;
    month?: true;
    count?: true;
};
export type PetitionUsageMaxAggregateInputType = {
    id?: true;
    userId?: true;
    year?: true;
    month?: true;
    count?: true;
};
export type PetitionUsageCountAggregateInputType = {
    id?: true;
    userId?: true;
    year?: true;
    month?: true;
    count?: true;
    _all?: true;
};
export type PetitionUsageAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionUsageWhereInput;
    orderBy?: Prisma.PetitionUsageOrderByWithRelationInput | Prisma.PetitionUsageOrderByWithRelationInput[];
    cursor?: Prisma.PetitionUsageWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PetitionUsageCountAggregateInputType;
    _avg?: PetitionUsageAvgAggregateInputType;
    _sum?: PetitionUsageSumAggregateInputType;
    _min?: PetitionUsageMinAggregateInputType;
    _max?: PetitionUsageMaxAggregateInputType;
};
export type GetPetitionUsageAggregateType<T extends PetitionUsageAggregateArgs> = {
    [P in keyof T & keyof AggregatePetitionUsage]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePetitionUsage[P]> : Prisma.GetScalarType<T[P], AggregatePetitionUsage[P]>;
};
export type PetitionUsageGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionUsageWhereInput;
    orderBy?: Prisma.PetitionUsageOrderByWithAggregationInput | Prisma.PetitionUsageOrderByWithAggregationInput[];
    by: Prisma.PetitionUsageScalarFieldEnum[] | Prisma.PetitionUsageScalarFieldEnum;
    having?: Prisma.PetitionUsageScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PetitionUsageCountAggregateInputType | true;
    _avg?: PetitionUsageAvgAggregateInputType;
    _sum?: PetitionUsageSumAggregateInputType;
    _min?: PetitionUsageMinAggregateInputType;
    _max?: PetitionUsageMaxAggregateInputType;
};
export type PetitionUsageGroupByOutputType = {
    id: string;
    userId: string;
    year: number;
    month: number;
    count: number;
    _count: PetitionUsageCountAggregateOutputType | null;
    _avg: PetitionUsageAvgAggregateOutputType | null;
    _sum: PetitionUsageSumAggregateOutputType | null;
    _min: PetitionUsageMinAggregateOutputType | null;
    _max: PetitionUsageMaxAggregateOutputType | null;
};
export type GetPetitionUsageGroupByPayload<T extends PetitionUsageGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PetitionUsageGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PetitionUsageGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PetitionUsageGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PetitionUsageGroupByOutputType[P]>;
}>>;
export type PetitionUsageWhereInput = {
    AND?: Prisma.PetitionUsageWhereInput | Prisma.PetitionUsageWhereInput[];
    OR?: Prisma.PetitionUsageWhereInput[];
    NOT?: Prisma.PetitionUsageWhereInput | Prisma.PetitionUsageWhereInput[];
    id?: Prisma.StringFilter<"PetitionUsage"> | string;
    userId?: Prisma.StringFilter<"PetitionUsage"> | string;
    year?: Prisma.IntFilter<"PetitionUsage"> | number;
    month?: Prisma.IntFilter<"PetitionUsage"> | number;
    count?: Prisma.IntFilter<"PetitionUsage"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PetitionUsageOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type PetitionUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId_year_month?: Prisma.PetitionUsageUserIdYearMonthCompoundUniqueInput;
    AND?: Prisma.PetitionUsageWhereInput | Prisma.PetitionUsageWhereInput[];
    OR?: Prisma.PetitionUsageWhereInput[];
    NOT?: Prisma.PetitionUsageWhereInput | Prisma.PetitionUsageWhereInput[];
    userId?: Prisma.StringFilter<"PetitionUsage"> | string;
    year?: Prisma.IntFilter<"PetitionUsage"> | number;
    month?: Prisma.IntFilter<"PetitionUsage"> | number;
    count?: Prisma.IntFilter<"PetitionUsage"> | number;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "userId_year_month">;
export type PetitionUsageOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
    _count?: Prisma.PetitionUsageCountOrderByAggregateInput;
    _avg?: Prisma.PetitionUsageAvgOrderByAggregateInput;
    _max?: Prisma.PetitionUsageMaxOrderByAggregateInput;
    _min?: Prisma.PetitionUsageMinOrderByAggregateInput;
    _sum?: Prisma.PetitionUsageSumOrderByAggregateInput;
};
export type PetitionUsageScalarWhereWithAggregatesInput = {
    AND?: Prisma.PetitionUsageScalarWhereWithAggregatesInput | Prisma.PetitionUsageScalarWhereWithAggregatesInput[];
    OR?: Prisma.PetitionUsageScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PetitionUsageScalarWhereWithAggregatesInput | Prisma.PetitionUsageScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PetitionUsage"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PetitionUsage"> | string;
    year?: Prisma.IntWithAggregatesFilter<"PetitionUsage"> | number;
    month?: Prisma.IntWithAggregatesFilter<"PetitionUsage"> | number;
    count?: Prisma.IntWithAggregatesFilter<"PetitionUsage"> | number;
};
export type PetitionUsageCreateInput = {
    id?: string;
    year: number;
    month: number;
    count?: number;
    user: Prisma.UserCreateNestedOneWithoutPetitionUsageInput;
};
export type PetitionUsageUncheckedCreateInput = {
    id?: string;
    userId: string;
    year: number;
    month: number;
    count?: number;
};
export type PetitionUsageUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
    user?: Prisma.UserUpdateOneRequiredWithoutPetitionUsageNestedInput;
};
export type PetitionUsageUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageCreateManyInput = {
    id?: string;
    userId: string;
    year: number;
    month: number;
    count?: number;
};
export type PetitionUsageUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageListRelationFilter = {
    every?: Prisma.PetitionUsageWhereInput;
    some?: Prisma.PetitionUsageWhereInput;
    none?: Prisma.PetitionUsageWhereInput;
};
export type PetitionUsageOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PetitionUsageUserIdYearMonthCompoundUniqueInput = {
    userId: string;
    year: number;
    month: number;
};
export type PetitionUsageCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
};
export type PetitionUsageAvgOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
};
export type PetitionUsageMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
};
export type PetitionUsageMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
};
export type PetitionUsageSumOrderByAggregateInput = {
    year?: Prisma.SortOrder;
    month?: Prisma.SortOrder;
    count?: Prisma.SortOrder;
};
export type PetitionUsageCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput> | Prisma.PetitionUsageCreateWithoutUserInput[] | Prisma.PetitionUsageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PetitionUsageCreateOrConnectWithoutUserInput | Prisma.PetitionUsageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PetitionUsageCreateManyUserInputEnvelope;
    connect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
};
export type PetitionUsageUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput> | Prisma.PetitionUsageCreateWithoutUserInput[] | Prisma.PetitionUsageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PetitionUsageCreateOrConnectWithoutUserInput | Prisma.PetitionUsageCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PetitionUsageCreateManyUserInputEnvelope;
    connect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
};
export type PetitionUsageUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput> | Prisma.PetitionUsageCreateWithoutUserInput[] | Prisma.PetitionUsageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PetitionUsageCreateOrConnectWithoutUserInput | Prisma.PetitionUsageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PetitionUsageUpsertWithWhereUniqueWithoutUserInput | Prisma.PetitionUsageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PetitionUsageCreateManyUserInputEnvelope;
    set?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    disconnect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    delete?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    connect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    update?: Prisma.PetitionUsageUpdateWithWhereUniqueWithoutUserInput | Prisma.PetitionUsageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PetitionUsageUpdateManyWithWhereWithoutUserInput | Prisma.PetitionUsageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PetitionUsageScalarWhereInput | Prisma.PetitionUsageScalarWhereInput[];
};
export type PetitionUsageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput> | Prisma.PetitionUsageCreateWithoutUserInput[] | Prisma.PetitionUsageUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PetitionUsageCreateOrConnectWithoutUserInput | Prisma.PetitionUsageCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PetitionUsageUpsertWithWhereUniqueWithoutUserInput | Prisma.PetitionUsageUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PetitionUsageCreateManyUserInputEnvelope;
    set?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    disconnect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    delete?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    connect?: Prisma.PetitionUsageWhereUniqueInput | Prisma.PetitionUsageWhereUniqueInput[];
    update?: Prisma.PetitionUsageUpdateWithWhereUniqueWithoutUserInput | Prisma.PetitionUsageUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PetitionUsageUpdateManyWithWhereWithoutUserInput | Prisma.PetitionUsageUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PetitionUsageScalarWhereInput | Prisma.PetitionUsageScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PetitionUsageCreateWithoutUserInput = {
    id?: string;
    year: number;
    month: number;
    count?: number;
};
export type PetitionUsageUncheckedCreateWithoutUserInput = {
    id?: string;
    year: number;
    month: number;
    count?: number;
};
export type PetitionUsageCreateOrConnectWithoutUserInput = {
    where: Prisma.PetitionUsageWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput>;
};
export type PetitionUsageCreateManyUserInputEnvelope = {
    data: Prisma.PetitionUsageCreateManyUserInput | Prisma.PetitionUsageCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PetitionUsageUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PetitionUsageWhereUniqueInput;
    update: Prisma.XOR<Prisma.PetitionUsageUpdateWithoutUserInput, Prisma.PetitionUsageUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PetitionUsageCreateWithoutUserInput, Prisma.PetitionUsageUncheckedCreateWithoutUserInput>;
};
export type PetitionUsageUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PetitionUsageWhereUniqueInput;
    data: Prisma.XOR<Prisma.PetitionUsageUpdateWithoutUserInput, Prisma.PetitionUsageUncheckedUpdateWithoutUserInput>;
};
export type PetitionUsageUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PetitionUsageScalarWhereInput;
    data: Prisma.XOR<Prisma.PetitionUsageUpdateManyMutationInput, Prisma.PetitionUsageUncheckedUpdateManyWithoutUserInput>;
};
export type PetitionUsageScalarWhereInput = {
    AND?: Prisma.PetitionUsageScalarWhereInput | Prisma.PetitionUsageScalarWhereInput[];
    OR?: Prisma.PetitionUsageScalarWhereInput[];
    NOT?: Prisma.PetitionUsageScalarWhereInput | Prisma.PetitionUsageScalarWhereInput[];
    id?: Prisma.StringFilter<"PetitionUsage"> | string;
    userId?: Prisma.StringFilter<"PetitionUsage"> | string;
    year?: Prisma.IntFilter<"PetitionUsage"> | number;
    month?: Prisma.IntFilter<"PetitionUsage"> | number;
    count?: Prisma.IntFilter<"PetitionUsage"> | number;
};
export type PetitionUsageCreateManyUserInput = {
    id?: string;
    year: number;
    month: number;
    count?: number;
};
export type PetitionUsageUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    year?: Prisma.IntFieldUpdateOperationsInput | number;
    month?: Prisma.IntFieldUpdateOperationsInput | number;
    count?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type PetitionUsageSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    year?: boolean;
    month?: boolean;
    count?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["petitionUsage"]>;
export type PetitionUsageSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    year?: boolean;
    month?: boolean;
    count?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["petitionUsage"]>;
export type PetitionUsageSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    year?: boolean;
    month?: boolean;
    count?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["petitionUsage"]>;
export type PetitionUsageSelectScalar = {
    id?: boolean;
    userId?: boolean;
    year?: boolean;
    month?: boolean;
    count?: boolean;
};
export type PetitionUsageOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "year" | "month" | "count", ExtArgs["result"]["petitionUsage"]>;
export type PetitionUsageInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PetitionUsageIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type PetitionUsageIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PetitionUsagePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PetitionUsage";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        year: number;
        month: number;
        count: number;
    }, ExtArgs["result"]["petitionUsage"]>;
    composites: {};
};
export type PetitionUsageGetPayload<S extends boolean | null | undefined | PetitionUsageDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload, S>;
export type PetitionUsageCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PetitionUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PetitionUsageCountAggregateInputType | true;
};
export interface PetitionUsageDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PetitionUsage'];
        meta: {
            name: 'PetitionUsage';
        };
    };
    findUnique<T extends PetitionUsageFindUniqueArgs>(args: Prisma.SelectSubset<T, PetitionUsageFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PetitionUsageFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PetitionUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PetitionUsageFindFirstArgs>(args?: Prisma.SelectSubset<T, PetitionUsageFindFirstArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PetitionUsageFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PetitionUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PetitionUsageFindManyArgs>(args?: Prisma.SelectSubset<T, PetitionUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PetitionUsageCreateArgs>(args: Prisma.SelectSubset<T, PetitionUsageCreateArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PetitionUsageCreateManyArgs>(args?: Prisma.SelectSubset<T, PetitionUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PetitionUsageCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PetitionUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PetitionUsageDeleteArgs>(args: Prisma.SelectSubset<T, PetitionUsageDeleteArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PetitionUsageUpdateArgs>(args: Prisma.SelectSubset<T, PetitionUsageUpdateArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PetitionUsageDeleteManyArgs>(args?: Prisma.SelectSubset<T, PetitionUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PetitionUsageUpdateManyArgs>(args: Prisma.SelectSubset<T, PetitionUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PetitionUsageUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PetitionUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PetitionUsageUpsertArgs>(args: Prisma.SelectSubset<T, PetitionUsageUpsertArgs<ExtArgs>>): Prisma.Prisma__PetitionUsageClient<runtime.Types.Result.GetResult<Prisma.$PetitionUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PetitionUsageCountArgs>(args?: Prisma.Subset<T, PetitionUsageCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PetitionUsageCountAggregateOutputType> : number>;
    aggregate<T extends PetitionUsageAggregateArgs>(args: Prisma.Subset<T, PetitionUsageAggregateArgs>): Prisma.PrismaPromise<GetPetitionUsageAggregateType<T>>;
    groupBy<T extends PetitionUsageGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PetitionUsageGroupByArgs['orderBy'];
    } : {
        orderBy?: PetitionUsageGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PetitionUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPetitionUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PetitionUsageFieldRefs;
}
export interface Prisma__PetitionUsageClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PetitionUsageFieldRefs {
    readonly id: Prisma.FieldRef<"PetitionUsage", 'String'>;
    readonly userId: Prisma.FieldRef<"PetitionUsage", 'String'>;
    readonly year: Prisma.FieldRef<"PetitionUsage", 'Int'>;
    readonly month: Prisma.FieldRef<"PetitionUsage", 'Int'>;
    readonly count: Prisma.FieldRef<"PetitionUsage", 'Int'>;
}
export type PetitionUsageFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where: Prisma.PetitionUsageWhereUniqueInput;
};
export type PetitionUsageFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where: Prisma.PetitionUsageWhereUniqueInput;
};
export type PetitionUsageFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where?: Prisma.PetitionUsageWhereInput;
    orderBy?: Prisma.PetitionUsageOrderByWithRelationInput | Prisma.PetitionUsageOrderByWithRelationInput[];
    cursor?: Prisma.PetitionUsageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionUsageScalarFieldEnum | Prisma.PetitionUsageScalarFieldEnum[];
};
export type PetitionUsageFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where?: Prisma.PetitionUsageWhereInput;
    orderBy?: Prisma.PetitionUsageOrderByWithRelationInput | Prisma.PetitionUsageOrderByWithRelationInput[];
    cursor?: Prisma.PetitionUsageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionUsageScalarFieldEnum | Prisma.PetitionUsageScalarFieldEnum[];
};
export type PetitionUsageFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where?: Prisma.PetitionUsageWhereInput;
    orderBy?: Prisma.PetitionUsageOrderByWithRelationInput | Prisma.PetitionUsageOrderByWithRelationInput[];
    cursor?: Prisma.PetitionUsageWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PetitionUsageScalarFieldEnum | Prisma.PetitionUsageScalarFieldEnum[];
};
export type PetitionUsageCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionUsageCreateInput, Prisma.PetitionUsageUncheckedCreateInput>;
};
export type PetitionUsageCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PetitionUsageCreateManyInput | Prisma.PetitionUsageCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PetitionUsageCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    data: Prisma.PetitionUsageCreateManyInput | Prisma.PetitionUsageCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PetitionUsageIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PetitionUsageUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionUsageUpdateInput, Prisma.PetitionUsageUncheckedUpdateInput>;
    where: Prisma.PetitionUsageWhereUniqueInput;
};
export type PetitionUsageUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PetitionUsageUpdateManyMutationInput, Prisma.PetitionUsageUncheckedUpdateManyInput>;
    where?: Prisma.PetitionUsageWhereInput;
    limit?: number;
};
export type PetitionUsageUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PetitionUsageUpdateManyMutationInput, Prisma.PetitionUsageUncheckedUpdateManyInput>;
    where?: Prisma.PetitionUsageWhereInput;
    limit?: number;
    include?: Prisma.PetitionUsageIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PetitionUsageUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where: Prisma.PetitionUsageWhereUniqueInput;
    create: Prisma.XOR<Prisma.PetitionUsageCreateInput, Prisma.PetitionUsageUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PetitionUsageUpdateInput, Prisma.PetitionUsageUncheckedUpdateInput>;
};
export type PetitionUsageDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
    where: Prisma.PetitionUsageWhereUniqueInput;
};
export type PetitionUsageDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PetitionUsageWhereInput;
    limit?: number;
};
export type PetitionUsageDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PetitionUsageSelect<ExtArgs> | null;
    omit?: Prisma.PetitionUsageOmit<ExtArgs> | null;
    include?: Prisma.PetitionUsageInclude<ExtArgs> | null;
};

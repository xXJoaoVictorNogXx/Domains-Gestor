export interface Domain {
    id: number;
    name: string;
    storage: number;
    isBlocked: boolean;
    description?: string;
}

export interface GetDomainsParams {
    id?: string | null;
    name?: string;
}
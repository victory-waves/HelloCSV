export declare function has<T extends {
    indexOf: (value: any) => number;
}>(collection: T, value: any): boolean;
export declare function eachWithObject<T, P>(collection: T[], callback: (item: T, obj: Record<string, P>) => void): Record<string, P>;
export declare function hasData(row: Record<string, any>): boolean;
//# sourceMappingURL=functional.d.ts.map
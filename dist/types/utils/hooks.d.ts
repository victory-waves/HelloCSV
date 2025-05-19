export declare function useLongPress(onLongPress: () => void, { disabled }?: {
    disabled?: boolean | undefined;
}): {
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchMove: (e: React.TouchEvent<HTMLElement>) => void;
    onTouchEnd: () => void;
    onTouchCancel: () => void;
    onMouseLeave: () => void;
};
//# sourceMappingURL=hooks.d.ts.map
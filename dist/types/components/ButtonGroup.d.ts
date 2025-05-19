interface Props {
    activeButton: string;
    buttons: ButtonGroupType[];
}
export type ButtonGroupType = {
    value: string;
    label: string;
    onClick: () => void;
    variant: 'default' | 'danger';
};
export default function ButtonGroup({ activeButton, buttons }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ButtonGroup.d.ts.map
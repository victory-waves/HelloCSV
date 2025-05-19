type VariantType = 'default' | 'danger';
interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    subTitle?: string;
    confirmationText?: string;
    cancelText?: string;
    onConfirm: () => void;
    variant?: VariantType;
}
export default function ConfirmationModal({ open, setOpen, title, subTitle, confirmationText, cancelText, onConfirm, variant, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConfirmationModal.d.ts.map
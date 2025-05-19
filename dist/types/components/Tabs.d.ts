import { SelectOption } from './Select';
type Tab = SelectOption<string>;
interface Props {
    tabs: Tab[];
    activeTab: string;
    onTabChange: (tab: string) => void;
}
export default function Tabs({ tabs, activeTab, onTabChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Tabs.d.ts.map
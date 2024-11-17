import "./TabList.css";
type TabListProps = {
  onSetTab: (index: number) => void;
  tabIndex: number;
  tabLabels: string[];
};

export default function TabList({
  onSetTab,
  tabIndex,
  tabLabels,
}: TabListProps) {
  return (
    <div className="tab__list">
      {tabLabels.map((item, index) => (
        <div
          key={index}
          onClick={() => onSetTab(index)}
          className={`tab ${index === tabIndex ? "tab__selected" : ""}`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

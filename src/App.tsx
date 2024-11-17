import { useState } from "react";
import "./App.css";
import TabList from "./features/common/TabList";

import GenerateSession from "./features/generateSession";
import PreviewSession from "./features/previewSession";

export default function App() {
  const [tab, setTab] = useState(0);
  const tabs = [
    {
      labels: "Preview Session",
      children: <PreviewSession />,
    },
    {
      label: "Generate Session",
      children: <GenerateSession />,
    },
  ];
  return (
    <>
      <header>
        <div className="header">
          <h1>Cropper</h1>
        </div>
      </header>

      <TabList
        tabLabels={["Preview Session", "Generate Session"]}
        tabIndex={tab}
        onSetTab={(index: number) => setTab(index)}
      />
      {tabs[tab].children}
    </>
  );
}

import React, { useState, useRef, useEffect } from "react";

export default function TabsLgPillLeadingIcon() {
  const [tabSelected, setTabSelected] = useState({
    currentTab: 1,
    noTabs: 3,
  });

  const wrapperRef = useRef(null);

  const handleKeyDown = (e) => {
    if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
      if (e.key === "ArrowRight") {
        setTabSelected((prev) =>
          prev.currentTab < prev.noTabs
            ? { ...prev, currentTab: prev.currentTab + 1 }
            : { ...prev, currentTab: 1 }
        );
      } else if (e.key === "ArrowLeft") {
        setTabSelected((prev) =>
          prev.currentTab > 1
            ? { ...prev, currentTab: prev.currentTab - 1 }
            : { ...prev, currentTab: prev.noTabs }
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const tabs = [
    { id: 1, label: "Dine In" },
    { id: 2, label: "Take Away" },
  ];

  return (
    <section className="max-w-full" aria-label="Tab Panel">
      <ul className="flex items-center gap-2" role="tablist" ref={wrapperRef}>
        {tabs.map((tab) => (
          <li key={tab.id} role="presentation">
            <button
              className={`inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded px-6 text-sm font-medium transition duration-300 focus-visible:outline-none ${
                tabSelected.currentTab === tab.id
                  ? "bg-black text-white hover:bg-emerald-600 focus:bg-emerald-700"
                  : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-500 focus:bg-emerald-50 focus:text-emerald-600"
              }`}
              id={`tab-label-${tab.id}`}
              role="tab"
              aria-setsize="3"
              aria-posinset={tab.id}
              tabIndex={tabSelected.currentTab === tab.id ? 0 : -1}
              aria-controls={`tab-panel-${tab.id}`}
              aria-selected={tabSelected.currentTab === tab.id}
              onClick={() =>
                setTabSelected({ ...tabSelected, currentTab: tab.id })
              }
            >
              <span>{tab.label}</span>
            </button>
          </li>
        ))}
      </ul>
      <div>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`px-6 py-4 ${
              tabSelected.currentTab === tab.id ? "" : "hidden"
            }`}
            id={`tab-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-label-${tab.id}`}
            aria-hidden={tabSelected.currentTab !== tab.id}
          >
            <div className="max-w-md px-4 mx-auto mt-12">
              <label htmlFor="username" className="block py-2 text-gray-500">
                Username
              </label>
              <div className="flex items-center text-gray-400 border rounded-md">
                <div className="px-3 py-2.5 rounded-l-md bg-gray-50 border-r">
                  Hey
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  id="username"
                  className="w-full p-2.5 bg-transparent outline-none"
                />
              </div>
              <label className="text-gray-600 mt-4 block">Phone number</label>
              <div className="relative mt-2 max-w-xs text-gray-500">
                <div className="absolute inset-y-0 left-3 flex items-center border-r pr-2">
                  <select className="text-sm bg-transparent outline-none h-full rounded-lg">
                    <option>IN</option>
                  </select>
                </div>
                <input
                  type="number"
                  placeholder="+91 (555) 000-000"
                  className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

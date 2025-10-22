import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";
import * as React from 'react';
import { Window } from '@progress/kendo-react-dialogs';
import { Avatar } from '@progress/kendo-react-layout';
import { Loader } from '@progress/kendo-react-indicators';

const App = () => {
    const { title, firstName, lastName, email, phone, purpose = [] } = useWidgetProps({});

    return (
        <div className="example-wrapper"  style={{ minHeight: 650 }}>
           {firstName ? <Window title={title} initialWidth={480}>
                    <div className="flex flex-col gap-4">
                          <div className="flex gap-2 items-center">
                              <Avatar className="bg-[#028282]">JS</Avatar>
                              <div className="flex flex-col gap-1">
                                  <span className="text-lg font-medium">{`${firstName} ${lastName}`}</span>
                              </div>
                          </div>
                          <div className="flex gap-1">
                              <span className="color-subtle">Team:</span>
                              <span className="underline">{'KendoReact'}</span>
                          </div>
                          <div className="flex gap-1">
                              <span className="color-subtle">Email:</span>
                              <span className="underline">{email}</span>
                          </div>
                          <div className="flex gap-1">
                              <span className="color-subtle">Phone Number:</span>
                              <span className="underline">{phone}</span>
                          </div>
                          <div className="flex gap-1">
                              <span className="color-subtle">Purpose:</span>
                              <span className="underline">{purpose.join(', ')}</span>
                          </div>
                      </div>
                  </Window>
                : <Loader/>}
        </div>
    );
};


createRoot(document.getElementById("result-root")).render(<App />);

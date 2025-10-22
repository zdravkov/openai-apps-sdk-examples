import { createRoot } from "react-dom/client";
import * as React from 'react';
import { AdaptiveModeContext } from '@progress/kendo-react-common';
import { DateInput, DatePicker, DateTimePicker, Calendar } from '@progress/kendo-react-dateinputs';

const App = () => {
    const [value, setValue] = React.useState(new Date());
    const changeDate = ({ value }) => {
        setValue(value);
    };

    return (
        <div className="row example-wrapper" style={{ minHeight: 850 }}>
            <AdaptiveModeContext.Provider value={{ small: 320, medium: 600 }}>
                <div className="col-xs-12 col-md-6 example-col">
                    <p>DateInput</p>
                    <DateInput value={value} onChange={changeDate} />
                    <p>
                        (use <code>←</code> and <code>→</code> to navigate, <code>↑</code> and
                        <code>↓</code> to update)
                    </p>
                    <p>DatePicker</p>
                    <DatePicker adaptive={true} value={value} onChange={changeDate} />
                    <p>
                        (use Alt+<code>↓</code> to open the calendar, <code>←</code> and
                        <code>→</code> to navigate, <code>↑</code> to increment and
                        <code>↓</code> to decrement the value)
                    </p>
                    <p>DateTimePicker</p>
                    <DateTimePicker adaptive={true} value={value} onChange={changeDate} />
                    <p>
                        (use Alt+<code>↓</code> to open the time list, Tab to move to the next time section in the popup,{' '}
                        <code>↑</code> to increment and
                        <code>↓</code> to decrement the value)
                    </p>
                </div>
                <div className="col-xs-12 col-md-6 example-col">
                    <Calendar value={value} onChange={changeDate} />
                </div>
            </AdaptiveModeContext.Provider>
        </div>
    );
};

export default App;

createRoot(document.getElementById("dateinputs-root")).render(<App />);

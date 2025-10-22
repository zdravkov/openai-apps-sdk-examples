import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";
import * as React from 'react';
import { Rating } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';

const App = () => {
    const { title } = useWidgetProps({});
    const [value, setValue] = React.useState(2);
    const handleValueChange = async event => {
        setValue(event.value);

        await window.openai?.sendFollowUpMessage({
             prompt: `Show form with title: "We noticed you rated ${title} with ${event.value} stars. Do you want to check it out?"`,
        });
    };
    return (
        <div className="example-wrapper">
            <Label>{title || 'Please rate:'}:</Label>
            <Rating value={value} onChange={handleValueChange} />
        </div>
    );
};


createRoot(document.getElementById("rating-root")).render(<App />);

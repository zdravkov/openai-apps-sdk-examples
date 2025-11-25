
import { useWidgetProps } from "../use-widget-props";
import { createRoot } from "react-dom/client";
import { FloatingLabel } from '@progress/kendo-react-labels';
import { Hint } from '@progress/kendo-react-labels';
import { MaskedTextBox } from '@progress/kendo-react-inputs';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { TextBox } from '@progress/kendo-react-inputs';
import { DialogActionsBar, Dialog } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { useState } from "react";

const App = () => {
    const { title } = useWidgetProps({});
    const [fNValue, setFNValue] = useState('');
    const [lNValue, setLNValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [purpose, setPurpose] = useState([]);
    const handleSubmit = async () => {
        await window.openai?.sendFollowUpMessage({
            prompt: `Show result with
            firstName: ${fNValue},
            lastName: ${lNValue},
            jobTitle: ${titleValue},
            email: ${emailValue},
            phone: ${phoneValue},
            purpose: ${purpose.join(', ')}.`,
        });
    };

    return (
        <div className="flex flex-col gap-4 p-4 example-wrapper"   style={{ minHeight: 650 }}>
            <FloatingLabel label="First Name" editorId={'first-name'} editorValue={fNValue}>
                <TextBox aria-label="First Name" size="large" value={fNValue} onChange={e => setFNValue(e.value)} />
                </FloatingLabel>
            <FloatingLabel label="Last Name" editorId={'last-name'} editorValue={lNValue}>
                <TextBox aria-label="Last Name" size="large" value={lNValue} onChange={e => setLNValue(e.value)} />
            </FloatingLabel>
            <FloatingLabel label="Job Title" editorId={'job-title'} editorValue={titleValue}>
                <TextBox aria-label="Job Title" size="large" value={titleValue} onChange={e => setTitleValue(e.value)} />
            </FloatingLabel>
            <FloatingLabel label="Email" editorId={'email'} editorValue={emailValue}>
                <TextBox aria-label="Email" size="large" value={emailValue} onChange={e => setEmailValue(e.value)} />
            </FloatingLabel>
            <FloatingLabel label="Phone Number" editorId={'phone'} editorValue={phoneValue}>
                <MaskedTextBox aria-label="Phone Number" size="large" value={phoneValue} mask="(999) 000-000-000" onChange={e => setPhoneValue(e.value)} />
            </FloatingLabel>
            <FloatingLabel label="Purpose" editorId={'purpose'} editorValue={purpose.join(', ')}>
                <MultiSelect aria-label="Purpose" size="large" data={['Business', 'Fun', 'Testing']} value={purpose} onChange={e => setPurpose([...e.value])} />
                <Hint>Multiple options could be selected at once.</Hint>
            </FloatingLabel>
            <DialogActionsBar>
                <Button type="button" themeColor={'primary'} onClick={handleSubmit} title="Save button">
                    Save
                </Button>
                <Button type="button" onClick={() => setOpenDialog(false)} title="Cancel button">
                    Cancel
                </Button>
            </DialogActionsBar>
        </div>
    );
};

createRoot(document.getElementById("form-root")).render(<App />);

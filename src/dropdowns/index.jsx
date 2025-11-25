import { createRoot } from "react-dom/client";
import { AdaptiveModeContext } from '@progress/kendo-react-common';
import {
    AutoComplete,
    DropDownList,
    MultiSelect
} from '@progress/kendo-react-dropdowns';

const App = () => {
    const sports = [
        'Baseball',
        'Basketball',
        'Cricket',
        'Field Hockey',
        'Football',
        'Table Tennis',
        'Tennis',
        'Volleyball'
    ];

    return (
        <div className="example-wrapper" style={{ minHeight: '600px' }}>
            <AdaptiveModeContext.Provider value={{ small: 320, medium: 600 }}>
                <div className="col-xs-12 col-sm-7 example-col">
                    <p>AutoComplete</p>
                    <AutoComplete style={{ width: '300px' }} adaptive={true} data={sports} placeholder="Your favorite sport" />
                </div>

                <div className="col-xs-12 col-sm-7 example-col">
                    <p>DropDownList</p>
                    <DropDownList style={{ width: '300px' }} adaptive={true} data={sports} defaultValue="Basketball" />
                </div>
                <div className="col-xs-12 col-sm-7 example-col">
                    <p>MultiSelect</p>
                    <MultiSelect style={{ width: '300px' }} adaptive={true} data={sports} defaultValue={['Basketball', 'Cricket']} />
                </div>
            </AdaptiveModeContext.Provider>
        </div>
    );
};

createRoot(document.getElementById("dropdowns-root")).render(<App />);

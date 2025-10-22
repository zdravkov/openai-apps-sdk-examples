import { createRoot } from "react-dom/client";
import * as React from 'react';
import { Loader, Skeleton } from '@progress/kendo-react-indicators';

const App = () => {
  return <div className="example">
            <div className="example-wrap" style={{
      textAlign: 'center'
    }}>
                <div className="row">
                    <div className="col-4 d-flex flex-column align-items-center">
                        <Skeleton shape="rectangle" style={{
            width: 50,
            height: 50
          }} />
                    </div>
                    <div className="col-4">
                        <Loader type="pulsing" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 d-flex flex-column align-items-center">
                        <Skeleton shape="circle" style={{
            width: 50,
            height: 50
          }} />
                    </div>
                    <div className="col-4">
                        <Loader type="infinite-spinner" />
                    </div>
                </div>

                <div className="row">
                    <div className="col-4 d-flex flex-column align-items-center">
                        <Skeleton shape="text" style={{
            width: 100
          }} />
                    </div>
                    <div className="col-4">
                        <Loader type="converging-spinner" />
                    </div>
                </div>
            </div>
            <style>{`.row { margin-bottom: 20px; }`}</style>
        </div>;
};

createRoot(document.getElementById("loaders-root")).render(<App />);

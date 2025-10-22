import { createRoot } from "react-dom/client";
import { Grid, GridColumn, GridSearchBox, GridToolbar } from '@progress/kendo-react-grid';
import { useWidgetProps } from "../use-widget-props";
import { useMemo } from "react";

const App = () => {
    const { title, items, mentions } = useWidgetProps({});
    console.log("items", items);
    console.log("title", title);
    const gridData = useMemo(() => (items || []).map((item, index) => {
      const processedItem = {};
      Object.keys(item).forEach(key => {
        processedItem[key] = typeof item[key] === 'string' ? item[key] : JSON.stringify(item[key]);
      });
      return { ...processedItem, gridId: index + 1, title, population: 1000 };
    }), [items]);
    console.log("gridData", gridData);

    return (
        <Grid
            style={{ height: '575px' }}
            data={gridData}
            dataItemKey="gridId"
            autoProcessData={true}
            showLoader={(!items || items.length === 0)}
            sortable={true}
            pageable={true}
            editable={{ mode: 'incell' }}
            defaultSkip={0}
            defaultTake={10}
            navigatable={true}
        >
          <GridToolbar>
            <GridSearchBox />
          </GridToolbar>
        {gridData.length > 0 && Object.keys(gridData[0])
          .filter(key => key !== 'gridId')
          .map(key => (
            <GridColumn key={key} field={key} title={key} />
          ))
        }
        </Grid>
    );
};

createRoot(document.getElementById("grid-root")).render(<App />);

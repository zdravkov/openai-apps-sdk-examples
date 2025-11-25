import React from "react";
import { createRoot } from "react-dom/client";
import markers from "../pizzaz/markers.json";
import { PlusCircle, Star } from "lucide-react";
import { useWidgetProps } from "../use-widget-props";
import { Button } from '@progress/kendo-react-buttons';

function App() {
  const places = markers?.places || [];
  const { pizzaTopping, items } = useWidgetProps({});
  console.log("items", items);
  console.log("pizzaTopping", pizzaTopping);

  const handleOnClick = async () => {

    await window.openai?.sendFollowUpMessage({
      prompt: "Show grid with items " + JSON.stringify(items) + ".",
    });

  }

  return (
    <div className="antialiased w-full text-black px-4 pb-2 border border-black/10 rounded-2xl sm:rounded-3xl overflow-hidden bg-white">
      <div className="max-w-full">
        <div className="flex flex-row items-center gap-4 sm:gap-4 border-b border-black/5 py-4">
          <div
            className="sm:w-18 w-16 aspect-square rounded-xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://persistent.oaistatic.com/pizzaz/title.png)",
            }}
          ></div>
          <div>
            <div className="text-base sm:text-xl font-medium">
              National Best Pizza List11
            </div>
            <div className="text-sm text-black/60">
              A ranking of the best pizzerias in the world
            </div>
          </div>
          <div className="flex-auto hidden sm:flex justify-end pr-2">
            <Button
              type="button"
              themeColor="primary"
              onClick={handleOnClick}>
              2 {pizzaTopping}
            </Button>
          </div>
        </div>
        </div>

    </div>
  );
}

createRoot(document.getElementById("action-button-root")).render(<App />);

import { createRoot } from "react-dom/client";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import { folderIcon, homeIcon, listUnorderedSquareIcon, userOutlineIcon } from '@progress/kendo-svg-icons';

const drawerItems = [
    { text: "Home", svgIcon: homeIcon, route: '/', selected: true, className: "rounded-md [.k-selected]:!bg-primary/8 [.k-selected]:!text-primary-emphasis" },
    { text: "Projects", svgIcon: folderIcon, route: '/projects', className: "rounded-md [.k-selected]:!bg-primary/8 [.k-selected]:!text-primary-emphasis"  },
    { text: "Tasks", svgIcon: listUnorderedSquareIcon, route: '/tasks', className: "rounded-md [.k-selected]:!bg-primary/8 [.k-selected]:!text-primary-emphasis"  },
    { text: "Team Management", svgIcon: userOutlineIcon, route: '/team-management', className: "rounded-md [.k-selected]:!bg-primary/8 [.k-selected]:!text-primary-emphasis"  }
];

const DrawerComponent = () => {

  return (
      <div className="row example-wrapper" style={{ minHeight: 450 }}>
        <Drawer
        expanded={true}
        mode="push"
        drawerClassName="!flex-none !sticky !bg-surface-alt !px-2 !py-10 !w-16 md:!w-60 [&_.k-drawer-wrapper]:!w-12 md:[&_.k-drawer-wrapper]:!w-56 !top-[70px] !h-[calc(100vh_-_70px)]"
        items={drawerItems}
        width={223}
        >
        <DrawerContent>
            <div role="main">

            </div>
        </DrawerContent>
        </Drawer>
    </div>
  );
}

createRoot(document.getElementById("drawer-root")).render(<DrawerComponent />);

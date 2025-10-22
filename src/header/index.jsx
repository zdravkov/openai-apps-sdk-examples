import { createRoot } from "react-dom/client";
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { InputPrefix, InputSeparator, TextBox } from '@progress/kendo-react-inputs';
import { AppBar, AppBarSection, AppBarSpacer, Avatar } from "@progress/kendo-react-layout";
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';
import { Popover } from '@progress/kendo-react-tooltip';
import { SvgIcon } from '@progress/kendo-react-common';

import { bellIcon, logoutIcon, searchIcon, slidersIcon } from '@progress/kendo-svg-icons';

export default function App() {
    const anchor = React.useRef(null);
    const [show, setShow] = React.useState(false);

    const onNavigate = () => {
        setShow(false);
    };
    return (
        <div className="row example-wrapper" style={{ minHeight: 450 }}>
            <AppBar positionMode="sticky" className="bg-surface-alt !p-4" themeColor='inherit'>
                <AppBarSection className="grow md:grow-0 !hidden sm:!inline-flex">
                    <div role="search">
                        <TextBox prefix={() => (
                                <>
                                    <InputPrefix>
                                        <SvgIcon icon={searchIcon} />
                                    </InputPrefix>
                                    <InputSeparator />
                                </>
                            )}
                                placeholder="Search"
                                fillMode="solid"
                                className="!w-75"
                        />
                    </div>
                </AppBarSection>

                <AppBarSpacer />

                <AppBarSection className="sm:!hidden">
                    <div role="search">
                        <Button fillMode="flat" svgIcon={searchIcon} title="Search button" />
                    </div>
                </AppBarSection> 

                <AppBarSection className="gap-2">
                    <div onClick={() => setShow(!show)} ref={anchor} role="contentinfo">
                        <Avatar rounded="full" type="text" themeColor="primary" className="cursor-pointer">JP</Avatar>
                    </div>
                    <Popover
                        show={show}
                        anchor={anchor.current}
                        position={'bottom'}
                        style={{ width: '120px' }}
                        className="[&_.k-popover-body]:!p-0"
                    >
                    <div className="k-list k-list-md">
                            <div className="k-list-content">
                                <ul className="k-list-ul">
                                <li className="k-list-item" onClick={onNavigate}>
                                    <SvgIcon icon={slidersIcon}/>
                                    <span className="k-list-item-text">Settings</span>
                                </li>
                                <li className="k-list-item">
                                    <SvgIcon icon={logoutIcon}/>
                                    <span className="k-list-item-text">Log out</span>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </Popover>
                    <span className="k-appbar-separator border-border"></span>
                    <BadgeContainer>
                        <Button svgIcon={bellIcon} fillMode="flat" title="Notifications button" />
                        <Badge rounded="full" position="inside" align={{ vertical: 'top', horizontal: 'end' }} themeColor="primary" />
                    </BadgeContainer>
                    </AppBarSection>
            </AppBar>
        </div>
    );
}

createRoot(document.getElementById("header-root")).render(<App />);

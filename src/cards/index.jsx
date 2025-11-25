import { createRoot } from "react-dom/client";
import { useWidgetProps } from "../use-widget-props";

import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    CardActions,
    CardImage,
    CardSubtitle
 } from '@progress/kendo-react-layout';
import { starIcon, starOutlineIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';
import { Button } from '@progress/kendo-react-buttons';
  const coffeeSecond = 'https://demos.telerik.com/kendo-react-ui/assets/layout/card/coffee_second.jpg';

const App = () => {
    const { cards } = useWidgetProps({});
    const handleClick = async (_e, title) => {
        await window.openai?.sendFollowUpMessage({
            prompt: `Show kendo rating for ${title}.`,
        });
    }
    return (
        <div style={{ padding: '20px', maxWidth: '600px', minHeight: '500px',  }}>
            <div className="k-card-deck">
                { cards && cards.map((card, index) => (
                    <Card key={index} style={{ width: 250 }}>
                        <CardImage src={card.image || coffeeSecond} />
                        <div>
                            <CardHeader>
                                <CardTitle>{card.title || 'Coffee with friends'}</CardTitle>
                                <CardSubtitle>
                                    <span className="reviews">
                                        <SvgIcon icon={starIcon} style={{ color: '#ffce2a' }} />
                                        <SvgIcon icon={starIcon} style={{ color: '#ffce2a' }} />
                                        <SvgIcon icon={starIcon} style={{ color: '#ffce2a' }} />
                                        <SvgIcon icon={starIcon} style={{ color: '#ffce2a' }} />
                                        <SvgIcon icon={starOutlineIcon} />
                                        <div>{card.rating || '4/5 (681)'}</div>
                                    </span>
                                </CardSubtitle>
                            </CardHeader>
                            <CardBody>
                                <p>
                                    {card.description || 'The right place to be if you\'re in love with high quality espresso or tea. We offer wide range to top coffee brands as Davidoff Cafe, Lavazza, Tchibo, Illy.'}
                                </p>
                            </CardBody>
                            <CardActions>
                                <Button fillMode="flat" onClick={(e) => handleClick(e, card.title)} themeColor={'primary'} type="button">
                                    {'Review'}
                                </Button>
                            </CardActions>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

createRoot(document.getElementById("cards-root")).render(<App />);

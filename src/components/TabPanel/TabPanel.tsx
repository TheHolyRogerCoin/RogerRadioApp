import Box from '@mui/material/Box';
import * as React from 'react';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanelComponent: React.FC<TabPanelProps> = ({ children, index, value }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box>{children}</Box>}
        </div>
    );
};

export const TabPanel = React.memo(TabPanelComponent);

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer, type TooltipProps,

} from 'recharts';
import { Text } from "../../../../../shared/ui";
import styles from './chartCard.module.scss';

const MOCK_DATA = [
    { name: 'Jan', value: 45 },
    { name: 'Feb', value: 72 },
    { name: 'Mar', value: 58 },
    { name: 'Apr', value: 90 },
    { name: 'May', value: 64 },
    { name: 'Jun', value: 85 },
    { name: 'Jul', value: 100 },
];

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        return (
            <div className={`${styles.customTooltip} glass`}>
                <Text size="sm" weight="bold">{label}</Text>
                <Text size="md" className={styles.tooltipValue}>
                    {payload[0].value} incidents
                </Text>
            </div>
        );
    }
    return null;
};

const ChartCard = () => {
    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={MOCK_DATA}
                    margin={{
                        top: 10,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e8e8" />

                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                        dy={10}
                    />

                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#888', fontSize: 12 }}
                    />

                    <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: 'transparent' }}
                        isAnimationActive={false}
                    />

                    <Bar
                        dataKey="value"
                        fill="var(--accent-primary)"
                        radius={[4, 4, 0, 0]}
                        barSize={32}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ChartCard;
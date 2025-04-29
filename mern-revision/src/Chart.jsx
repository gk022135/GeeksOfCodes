"use client";

import * as React from "react";
import {
    Line,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const chartData = [
    { date: "2024-04-01", desktop: 222, mobile: 150 },
    { date: "2024-04-02", desktop: 97, mobile: 180 },
    { date: "2024-04-03", desktop: 167, mobile: 120 },
    { date: "2024-04-04", desktop: 242, mobile: 260 },
    { date: "2024-04-05", desktop: 373, mobile: 290 },
    { date: "2024-04-06", desktop: 301, mobile: 340 },
    { date: "2024-04-07", desktop: 245, mobile: 180 },
    { date: "2024-04-08", desktop: 409, mobile: 320 },
    { date: "2024-04-09", desktop: 59, mobile: 110 },
    { date: "2024-04-10", desktop: 261, mobile: 190 },
];

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#8884d8", // hardcoded purple
    },
    mobile: {
        label: "Mobile",
        color: "#82ca9d", // hardcoded green
    },
};

export function Component() {
    const [activeChart, setActiveChart] = React.useState < "desktop" | "mobile" > (
        "desktop"
    );

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Line Chart - Interactive</CardTitle>
                </div>
                <div className="flex items-center space-x-2 px-6">
                    {["desktop", "mobile"].map((key) => (
                        <button
                            key={key}
                            className={`rounded-md px-3 py-1 text-sm font-medium ${activeChart === key
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                            onClick={() => setActiveChart(key)}
                        >
                            {chartConfig[key].label}
                        </button>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey={activeChart}
                            stroke={chartConfig[activeChart].color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default Component;

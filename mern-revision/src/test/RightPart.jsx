import {
    RadialBarChart,
    RadialBar,
    Legend,
    ResponsiveContainer,
    LineChart,
    XAxis,
    YAxis, CartesianGrid, Line,Tooltip,
} from "recharts";

import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";

function RightPart() {
    const solvedData = [
        {
            name: "Solved",
            value: 60,
            fill: "#4ade80", // green
        },
        {
            name: "Remaining",
            value: 40,
            fill: "#e5e7eb", // light gray
        },
    ];

    const attendanceData = [
        {
            name: "Attended",
            value: 75,
            fill: "#60a5fa", // blue
        },
        {
            name: "Missed",
            value: 25,
            fill: "#e5e7eb",
        },
    ];

    // Heatmap data (simulate last 100 days)
    const today = new Date();
    const heatmapData = Array.from({ length: 100 }, (_, i) => {
        const date = subDays(today, i);
        return {
            date: date.toISOString().split("T")[0],
            count: Math.floor(Math.random() * 5),
        };
    });

    const data = [
        { name: "a", value: 2 },
        { name: "b", value: 3 },
        { name: "c", value: 10 },
        { name: "d", value: 5 },
        { name: "e", value: 14 },
    ];
    return (
        <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 text-white">
            {/* Solved Questions */}
            <div className="bg-black/50 rounded-xl shadow p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Solved Questions</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                        innerRadius="40%"
                        outerRadius="90%"
                        barSize={15}
                        data={solvedData}
                        color={"red"}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ position: "insideStart", fill: "#fff" }}
                            background
                            clockWise
                            dataKey="value"
                        />
                        <Legend
                            iconSize={10}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>

            {/* Class Attendance */}
            <div className="bg-black/50 rounded-xl shadow p-4 flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-4">Class Attendance</h2>
                <ResponsiveContainer width="100%" height={200}>
                    <RadialBarChart
                        innerRadius="40%"
                        outerRadius="90%"
                        barSize={15}
                        data={attendanceData}
                    >
                        <RadialBar
                            minAngle={15}
                            label={{ position: "insideStart", fill: "#fff" }}
                            background
                            clockWise
                            dataKey="value"
                        />
                        <Legend
                            iconSize={10}
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                        />
                    </RadialBarChart>
                </ResponsiveContainer>
            </div>

            {/* Activity Heatmap */}
            <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RightPart;

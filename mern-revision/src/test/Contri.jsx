import React, { useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const ContributionGraph = ({ activity }) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [tooltip, setTooltip] = useState({
        visible: false,
        x: 0,
        y: 0,
        value: null,
    });
    const stDate = new Date()
    const edDate = new Date()

    if(selectedYear == 2025) {
        stDate.setFullYear(2025, 0, 1); 
        edDate.setFullYear(2025, 11, 31); // December 31, 2025
    }
    else if(selectedYear == 2024) {
        stDate.setFullYear(2024, 0, 1);
        edDate.setFullYear(2024, 11, 31); // December 31, 2024
    }
    else if(selectedYear == 2023) {
        stDate.setFullYear(2023, 0, 1);
        edDate.setFullYear(2023, 11, 31); // December 31, 2023
    }
    else if(selectedYear == 2022) {
        stDate.setFullYear(2022, 0, 1);
        edDate.setFullYear(2022, 11, 31); // December 31, 2022
    }
    else {
        stDate.setFullYear(2025, 0, 1);
        edDate.setFullYear(2025, 11, 31); // Default to December 31, 2025
    }

    const handleMouseOver = (event, value) => {
        if (!value) return;

        const rect = event.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + window.scrollX,
            y: rect.top + window.scrollY - 30,
            value,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, value: null });
    };

    return (
        <div className="relative mt-10 w-4/5 mx-auto p-4 bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Yearly Activity</h2>
            <div className="absolute right-0 top-0 mb-4 text-white">
                <label  className="text-sm text-white mb-2"> Select Year:</label>
                <select value={selectedYear} onChange={ (e) => setSelectedYear(e.target.value) } className="border rounded p-2 mb-4 bg-gray-800">
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                </select>
            </div>

            <CalendarHeatmap
                startDate={stDate}
                endDate={edDate}
                values={[
                    { date: '2025-06-01', count: 2 },
                    { date: '2025-06-22', count: 4 },
                    { date: '2025-12-31', count: 8 },
                    // ...and so on
                ]}
                showWeekdayLabels
                classForValue={(value) => {
                    if (!value || value.count === 0) return "color-empty";
                    if (value.count < 3) return "color-scale-1";
                    if (value.count < 6) return "color-scale-2";
                    if (value.count < 9) return "color-scale-3";
                    return "color-scale-4";
                }}
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                gutterSize ={4}
                 
            />
            

            {tooltip.visible && tooltip.value && (
                <div
                    className="absolute bg-black text-white text-xs px-2 py-1 rounded shadow-md pointer-events-none z-50"
                    style={{
                        top: tooltip.y,
                        left: tooltip.x,
                    }}
                >
                    {tooltip.value.date}: {tooltip.value.count} solved
                </div>
            )}
        </div>
    );
};

export default ContributionGraph;

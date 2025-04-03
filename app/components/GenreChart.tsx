import * as React from "react"
import { useContext } from 'react';
import { WatchListInfo } from "./WatchListInfo";
import { Label, Pie, PieChart, Cell } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Card,
  CardContent
} from "@/components/ui/card"

const chartConfig = {
  visitors: {
    label: "Genres",
  },
  red50: {
    label: "Red50",
    color: "#fef2f2",
  },
  red100: {
    label: "Red100",
    color: "#fee2e2",
  },
  red200: {
    label: "Red200",
    color: "#fecaca",
  },
  red300: {
    label: "Red300",
    color: "#fca5a5",
  },
  red400: {
    label: "Red400",
    color: "#f87171",
  },
  red500: {
    label: "Red500",
    color: "#ef4444",
  },
  red600: {
    label: "Red600",
    color: "#dc2626",
  },
  red700: {
    label: "Red700",
    color: "#b91c1c",
  },
  red800: {
    label: "Red800",
    color: "#991b1b",
  },
  red900: {
    label: "Red900",
    color: "#7f1d1d",
  },
  red950: {
    label: "Red950",
    color: "#450a0a",
  }
} satisfies ChartConfig

const GenreChart = () => {
  const context = useContext(WatchListInfo);
  if (!context)
    throw new Error("Files must be used within a WatchListProvider");

  const { watchList } = context;

  const popularGenres: Record<string, number> = {};

  const allGenres = watchList.flatMap(cinema_thing => cinema_thing.genres?.split(", ") || [])
  allGenres.forEach(genre => {
    if (genre in popularGenres) {
      popularGenres[genre]++;
    } else {
      popularGenres[genre] = 1;
    }
  });

  // Convert the popularGenres object to an array of { name, value } objects
  const chartData = Object.entries(popularGenres).map(([name, value]) => ({
    name,
    value
  }));

  const top10Genres = chartData.sort((a, b) => b.value - a.value).slice(0, 10);

  return (
    <Card className="flex flex-col bg-transparent p-0 my-6 border-none shadow-none w-full">
      <CardContent className="flex-1 pb-0 px-0">
        <ChartContainer
          config={chartConfig}
          className="w-full"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={top10Genres}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              fill="#8884d8" // Default color if you want a fallback
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 1.5;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={12}
                    fontWeight="bold"
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={[
                    '#fecaca', // red-200 (lightest usable)
                    '#fca5a5', // red-300
                    '#f87171', // red-400
                    '#ef4444', // red-500 (true red)
                    '#dc2626', // red-600
                    '#b91c1c', // red-700
                    '#991b1b', // red-800
                    '#7f1d1d', // red-900
                    '#450a0a',
                    '#680202', // custom dark red 1
                    '#450000'  // custom dark red 2 (almost black)
                    ][index % 11]} // Cycles through colors
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="fill-white text-white"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-white text-3xl font-bold text-white"
                        >
                          Top 10
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-white text-white"
                        >
                          Genres
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default GenreChart
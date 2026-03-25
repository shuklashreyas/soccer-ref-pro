import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";

const foulData = [
  { type: "Tackles", count: 32 },
  { type: "Handballs", count: 18 },
  { type: "Offsides", count: 24 },
  { type: "Penalties", count: 13 },
];

const cardData = [
  { name: "No Card", value: 53, fill: "hsl(var(--muted-foreground))" },
  { name: "Yellow", value: 28, fill: "hsl(var(--warning))" },
  { name: "Red", value: 6, fill: "hsl(var(--destructive))" },
];

const barConfig: ChartConfig = {
  count: { label: "Incidents", color: "hsl(var(--primary))" },
};

const pieConfig: ChartConfig = {
  value: { label: "Cards" },
};

export const FoulDistributionChart = () => (
  <ChartContainer config={barConfig} className="h-[250px] w-full">
    <BarChart data={foulData}>
      <XAxis dataKey="type" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
    </BarChart>
  </ChartContainer>
);

export const CardBreakdownChart = () => (
  <ChartContainer config={pieConfig} className="h-[250px] w-full">
    <PieChart>
      <ChartTooltip content={<ChartTooltipContent />} />
      <Pie
        data={cardData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={50}
        outerRadius={90}
        strokeWidth={2}
        stroke="hsl(var(--background))"
      >
        {cardData.map((entry, index) => (
          <Cell key={index} fill={entry.fill} />
        ))}
      </Pie>
    </PieChart>
  </ChartContainer>
);

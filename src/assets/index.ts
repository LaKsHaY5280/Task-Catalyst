import {
  Circle,
  CircleCheckBig,
  CircleHelp,
  CircleX,
  MoveDown,
  MoveRight,
  MoveUp,
  Timer,
} from "lucide-react";
import logo from "./logo.svg";
import student from "./student.svg";

export { logo, student };

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheckBig,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
];

export const priorities = [
  {
    label: "Critical",
    value: "critical",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Neutral",
    value: "neutral",
  },
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

export const tags = [];
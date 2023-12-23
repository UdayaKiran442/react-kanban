import priority0 from "../assets/no-priority-0.png";
import priority1 from "../assets/low-1.png";
import priority2 from "../assets/medium-2.png";
import priority3 from "../assets/high-3.png";
import priority4 from "../assets/urgent-4.png";
import backlog from "../assets/Backlog.png";
import todo from "../assets/ToDo.png";
import inProgress from "../assets/InProgress.png";

interface StatusIcons {
  [key: string]: string;
}

interface PriorityIcons {
  [key: number]: string;
}

export const priorityIcons: PriorityIcons = {
  0: priority0,
  1: priority1,
  2: priority2,
  3: priority3,
  4: priority4,
};

export const statusIcons: StatusIcons = {
  Backlog: backlog,
  Todo: todo,
  "In Progress": inProgress,
};

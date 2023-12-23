/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";

import priority0 from "../assets/no-priority-0.png";
import priority1 from "../assets/low-1.png";
import priority2 from "../assets/medium-2.png";
import priority3 from "../assets/high-3.png";
import priority4 from "../assets/urgent-4.png";

import backlog from "../assets/Backlog.png";
import todo from "../assets/ToDo.png";
import inProgress from "../assets/InProgress.png";

const priorityIcons = {
  0: priority0,
  1: priority1,
  2: priority2,
  3: priority3,
  4: priority4,
};

const statusIcons = {
  Backlog: backlog,
  Todo: todo,
  "In Progress": inProgress,
};

interface ticket {
  id: string;
  priority: number;
  status: string;
  tag: Array<string>;
  title: string;
  userId: string;
}

const Status: React.FC = () => {
  const [tickets, setTickets] = useState([]);
  const [groupedTickets, setGroupedTickets] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const result = (
        await axios.get(
          "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
        )
      ).data;
      console.log(result.tickets);
      setTickets(result.tickets);
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    const groupedTicketsByStatus = (tickets: any) => {
      const grouped: any = {};
      tickets.forEach((ticket: any) => {
        const status = ticket.status;
        grouped[status] = grouped[status] || [];
        grouped[status].push(ticket);
      });
      return grouped;
    };
    if (tickets.length > 0) {
      const grouped = groupedTicketsByStatus(tickets);
      console.log("Grouped tickets", grouped);
      // Convert object to array of key-value pairs
      const entries = Object.entries(grouped);

      // Sort the array based on the values (arrays)
      entries.sort((a, b) => {
        const valuesA: any = a[1];
        const valuesB: any = b[1];
        return valuesA.join(",") > valuesB.join(",") ? 1 : -1;
      });

      // Convert the sorted array back to an object
      const sortedObject = Object.fromEntries(entries);
      console.log("Sorted object:", sortedObject);
      setGroupedTickets(sortedObject);
    }
  }, [tickets]);

  useEffect(() => {
    console.log(groupedTickets);
  });

  return (
    <div>
      <div className="flex gap-7 p-5">
        {Object.entries(groupedTickets).map(
          ([status, statusTickets]: any, index) => (
            <div className="">
              <div key={index} className="">
                <div className="flex flex-wrap justify-between">
                  <div className="flex gap-1">
                    <img src={statusIcons[status]} />
                    <h2 className="dark:text-white">{status}</h2>
                    <p className="text-secondaryBlack">
                      {statusTickets.length}
                    </p>
                  </div>
                  <div className="ml-10 ">
                    <span className="text-secondaryBlack mr-1">+</span>
                    <span className="text-secondaryBlack">...</span>
                  </div>
                </div>
                <div className="mt-3">
                  {statusTickets.map((ticket: ticket) => (
                    <div className="bg-white dark:bg-[#161B22] mb-4 max-w-72 p-2">
                      <h3 className="text-secondaryBlack">{ticket.id}</h3>
                      <p className="dark:text-white">{ticket.title}</p>
                      <div className="flex gap-1 mt-2">
                        <img
                          src={priorityIcons[ticket.priority]}
                          alt=""
                          width={20}
                          height={20}
                        />
                        <p className="text-secondaryBlack dark:border-secondaryBlack border-[#E6E7EB] px-1 border w-max h-max text-xs">
                          {ticket.tag}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Status;

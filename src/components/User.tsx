/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import fetchTicketsApi from "../utils/api";
import { priorityIcons, statusIcons } from "../utils/icons";

interface Obj {
  [key: string]: string;
}

interface User {
  id: string;
  available: boolean;
  name: string;
}

interface ticket {
  id: string;
  priority: number;
  status: string;
  tag: Array<string>;
  title: string;
  userId: string;
}

const User: React.FC = () => {
  const [obj, setObj] = useState<Obj>({});
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupByUser, setGroupByUser] = useState({});
  useEffect(() => {
    const fetchTickets = async () => {
      const result = await fetchTicketsApi();
      console.log(result.tickets);
      setTickets(result.tickets);
      setUsers(result.users);
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    users.forEach((user: User) => {
      if (!obj[user.id]) {
        obj[user.id] = user.name;
      }
    });
    console.log(obj);
  }, [users]);

  useEffect(() => {
    const grouping = (arr: any) => {
      const grouped: any = {};
      arr.forEach((ticket: any) => {
        const userId = ticket.userId;
        grouped[userId] = grouped[userId] || [];
        grouped[userId].push(ticket);
      });
      console.log(grouped);
      return grouped;
    };
    const groupedObj = grouping(tickets);
    console.log("Grouping users:", groupedObj);
    setGroupByUser(groupedObj);
  }, [tickets]);

  //   useEffect(() => {
  //     console.log(groupByUser);
  //     Object.entries(groupByUser).map(([key]: any) => {
  //       console.log(key);
  //       console.log(obj[key]);
  //     });
  //   }, [groupByUser, obj]);

  return (
    <div>
      <div className="flex gap-7 p-5">
        {Object.entries(groupByUser).map(
          ([status, statusTickets]: any, index) => (
            <div className="">
              <div key={index} className="">
                <div className="flex flex-wrap justify-between">
                  <div className="flex gap-1">
                    <h2 className="dark:text-white">
                      {obj[status.toString()]}
                    </h2>
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
                      <div className="flex gap-1">
                        <img src={statusIcons[ticket.status]} alt="" />
                        <p className="dark:text-white">{ticket.title}</p>
                      </div>
                      <div className="flex gap-1 mt-2">
                        <img src={priorityIcons[ticket.priority]} alt="" />
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

export default User;

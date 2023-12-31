/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";

import fetchTicketsApi from "../utils/api";
import { useUser } from "../utils/user";
import { priorityIcons, statusIcons } from "../utils/icons";

import { AppContext } from "../context/Provider";

import ProfilePhoto from "./ProfilePhoto";

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
  const { userObj, userAvl, tickets, setTickets, setUsers } =
    useContext(AppContext);
  const [groupByUser, setGroupByUser] = useState({});

  useEffect(() => {
    const fetchTickets = async () => {
      const result = await fetchTicketsApi();
      console.log(result.tickets);
      setTickets(result.tickets);
      setUsers(result.users);
    };
    fetchTickets();
  }, [setTickets, setUsers]);

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

  useUser();

  return (
    <div>
      <div className="flex gap-7 p-5">
        {Object.entries(groupByUser).map(
          ([status, statusTickets]: any, index) => (
            <div className="">
              <div key={index} className="">
                <div className="flex flex-wrap justify-between">
                  <div className="flex gap-1">
                    <ProfilePhoto
                      name={userObj[status]}
                      availability={userAvl[status]}
                    />
                    <h2 className="dark:text-white">
                      {userObj[status.toString()]}
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

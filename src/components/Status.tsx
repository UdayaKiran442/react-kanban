/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useEffect, useState } from "react";

import { priorityIcons, statusIcons } from "../utils/icons";

import fetchTicketsApi from "../utils/api";
import grouping from "../utils/grouping";
import { AppContext } from "../context/Provider";
import { useUser } from "../utils/user";
import ProfilePhoto from "./ProfilePhoto";

interface ticket {
  id: string;
  priority: number;
  status: string;
  tag: Array<string>;
  title: string;
  userId: string;
}

const Status: React.FC = () => {
  const { tickets, userObj, userAvl, setTickets, setUsers } =
    useContext(AppContext);
  const [groupedTickets, setGroupedTickets] = useState({});

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
    if (tickets.length > 0) {
      const grouped = grouping(tickets);
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

  useUser();

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
                      <div className="flex justify-between">
                        <h3 className="text-secondaryBlack">{ticket.id}</h3>
                        <ProfilePhoto
                          name={userObj[ticket.userId]}
                          availability={userAvl[ticket.userId]}
                        />
                      </div>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
const grouping = (arr: any) => {
  const grouped: any = {};
  arr.forEach((ticket: any) => {
    const status = ticket.status;
    grouped[status] = grouped[status] || [];
    grouped[status].push(ticket);
  });
  return grouped;
};

export default grouping;

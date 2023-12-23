import axios from "axios";

const fetchTicketsApi = async () => {
  const result = (
    await axios.get(
      "https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers"
    )
  ).data;
  return result;
};

export default fetchTicketsApi;

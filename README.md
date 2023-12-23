# React Kanban dashboard

- Can group tasks based on User, Priority and Status

## Running the project
- In your terminal clone the repository.
- Enter the project folder and install necessary packages using `npm i`.
- Run the project with command `npm run dev`. The project will run on localhost:5153 by default.

## Tech stack used
- Starter template used in project is Vite+React Typescript.
- Tailwind CSS is used to style the components.
- Material UI for components.

## File Structure

- All the images and icons are present in assets folder
- Main components for rendering are some reusable components are present in components folder
- Context provider for the entire web app is present in context folder. All the vairables which are to be re-used in various files are defined in context api.
- Reusable functions and constants are present in utils folder.

## Code Explanation

- The given api is https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers. The result of the api is object with two keys, tickets and users.
- Here we in tickets is an array of objects having properties id, title, priority, tag, status, userId and users is also an array of objects with properties userId, name and available.
-  While displaying task card we need to even display user name and profile image. For that I had created a seperate interfaces for user details and user availability known as `UserObj` and `UserAvailableObj` with properties as 
```js
interface UserObj {
  [key: string]: string;//userId: name
}

interface UserAvailableObj {
  [key: string]: boolean;//userId: available
}
```
- Then I had created a custom hook which stores details of users in the file `user.ts` under utils folder.
```js
interface User {
  id: string;
  available: boolean;
  name: string;
}

export const useUser = () => {
  const { userAvl, userObj, users } = useContext(AppContext);// variables coming from Context Provider
  users.forEach((user: User) => {
    if (!userObj[user.id]) {
      userObj[user.id] = user.name;
      userAvl[user.id] = user.available;
    }
  });
};
```
- Final output for the userObj and userAvl are as follows:
```js
//useObj which is user object which stores user id as key and user name as value
{
usr-1: "Anoop sharma"
usr-2: "Yogesh"
usr-3: "Shankar Kumar"
usr-4: "Ramesh"
usr-5: "Suresh"
}
//userAvl which is user availability object which stores user id as key and available as value
{
usr-1: false
usr-2: true
usr-3: true
usr-4: true
usr-5: true
}
```
- Note here typeof usr-1 is string. 
- The main functionality of the web app is grouping which is achieved using below function
```js
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
```
- Above code is example for grouping tasks by status.
- Here the output format is an object with key as status and array of tasks under this status as value.
- Below is the example output of the grouped object.
```js
{
Todo: [{...},{...}],
Backlog: [{...}]
}
```
- Properties of value of Todo which is an object is as same as property of each ticket which is represented below:
```js
interface Tickets {
  id: string;
  priority: number;
  status: string;
  tag: Array<string>;
  title: string;
  userId: string;
}
```
## Dark Mode feature
- Value for dark mode is coming from darkMode variable which is a state defined in Context API.
- Default value of `darkMode` is false.
- When user selects the moon icon present in NavBar then `darkMode` becomes true and class named `dark` will be added to class list document element.

```js
  const { darkMode, setDarkMode } = useContext(AppContext);
  const onChangeTheme = () => {
    console.log("click");
    if (darkMode) {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  };
```
- Example tsx code to apply dark mode theme.
```ts
<h2 className="dark:text-white">Hello</h2>
```
- Here initial color of text is black but in dark mode `dark` class gets added to html and color of the text turns white.
- Refer to [Tailwind Documentation on dark mode](https://tailwindcss.com/docs/dark-mode) for more detailed information.


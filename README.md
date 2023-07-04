![Logo](https://github.com/Deadreyo/SemiColon-dashboard-frontend/blob/main/src/assets/Landing_black.png)
# SemiColon-dashboard-frontend
A dashboard frontend for Semicolon - a student activity in Ain Shams University.
## Features
A pie chart to show the number of participants applied for each track.
![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/88740389-5efe-4bc8-b2b4-54c63a9deef4)

Bar charts for showing number of participants applied each day and their year in school.
![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/6790ffab-a679-4332-acc9-22f350675eb6)

All Charts were generated using ChartJS.

A section that shows number of participants applied for each track and their total number.
![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/8bd195e0-9cb9-48fe-b568-3e61e8f5922c)

A participants page to show each user's data with the ability to search within them using their name or phone, choose the participants applied in a specific track, or choose the participants with a certain state (accepted, rejected, filtered, emailed, ...).
![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/f2d804c9-5aec-4d5f-9674-b7d723c42539)

## Design Choices

### UI Components
We chose some basic UI components to use throughout the design of other componenst, such as a basic Card component that can have some design defaults such as a ```max-width: 80%``` or a basic background color, a 
Button component, a DropDown menu component, an InputBar component, a StackedBtn component for the mobile navbar, and a Header component that renders different headers depending on what is the role of the signed in member.

![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/87c69b23-08f9-4759-bf88-96fe8d8104ef)

### Chosen UI
![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/d76db1ad-3020-4581-804b-aa180b7efaa1)

![image](https://github.com/Deadreyo/SemiColon-dashboard-frontend/assets/71796506/87b4c691-5fbb-4aac-82d4-c9ccbff74579)

### Data Handling
We are using React-Context and axios to handle fetching data from the backend on the ```/getAll``` API to fetch all participants data and handle them only once in the frontend to prevent backend abuse. We are also authenticating user before sending a fetch request to the backend to prevent trying to fetch without having the required token.

The context provides the following type
```ts
interface DataCtxTypes {
  data: Participant[]
  fetchData: () => Promise<void>
}
```

### Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| Background | ![#0f0f14](https://via.placeholder.com/10/0f0f14?text=+) #0f0f14 |
| Card | ![#f5f5f5](https://via.placeholder.com/10/f5f5f5?text=+) #f5f5f5 |
| Accept button | ![#008000](https://via.placeholder.com/10/008000?text=+) #008000 |
| Reject button | ![#ac0f0f](https://via.placeholder.com/10/ac0f0f?text=+) #ac0f0f |

## Run Locally

Clone the project

```bash
  git clone https://github.com/Deadreyo/SemiColon-dashboard-frontend.git
```

Go to the project directory

```bash
  cd SemiColon-dashboard-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Authors

- [@bobo122b](https://github.com/bobo122b)
- [@Deadreyo](https://github.com/Deadreyo)
- [@Chady00](https://github.com/Chady00)
- [@Ahmed-Khaled24](https://github.com/Ahmed-Khaled24)
- [@Ofahmy143](https://github.com/Ofahmy143)

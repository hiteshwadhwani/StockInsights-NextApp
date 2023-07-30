
# StockInsights

Indian public companies have to regularly update any corporate event that has a high impact on their business, or the company’s shareholders to the stock exchanges such as BSE/NSE. For example, if a company gets a new contract or if the company gets new management, it should be announced to the stock exchanges. The BSE website displays every announcement sent by every company on its announcements page. Retail Investors can track the announcements of the stocks they are interested in through these announcements.Investor can hit your API endpoints &  get the announcement details of  details of that company. 




## Live

https://stock-insights-next-app.vercel.app/


## Tech Stack

TypeScript, Next.js, Prisma (ORM), MongoDB (database), chai and mocha (Testing)


## Run Locally

Clone the project

```bash
  https://github.com/hiteshwadhwani/StockInsights-NextApp.git
```

Go to the project directory

```bash
  cd StockInsights-NextApp
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL` - you will get this url from mongodb atlas
## API Reference

base url - https://stock-insights-next-app.vercel.app | http://localhost:3000


#### Get announcements
```http
  GET /api/announcement/:id
  GET /api/announcement/:id?start={start}&end={end}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. SCRIP_CD |
| `start` | `string` | **optional**. start date |
| `end` | `string` | **optional**. end date |

#### Get announcements of multiple companies
```http
  POST /api/announcement
  POST /api/announcement/?start={start}&end={end}
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ids` | `array` | array of SCRIP_CD |

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start` | `string` |  start date |
| `end` | `string` | end date |


#### Get announcements between start date and end date
```http
  GET /api/announcement/?start={start}&end={end}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start` | `string` |  start date |
| `end` | `string` |  end date |


#### Get critical announcements
```http
  GET /api/announcement/critical
  GET /api/announcement/critical?start={start}&end={end}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start` | `string` | **optional**. start date |
| `end` | `string` | **optional**. end date |


#### Get critical announcements of specified companies
```http
  POST /api/announcement/critical
  POST /api/announcement/critical?start={start}&end={end}
```

| body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `ids` | `array` | array of SCRIP_CD |


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `start` | `string` | **optional**. start date |
| `end` | `string` | **optional**. end date |


#### Get recent announcements (within 1-2 days)
```http
  GET /api/announcement/recent
```




## Running Tests

To run tests, run the following command

```bash
  npm run dev
```

```bash
  npm run test
```


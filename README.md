# FailWatch 
 
## Objective:  Design and Implement an Alerting System for Monitoring Failed POST Requests


* Monitors a specific POST endpoint (e.g., `/api/submit`) for failed requests
caused by invalid headers or an incorrect access token.
* Tracks the number of invalid requests from each IP address within a
configurable time window (e.g., 10 minutes).
* Triggers alerts through notification channels like (e.g., email) when a threshold
of failed attempts (e.g., 5 attempts) from the same IP is exceeded, using
Google's SMTP server to send the emails.
* Logs and stores metrics for failed requests, such as the source IP, timestamp,
and reason for failure, in a database for further analysis.
* Expose an endpoint to fetch metrics.

---

### Installation:

1. Clone the repository
    ```sh
    git clone http://github.com/sujansuja/failwatch.git
    ```

2. Get into the project folder:
    ```sh
    cd failwatch
    ```

3. Install the dependencies:
    ```sh
    pnpm install
    ```

### Usage
1. Set Environment Variables:
- `PORT`: Port number (Default 4000)
- `MONGODB_URI`: MongoDB Server URI
- `SMTP_EMAIL`: SMTP email
- `SMTP_PASSWORD`: SMTP password
- `ALERT_EMAIL`: Email to which alerts will be sent
- `ACCESS_TOKEN_SECRET`: Secret key to sign JWT

</br>

2. Start the server using:
    ```sh
    pnpm run start
    ```
---
### Project Structure:
```
├── src/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── package.json
├── pnpm-lock.yaml
└── README.md
└── server.js
```

---
### Working

Depending on the use case, we can either monitor using middleware for the entire express app or middleware just for a specific endpoint (eg: `/api/submit`). To showcase this, both the ways have been implemented. For `/api/submit`, both middlewares i.e., checking `Content-Type` Header and Validating JWT has been implemented, which are written in seperate functions. For `/api/add`, only middleware for checking `Content-Type` Header has been implemented.

---

### Routes

Endpoint | HTTP Method | Function |
|---|---|---|
| `/api/submit` | POST | Request with both Middlewares handling Content-Type Header and JWT validation |
| `/api/add` | POST | Request with middleware to handle just JWT validation |
| `/api/metrics` | GET | To get all the metrics for failed POST requests |
| `/api/token` | GET | To generate a JWT for testing |

---
### Dependencies
| Package Name | Usage |
|---|---|
| [`nodemailer`](https://nodemailer.com/)| To send alert emails using Google's SMTP server |
| [`express`](https://www.npmjs.com/package/express) | To create a server |
| [`mongoose`](https://www.npmjs.com/package/mongoose) | To connect to a MongoDB Server |
| [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) | To sign and verify JWT |
| [`dotenv`](https://www.npmjs.com/package/dotenv) | To load environment variables from a `.env` |


### Additional
To get IP Address of client:

1. `x-forwarded-for` Header
2. `request.ip` in request object (used in this project)
2. `request.socket.remoteAddress` in request object
3.  `request.connection.remoteAddress`(deprecated) if node version < 13

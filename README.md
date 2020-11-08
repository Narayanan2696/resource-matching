# Resource matching

Match the skill level and availability of an employee for a project and it's respective task

## Repository Overview

- Backend APIs and algorithm for resource-matching, using NoSQL MondoDB to manipulate and process the data

## Prerequisites

1. npm version >= 6.14.4
2. node version >= v12.16.3
3. MongoDB shell version >= v4.2.6

## Setup

### Local:-

**STEP-1:** Clone the repository and switch to main branch

```
git clone https://github.com/Narayanan2696/resource-matching.git
```

**STEP-2:** Create a **.env** file under the root folder and configure it as below (change the variable values as per requirements)

```
PORT=5002
DATABASE_URL=mongodb://localhost/resource-matching
```

**STEP-3:** Install the required packages from **package.json**

```
npm install
```

**STEP-4:** Start the server

```
  npm run dev
```

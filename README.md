# Damage reporting tool
 a simple http server for handling reports.
 

## Structure:
### 1. router.js
- Manages client requests and directs them to the appropriate action.

### 2. controller.js
- Implementing a set of methods dedicated to handling damage reporting requests.

### 3. repository.js
- Implements actions related to database operations, including retrieving and storing data.

### 4. DB.json
- A collection of dictionaries, where each dictionary represents an individual damage report.

## Installation
1. **Clone Repository:**
- Clone this repository to your local machine using the following command:
  ```
  git clone https://github.com/ronyzrihen/damage-reporting-tool.git
  ```

2. **Install Dependencies:**
    - Ensure all required dependencies are installed. You can do this by running:
      ```
      npm install
      ```
      This command will automatically install the necessary dependencies.

## Usage
each report in the database by default consists of three keys 
1. **id**
2. **type**
3. **description**

### the server is capable of handling the following request:
**get all reports:**
```
http://localhost:3000/reports
```
**getting a report by ID:**
```
http://localhost:3000/reports/1
```
or
```
http://localhost:3000/reports/?id=1
```

**creating new report with a POST request:**
```
http://localhost:3000
```
body example:
```
{
    "type":"Volcano",
    "description":"THE FLOOR IS LAVA!!! IT WAS A BLAST!",
    "id":"3"
}
````
**and updating with a PUT request:**
```
http://localhost:3000/reports/1
```

## Postman Documentation:

Explore the detailed API documentation using [Postman](https://documenter.getpostman.com/view/32069376/2s9YypGPci).

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/32069376-2s9YypGPci)



<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

# endpoint-testing-mini
Endpoint Testing - ( Postman )

# Project Summary


In this mini-project, we will learn about the basics of endpoint testing using Postman. Postman is a REST client that we will be making HTTP requests from. We will learn how to write Postman tests for the responses from the HTTP requests.

Postman docs: https://www.getpostman.com/docs/postman/scripts/test_scripts

## Step 1

* Run `npm install` in the terminal to install dependencies.
* Run `nodemon` in the terminal. The package.json file has already been configured to run the server file on the execution of the `nodemon` command.

## Step 2

### Summary

We will import a collection of requests to Postman.

### Instructions

* Open Postman.
* Click on the `import` button located in the top left corner of Postman.
  * The file you are importing is inside of the `postman_collection` folder in this repo.
* After importing, you should have a collection called `Endpoint Testing Mini Project`. If you click on it, the list of requests should expand/close.

## Step 3

* Run `nodemon` in the terminal. Do not change the port from 4000. All the requests in the collections are set up with port 4000.

## Step 4

### Summary

In this step we will learn how to write Postman endpoint tests that are specific to each request in the `Endpoint Testing Mini Project` collection.

### Instructions

GET - All Students

* Click on the first request from the collection `GET - All Students`. When you click the blue `Send` button you should see all the student data in the `Body` tab.

* Click on the `Tests` tab under the request url. We will write our Postman tests here (specific to this request). 

**TESTS:**
* Status code should be 200.
    * We need to test that the status code is 200. This is how we will structure a Postman test:
    ```
    pm.test('Description of the test', function() {
        // Here we can test specifics of the response
    })
    ```
    * To test the status code, we will use: `pm.response.to.have.status(200)`
    * In the `Tests` tab, let's type the following:
    ```
    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });
    ```
    * Click on the `Send` button and check the `Test Results` tab. You should see one passing test.

    * Next we are going to test that all student objects got returned. For now, we will just test the length of the response. In order to compare two values to one another, we will use: 
    ```
    pm.test('All 20 student objects in response', function() {
        pm.expect( [value recieved] ).to.eql( [value expected] )
    })
    ```
    * In order to test the data of the response, we will need to parse it first. On line 1, type: `const response = pm.response.json()`. Now we can test that the length of the response is equal to 20.
        <details>
        <summary><code>Solution</code></summary>

        ```
        const response = pm.response.json();

        pm.test("Status code is 200", function () {
            pm.response.to.have.status(200);
        });

        pm.test('All 20 student objects in response', function() {
            pm.expect(response.length).to.eql(20);        
        })
        ```
        </details>

GET - Students By Id

* Response: Array of 1 student object. ID sent as url param.

*Test for the following:*
* Status code should be 200
* The response should include the following student object: 
    ```
    {
        "id": 9,
        "student": "Patsy Daunay",
        "email_address": "pdaunay8@about.com",
        "phone": "(806) 2654555",
        "current_grade": "A"
    }
    ```
* There are multiple ways to check if the student object above matches the data in the response, but we will use: `pm.expect( [student object above].to.eql( [student object in response] ) )`
    * `.to.eql()` will recursively check every field in an object. It does not use `===` to check for exact equality.
    <details>
    <summary><code>Solution</code></summary>

    ```
    const response = pm.response.json();
    const student9 = {
            "id": 9,
            "student": "Patsy Daunay",
            "email_address": "pdaunay8@about.com",
            "phone": "(806) 2654555",
            "current_grade": "A"
        }

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test('Correct object in response for ID 9', function() {
        pm.expect(student9).to.eql(response[0])
    })
    ```
    </details>

GET - Students By Name

Response: Will return any students whose name contains/matches the string of letters sent in the query.

*Test for the following:*
* Status code is 200.
* `Abey Laynard`'s student object was returned.
    * By searching names with the letters 'la', Abey Laynard's student object should have been returned. Make sure that happened.
        <details>
        <summary><code>Solution</code></summary>

        ```
        const res = pm.response.json();

        pm.test("Status code is 200", function () {
            pm.response.to.have.status(200);
        });

        pm.test('Abey Laynard student object in response', function() {
            let abeyObject = false;
            res.map( obj => {
                if (obj.student === 'Abey Laynard') abeyObject = true;
            })
            pm.expect(abeyObject).to.eql(true);
        })
        ```
        </details>

GET - Students By Grade

* Response: Returns all students whose grade matches query parameter.

*Test for the following:*

* Status code should be 200.
* Verify that all student objects returned have a `C` grade ('c' was sent in the url, if this changes, you must change your test).

    <details>
    <summary><code>Solution</code></summary>

    ```
    const res = pm.response.json();

    pm.test("Status code is 200", function () {
        pm.response.to.have.status(200);
    });

    pm.test('Correct students returned for "C" grade', function() {
        let allHaveC = true;
        res.map( obj => {
            if (obj.current_grade !== 'C') allHaveC = false;
        })
        pm.expect(allHaveC).to.eql(true);
    })
    ```
    </details>

GET - Students By Email
* Response: All students whose email contains the letters sent.

*Test for the following:*
* Status code should be 200.
* Given the search string, 'gdee@clickbank.net', Grilbert De Gouy's student object should be the only object in the response array.
    * Length of reponse should be 1.
    * Make sure the object in response matches:
    ```
    {
        "id": 15,
        "student": "Gilbert De Gouy",
        "email_address": "gdee@clickbank.net",
        "phone": "(615) 2408518",
        "current_grade": "B"
    }
    ```

<details>
<summary><code>Solution</code></summary>

```
let res = pm.response.json();
let gilbert = {
    "id": 15,
    "student": "Gilbert De Gouy",
    "email_address": "gdee@clickbank.net",
    "phone": "(615) 2408518",
    "current_grade": "B"
}

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Gilbert\'s student object in repsonse', function() {
    pm.expect(res.length).to.eql(1);
    pm.expect(res[0]).to.eql(gilbert)
})
```
</details>


Get - Students By Phone

* Response: All students whose phone number contains numbers sent in query parameter.

*Test for the following:*

* Status code is 200.
* All objects returned contain the numbers 608, in that order.

<details>
<summary><code>Solution</code></summary>

```
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("All objects contain '608'", function() {
    let contains608 = true;
    res.map( obj => {
        if (!obj.phone.includes('608')) contains608 = false;
    })
    pm.expect(contains608).to.eql(true);
})
```
</details>

PUT - Update Grade

* Response: Student's object whose grade was updated.

*Test for the following:*

* Status code should be 200.
* Student's grade should have been updated to "A-"

<details>
<summary><code>Solution</code></summary>

```
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Grade should have been updated to "A-" for user 15', function() {
    pm.expect(res[0].current_grade).to.eql("A-");
})
```
</details>

POST - Add Student

* Response: Returns the new student that was created.

*Test for the following:*

* Status code should be 200.
* Verify that the new user object created contains the following: 
    * Student name: '
    * Email: 'tim@homeimprovement.com'
    * Phone: '(408) 8674530'

<details>
<summary><code>Solution</code></summary>

```
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Tim Allen added as student', function() {

    let newStudentName = 'Tim Allen';
    let newStudentEmail = "tim@homeimprovement.com";
    let newStudentPhone = '(408) 8674530';

    pm.expect(res[0].student).to.eql(newStudentName);
    pm.expect(res[0].email_address).to.eql(newStudentEmail);
    pm.expect(res[0].phone).to.eql(newStudentPhone);
})
```
</details>

DELETE - Remove Student

* Response: Student object that was removed.

*Test for the following:*

* Status code is 200.
* ID of object in response is `18`.

<details>
<summary><code>Solution</code></summary>

```
const res = pm.response.json();

pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test('Student w/ ID 18 removed', function() {
    pm.expect(res[0].id).to.eql(18);
})
```
</details>

## Step 5

* Restart `nodemon`.
* Run the entire collection of requests and tests.
  * Click on the right arrow next to the collection name.
  * Click the blue `Run` button. The collection runner will open.
  * Select the correct collection from the list on the left. Then click the blue button in the bottom at the bottom of the left side-menu.

You should see all of your tests passing. Make sure you restart the server every time you re-run the collection runner.
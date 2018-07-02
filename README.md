<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we will learn the basics of endpoint testing using Postman. Postman is a REST client that we will be making HTTP requests from. We will learn how to write Postman tests for the responses from the HTTP requests. You can read more information about Postman tests by <a href="https://www.getpostman.com/docs/postman/scripts/test_scripts">clicking here.</a>

## Setup

* `fork` and `clone` this repository.
* `cd` into the root of the project.
* Run `npm install` to get the project dependencies.
* Run `nodemon`.

## Step 1

### Summary

In this step, we will import a collection of requests to Postman.

### Instructions

* Open Postman.
* Click on the `import` button located in the top left corner of Postman.
  * The file you are importing is inside of the `postman_collection` folder in this repo.
* After importing, you should have a collection called `Endpoint Testing Mini Project`. If you click on it, the list of requests should expand/close.

## Step 2

### Summary

In this step, we will create a Postman test for fetching all students.

### Instructions

* Click on the first request from the collection `GET - All Students`.
  * When you click the blue `Send` button you should see all the student data in the `Body` tab.
* Click on the `Tests` tab under the request url.
* Create a test that checks that the status code is `200`.
* Create a test that checks that 20 students are returned.
* Click on `Send` again to see if your tests pass or fail.

### Solution

<details>

<summary> <code> GET - All Students </code> </summary>

```js
const response = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("All 20 student objects in response", function() {
  pm.expect(response.length).to.eql(20);
});
```

</details>

<br />

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/1g.gif" />

## Step 3

### Summary

In this step, we will create a Postman test for fetching students by ID.

### Instructions

* Click on the second request from the collection `GET - Student by Id`.
* Click the `Send` button.
  * You should see only the student data for the student with the id of `9`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that student `9` has the following information:
  * `id` equal to `9`.
  * `student` equal to `"Patsy Daunay"`.
  * `email_address` equal to `"pdaunay8@about.com"`.
  * `phone` equal to `"(806) 2654555"`.
  * `current_grade` equal to `A`.

### Solution

<details>

<summary> <code> GET - Student by Id </code> </summary>

```js
const response = pm.response.json();
const student9 = {
  id: 9,
  student: "Patsy Daunay",
  email_address: "pdaunay8@about.com",
  phone: "(806) 2654555",
  current_grade: "A"
};

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Correct object in response for ID 9", function() {
  pm.expect(response).to.eql(student9);
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/2.png" />

## Step 4

### Summary

In this step, we will create a Postman test for fetching students by email.

### Instructions

* Click on the third request from the collection `GET - Students by Email`.
* Click the `Send` button.
  * You should see the student who's email equals `gdee@clickbank.net`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that the student's email is equal to `gdee@clickbank.net`.

### Solution

<details>

<summary> <code> GET - Student by Email </code> </summary>

```js
let response = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Gilbert's student object in response", function() {
  pm.expect(response.email).to.eql("gdee@clickbank.net");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/5.png" />

## Step 5

### Summary

In this step, we will create a Postman test for fetching students by name.

### Instructions

* Click on the fourth request from the collection `GET - Students by Name`
* Click the `Send` button.
  * You should see only the student data where their name contains `la`.
* Create a test that checks that the status code is `200`.
* Create a test that checks `Abey Laynard` appears in the results.

### Solution

<details>

<summary> <code> GET - Students by Name </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Abey Laynard student object in response", function() {
  const studentExists = response.some(
    student => student.student === "Abey Laynard"
  );
  pm.expect(studentExists).to.be.true;
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/3.png" />

## Step 6

### Summary

In this step, we will create a Postman test for fetching students by grade.

### Instructions

* Click on the fifth request from the collection `GET - Students by Grade`.
* Click the `Send` button.
  * You should see only the student data where their grade equals `C`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that all returned students have a grade of `C`.

### Solution

<details>

<summary> <code> GET - Students by Grade </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test('Correct students returned for "C" grade', function() {
  const correctGrades = response.every(
    student => student.current_grade === "C"
  );
  pm.expect(correctGrades).to.be.true;
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/4.png" />

## Step 7

### Summary

In this step, we will create a Postman test for fetching students by phone.

### Instructions

* Click on the sixth request from the collection `GET - Students by Phone`.
* Click the `Send` button.
  * You should see only the student data where their phone contains `608`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that all returned students have a `phone` property that contains `608`.

### Solution

<details>

<summary> <code> GET - Students by Phone </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("All objects contain '608'", function() {
  const checkPhoneNumbers = response.every(student =>
    student.phone.includes("608")
  );
  pm.expect(checkPhoneNumbers).to.be.true;
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/6.png" />

## Step 8

### Summary

In this step, we will create a Postman test for updating a student's grade.

### Instructions

* Click on the seventh request from the collection `PUT - Update Grade`.
* Click the `Send` button.
  * You should see the student data where the `id` equals `15` and the `grade` equals `A-`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that the id is equal to `15`.
* Create a test that checks that returned data has a `grade` of `A-`.

### Solution

<details>

<summary> <code> PUT - Update Grade </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Returns student with correct Id", function() {
  pm.expect(response.id).to.eql(15);
});

pm.test("Correctly updates grade to A-", function() {
  pm.expect(response.current_grade).to.eql("A-");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/7.png" />

## Step 9

### Summary

In this step, we will create a Postman test for adding a new student.

### Instructions

* Click on the eighth request from the collection `POST - Add Student`.
* Click the `Send` button.
  * You should see student data for a student with an `id` created by the server and properties that match the data sent in the body.
* Create a test that checks that the status code is `200`.
* Create a test that checks the student has an `id`.
* Create a test that checks if the student matches the expected schema.
  * [TinyValidator for JSON data](https://www.getpostman.com/docs/v6/postman/scripts/test_examples)
  * [json-schema](http://json-schema.org/examples.html)
* Create a test that checks that student has the following information:
  * `student` equal to `"Tim Allen"`.
  * `email_address` equal to `"tim@homeimprovement.com"`.
  * `phone` equal to `"(408) 8674530"`.

### Solution

<details>

<summary> <code> POST - Add Student </code> </summary>

```js
const res = pm.response.json();

const schema = {
  title: "Student",
  type: "object",
  properties: {
    id: {
      type: "integer"
    },
    student: {
      type: "string"
    },
    email_address: {
      type: "string"
    },
    phone: {
      type: "string"
    },
    current_grade: {
      type: "string"
    }
  },
  required: ["id", "student", "email_address", "phone", "current_grade"]
};

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Student was created", function() {
  pm.expect(response.id).to.exist;
});

pm.test("Student should match schema", function() {
  pm.expect(tv4.validate(response, schema)).to.be.true;
});

pm.test("Student has correct information", function() {
  pm.expect(res.student).to.eql("Tim Allen");
  pm.expect(res.email_address).to.eql("tim@homeimprovement.com");
  pm.expect(res.phone).to.eql("(408) 8674530");
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/8.png" />

## Step 10

### Summary

In this step, we will create a Postman test for removing a student.

### Instructions

* Click on the ninth request from the collection `DELETE - Remove Student`.
* Click the `Send` button.
  * You should see the student data of the student with the `id` of `18`.
* Create a test that checks that the status code is `200`.
* Create a test that checks that the return student `id` is equal to `18`.

### Solution

<details>

<summary> <code> DELETE - Remove Student </code> </summary>

```js
const res = pm.response.json();

pm.test("Status code is 200", function() {
  pm.response.to.have.status(200);
});

pm.test("Student w/ ID 18 removed", function() {
  pm.expect(res.id).to.eql(18);
});
```

</details>

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/9-1.png" />

## Step 11

### Summary

In this step, we'll restart our node server to get the default data set. We'll then run the entire postman collection to see them all pass as a whole.

### Instructions

* Click on the right arrow next to the collection name.
* Click the blue `Run` button.
* Select the `Endpoint Testing Mini Project` collection.
* Click the blue `Run Endpoint..` button.

### Solution

<img src="https://github.com/DevMountain/endpoint-testing-mini/blob/master/readme-assets/10.png" />

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>

# Ignite NodeJs course

I completed the rocketseat node ignite course, where I developed some projects focused on the backend part

The main projects were a Rest API for car rental management and a serverless application to generate course completion certificates.



### Rental Car API (path in repo: typescript)

In the car rental management API, I learned a lot when importing, processing and uploading ".CSV" files and image files, I also worked with user authentication, managing dates, images, sending emails, among other things.
The project structure was made using use cases, with tests and a swagger for documentation.

The main libs and tools I used in these projects was:

* Express
* Typescript
* TypeORM
* Postgres
* Redis
* AWS-SDK
* S3
* nodemailer
* multer

### Screen

authentication request and your response
<img width="1078" alt="Screen Shot 2022-05-28 at 08 02 14" src="https://user-images.githubusercontent.com/54275445/170822689-426646b4-e743-47a6-b4f6-9548bb1d4494.png">





### Generate certificate serverless (path in repo: certificateignite)

in this project I developed a serverless application that generates a .pdf with a course completion certificate, it has two functions that literally generate and another one obtains the certificate, the deployment was done in the aws-lambda of both functions

The main libs and tools I used in these projects was:

* Typescript
* DynamoDB
* AWS-SDK
* handlebars
* S3

### Screen

certificate view after generated and saved in a bucket on amazon
<img width="1504" alt="Screen Shot 2022-05-28 at 08 04 22" src="https://user-images.githubusercontent.com/54275445/170822788-b17f7aec-7880-4224-a1a0-40cb9f159ef4.png">

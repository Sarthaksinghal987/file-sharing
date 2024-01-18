#File Sharing Application Description

Developed a robust, secure, and highly efficient full-stack file-sharing application using a combination of technologies, including HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. The primary goal of this project was to create a user-friendly interface that facilitated file uploads and downloads while also integrating an email sharing feature to enhance user collaboration and productivity.

Step into an immersive welcome experience where the application seamlessly blends registration and login features. Navigate through intuitively crafted pages that effortlessly discern between new and existing users. Upon registration, unlock the gateway to the application with a secure login, governed by the authentication and authorization process of Jsonwebtoken. Elevate your user journey with a harmonious fusion of simplicity and robust security.

The application's core functionality allows users to upload files through a user-friendly drag-and-drop interface or by selecting files from their local devices. These files undergo a rigorous validation process to ensure that multiple file sharing is restricted, and file sizes do not exceed the 100 MB limit. Upon successful validation, the application initiates the file upload process, providing users with a visual representation of the upload progress through a dynamic progress bar. In the event of any upload errors, the system promptly notifies the user. Otherwise, the file is successfully uploaded.

Once the upload process is complete, the application generates a unique download link for the file, employing the UUID package to ensure the uniqueness of each link. This package generates a 36-character alphanumeric string to uniquely identify each file.

For secure and efficient file storage, I opted for MongoDB Atlas, a cloud-based database solution that offers robust data storage capabilities and ensured the secure storage of uploaded files. Additionally, the application grants users the ability to share download links via email to specified recipients. It employs a safeguard that prevents the same email from being sent to a recipient more than once. To manage email services, the application relies on the Node Mailer transporter and the SMTP protocol to facilitate efficient and reliable email communication.

This project represents an important achievement, providing a secure, professionally crafted, and efficient file-sharing platform with integrated email sharing capabilities. It significantly improved user collaboration and productivity.


//File Sharing Explaination

STEP 1 : OPENING OF PROJECT
         
         When we open the project than welcome page get render in which new user get an interface to register and then login using the credentials. 
         Registration : To register user has to provide a user name, email id, and password and then click on register button
         Login : To login in the file sharing app, user has to provide email and password and then click on login button

STEP 2 : Registration sucessful

         When a new user provides the necessary details and click on sign up button for registration then /register route get requested as post request. At /register route the details of user i.e. email id, user name, and password get fetched and validate for user email id exist in our database or not.
         
         CASE 1 : If user is a new user : Then  an instance of user get created with provided email id, password and user name get created. 
                                          --> The password of user get converted into an encrypted form using generate hash function of user instance, where bcrypt a nodejs package is use to encrypt the password and generate a hashed value. It utilizes the Blowfish encryption algorithm to expand the password and salt into an internal key setup, performing multiple iterations to create a hashed value of password. 
                                          --> Then JWT token is generated for the user by using the generate token function of user instance, where jsonwebtoken a nodejs package is use to generate a new token for the user. JSON Web Token (JWT) is used for authentication and authorization purposes in web development. JWTs consist of three parts: a header(details about JWT) specifying the type and signing algorithm, a payload(details about the user) containing claims or statements about the user, and a signature(Secret key of server) to verify the integrity of the token. JWT Token = (header.payload.signature).

                                          --> The above generated jwt token is stored ina cookies of web server and everytime user wants to access the data from server, the server verifies the user based on the secret key in the token stored by the cookie. The expiration time of jwt token for our project is 10 minutes. Cookie is a small bit of information that travels from a browser to the web server. The data in cookie is stored as key value pair. cookie['jwt']=string(generated jwt token). Size of cookie is limited to 4kb.

                                          After setting all that user get saved in our database and we get redirect to success page showing message of sucessfully registed and provided with a login button.
        
         CASE 2 : If user is not a new user it is an existing user : Then it get redirected to a page containing message of already registed and provided with a login button.

STEP 3 : Login user

         When user get sucessfully registered, fill out the details on login page and click on login button then post request is send at /login route. At /login route, details provided by user i.e. email id and password get fetched out and validates for user exists or not.

         CASE 1 : If email does not exist : Then it get redirected to a page showing invalid credentials and provided the login button to user and asked the user to login again.
  
         CASE 2 : If email exists : Then password of user get validate. The password provided by user get hashed by using bcrypt function and matches with existing password in database.
      
                  CASE 1 : If password donot matches : If the hash of provided password donot matches with stored hash in database, then user get redirect back to login page showing invalid credentials.

                  CASE 2 : If password matches : 

                                          --> Then jwt token get generated for the user.
                              
                                          --> The generated token is stored in cookies for further authentication and authorization

                                          After setting all that user get rediect to lets begin page provied with a button that redirect the user to our application on clicking.

STEP 4 : LETS GET STARTED 

         This Page consists of a button of lets get started. When it get clicked then a get request is made on home page of our application and user get redirected to Inshare file share application. Now before the get request get redirect, the jwt tokens get verifed. Jwt token get fetched from the cookies. If jwt token get expired or wrong token get parsed then user get redirect back to welcome page otherwise user get redirect to home page successfully.

STEP 5 : WORKING OF APPLICATION

         //DONE

STEP 6 : LOGOUT
     
         The home page contatins a logout button. When it get clicked then a get request is made on welcome page of our application and user get redirected to the welcome page and token stored in the cookies as key 'jwt' get cleared.

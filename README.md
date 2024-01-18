#File Sharing Application

Developed a robust, secure, and highly efficient full-stack file-sharing application using a combination of technologies, including HTML, CSS, JavaScript, Node.js, Express.js, and MongoDB. The primary goal of this project was to create a user-friendly interface that facilitated file uploads and downloads while also integrating an email sharing feature to enhance user collaboration and productivity.

Step into an immersive welcome experience where the application seamlessly blends registration and login features. Navigate through intuitively crafted pages that effortlessly discern between new and existing users. Upon registration, unlock the gateway to the application with a secure login, governed by the authentication and authorization process of Jsonwebtoken. Elevate your user journey with a harmonious fusion of simplicity and robust security.

The application's core functionality allows users to upload files through a user-friendly drag-and-drop interface or by selecting files from their local devices. These files undergo a rigorous validation process to ensure that multiple file sharing is restricted, and file sizes do not exceed the 100 MB limit. Upon successful validation, the application initiates the file upload process, providing users with a visual representation of the upload progress through a dynamic progress bar. In the event of any upload errors, the system promptly notifies the user. Otherwise, the file is successfully uploaded.

Once the upload process is complete, the application generates a unique download link for the file, employing the UUID package to ensure the uniqueness of each link. This package generates a 36-character alphanumeric string to uniquely identify each file.

For secure and efficient file storage, I opted for MongoDB Atlas, a cloud-based database solution that offers robust data storage capabilities and ensured the secure storage of uploaded files. Additionally, the application grants users the ability to share download links via email to specified recipients. It employs a safeguard that prevents the same email from being sent to a recipient more than once. To manage email services, the application relies on the Node Mailer transporter and the SMTP protocol to facilitate efficient and reliable email communication.

This project represents an important achievement, providing a secure, professionally crafted, and efficient file-sharing platform with integrated email sharing capabilities. It significantly improved user collaboration and productivity.

import React from "react";

const HelpComponent = () => {
  return (
    <div className="grid-container usa-prose">
      <h2 className="usa-heading">Help Center</h2>

      <section>
        <h3>Introduction</h3>
        <h4>Welcome Message</h4>
        <p>Welcome to our platform! We're glad to have you here.</p>
        <h4>Navigation Tips</h4>
        <p>Use the menu and search bar at the top to explore the platform.</p>
      </section>

      <section>
        <h3>Getting Started</h3>
        <h4>Account Creation</h4>
        <ol>
          <li>Click on the "Sign Up" button on the homepage.</li>
          <li>Fill in your personal details (name, email, password).</li>
          <li>Verify your email address by clicking on the link sent to your inbox.</li>
          <li>Log in with your new credentials.</li>
        </ol>
      </section>

      <section>
        <h3>Login / Logout</h3>
        <p><strong>Login:</strong> Enter your email and password on the login page and click "Login".</p>
        <p><strong>Logout:</strong> Click on your profile icon and select "Logout" from the dropdown menu.</p>
      </section>

      <section>
        <h3>Password Recovery</h3>
        <ol>
          <li>Click on "Forgot Password" on the login page.</li>
          <li>Enter your registered email address.</li>
          <li>Follow the instructions sent to your email to reset your password.</li>
        </ol>
      </section>

      <section>
        <h3>Website Navigation</h3>
        <h4>Homepage Overview</h4>
        <p>The homepage includes a header with navigation links, a hero section, and key features.</p>
        <h4>Menu Navigation</h4>
        <p>Navigate through links like Home, Upload, My Files, etc. Submenus may appear on hover or click.</p>
        <h4>Search Functionality</h4>
        <p>Use the top search bar to locate files or content using keywords.</p>
      </section>

      <section>
        <h3>User Profile</h3>
        <h4>Profile Setup</h4>
        <ol>
          <li>Click on your profile icon and select "Edit Profile".</li>
          <li>Update information, photo, and preferences.</li>
          <li>Click "Save" to apply changes.</li>
        </ol>
        <h4>Privacy Settings</h4>
        <p>Control who can see your info via profile privacy settings.</p>
        <h4>Notifications</h4>
        <p>Manage notifications via settings page to stay updated.</p>
      </section>

      <section>
        <h3>File Management</h3>
        <h4>Uploading Files</h4>
        <ol>
          <li>Click "Upload" on the homepage or menu.</li>
          <li>Select files from your device.</li>
          <li>Click "Upload" to begin.</li>
          <li>Wait for upload confirmation.</li>
        </ol>
        <h4>Organizing Files</h4>
        <ol>
          <li>Go to "My Files".</li>
          <li>Create folders and drag/drop files.</li>
        </ol>
        <h4>Sharing Files</h4>
        <ol>
          <li>Select the file, click "Share".</li>
          <li>Choose method and set permissions.</li>
          <li>Send the share link.</li>
        </ol>
        <h4>Downloading Files</h4>
        <ol>
          <li>Navigate to the file.</li>
          <li>Click "Download" and save it.</li>
        </ol>
      </section>

      <section>
        <h3>Interacting with Other Users</h3>
        <h4>Comments and Replies</h4>
        <ol>
          <li>Go to shared file/folder and comment.</li>
          <li>Click "Reply" under others’ comments.</li>
        </ol>
        <h4>Messaging</h4>
        <ol>
          <li>Click messaging icon in header.</li>
          <li>Select user or start a new conversation.</li>
          <li>Type and click "Send".</li>
        </ol>
        <h4>Following Users</h4>
        <ol>
          <li>Visit a profile and click "Follow".</li>
          <li>Click "Unfollow" to stop following.</li>
        </ol>
      </section>

      <section>
        <h3>Troubleshooting</h3>
        <h4>Common Issues</h4>
        <ul>
          <li>File upload issues – check file size limits.</li>
          <li>File not found – check if moved/deleted.</li>
          <li>Broken sharing link – check permissions.</li>
        </ul>
        <h4>Technical Support</h4>
        <p>Visit "Contact Us" or email support@[platform].com.</p>
        <h4>FAQs</h4>
        <p>Find answers in the FAQ section.</p>
      </section>
    </div>
  );
};

export default HelpComponent;
 <h1>Invoice Generator</h1>
    <p>This is a <strong>MERN</strong> stack application that allows users to generate invoices by inputting their data. It includes customizable fields like company logo, address, itemized list, discounts, and calculates the total bill with GST. The app supports adding up to 40 items per invoice.</p>
<h2>Features</h2>
    <ul>
        <li><strong>Customizable User Data:</strong> Input fields for address, company name, and company logo.</li>
        <li><strong>Itemized List:</strong> Add up to 40 items, including product name, quantity, price, and description.</li>
        <li><strong>Discount:</strong> Add discounts to the total amount.</li>
        <li><strong>GST Calculation:</strong> Automatically calculate the total bill with GST included.</li>
        <li><strong>Invoice Generation:</strong> Generate and display the invoice in a single-page format for easy download or print.</li>
    </ul>
    <h2>Installation</h2>
    <p>Follow the steps below to set up the application locally:</p>
    <h3>Backend Setup</h3>
    <ol>
        <li><strong>Clone the Repository</strong><br>
            Open your terminal and run the following command:
            <pre><code>git clone https://github.com/avanishgupta07/Invoice-Generator.git</code></pre>
        </li>
   <li><strong>Navigate to the backend directory</strong><br>
            <pre><code>cd Invoice-Generator/backend</code></pre>
        </li>
        <li><strong>Install Backend Dependencies</strong><br>
            Make sure Node.js is installed on your system. Then run:
            <pre><code>npm install</code></pre>
        </li>
<li><strong>Start the Backend Server</strong><br>
            Run the following command to start the backend server:
            <pre><code>node app.js</code></pre>
        </li>
    </ol>
    <h3>Frontend Setup</h3>
    <ol>
        <li><strong>Navigate to the Frontend Directory</strong><br>
            Open a new terminal window or tab and run:
            <pre><code>cd Invoice-Generator/invoiceuser</code></pre>
        </li>
   <li><strong>Install Frontend Dependencies</strong><br>
            Run the following command to install the necessary packages:
            <pre><code>npm install</code></pre>
        </li>
  <li><strong>Start the Frontend Server</strong><br>
            Start the React app by running:
            <pre><code>npm start</code></pre>
        </li>
 <li><strong>Access the Application</strong><br>
            Once the frontend server is running, the app will be available at:
            <pre><code>http://localhost:3000</code></pre>
        </li>
    </ol>
  <h2>How to Use</h2>
    <ol>
        <li><strong>Input your details:</strong> Enter your company name, address, and logo in the respective fields.</li>
        <li><strong>Add Items:</strong> Fill in the product name, quantity, price, and description for each item you want to include. You can add up to 40 items.</li>
        <li><strong>Apply Discount:</strong> Add any discounts if applicable.</li>
        <li><strong>Generate Invoice:</strong> Click the "Generate Invoice" button to create your invoice. The app will calculate the total amount, including GST, and display the invoice in a printable format.</li>
    </ol>
<h2>Project Structure</h2>
    <ul>
        <li><strong>backend/</strong>: Contains the server-side code (Node.js, Express).</li>
        <li><strong>invoiceuser/</strong>: Contains the frontend code (React.js).</li>
        <li><strong>public/</strong>: Static assets like images.</li>
        <li><strong>src/</strong>: React components and logic for rendering the invoice form and handling user input.</li>
    </ul>
<h2>Technologies Used</h2>
    <ul>
<li><strong>Express.js</strong>: Backend framework.</li>
        <li><strong>React.js</strong>: Frontend framework for the user interface.</li>
        <li><strong>Node.js</strong>: Backend runtime environment.</li>
        <li><strong>CSS</strong>: Styling for the invoice page.</li>
    </ul>

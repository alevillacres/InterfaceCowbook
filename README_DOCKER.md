# Guide to Running the Application with Docker Compose

This guide explains step-by-step how to set up and start the entire application (including the Backend Server and the Frontend Client) using Docker Compose.

---

## 1. Preparing the Directory Structure

To allow Docker Compose to properly manage both projects simultaneously, they must be placed inside a common parent directory.

1. Create a new folder on your computer and name it `cowbook-project`.
2. Move the two repository folders you downloaded or cloned inside it:
   - `cowbook` (the backend/server project)
   - `InterfaceCowbook` (the frontend/client project)
3. Move (or create) the `docker-compose.yml` file directly inside the main `cowbook-project` folder, at the same level as the two project directories.

Ultimately, your folder structure must look exactly like this:

```text
cowbook-project/
├── docker-compose.yml        <-- The orchestration file
├── cowbook/                  <-- Backend folder
└── InterfaceCowbook/         <-- Frontend folder
```

## 2. Starting the Application

Once the file structure is prepared as shown above, you are ready to start the containers:

1. Open your **Terminal** (or Command Prompt/PowerShell).
2. Navigate inside the main project folder using the `cd` command:

```bash
cd path/to/your/folder/cowbook-project
```

3. Enter the following command to build the images and start the entire application:

```bash
docker-compose up --build
```
### ⚠️ Troubleshooting (Permission Denied)
If you do not have the necessary permissions configured for Docker, or if you receive a "permission denied while trying to connect to the Docker daemon socket" error, stop the operation and run the command with administrator privileges by prepending sudo:

```bash
sudo docker-compose up --build
```
4. Accessing the Application
Once the build process is complete (which may take a few minutes the first time), the application should start correctly.
You can start using the services by opening your web browser and navigating to the following addresses:

Web Interface (Frontend): http://localhost:5173

Server API (Backend): http://localhost:8000/docs (Swagger UI for testing the APIs)

To shut down the application when you are finished, simply go back to the terminal where it is running and press CTRL + C.

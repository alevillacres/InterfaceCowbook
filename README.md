# Cowbook Web Interface

The **Cowbook Web Interface** is the frontend component of the Cowbook project, designed to provide an intuitive user interface for configuring and visualizing cow tracking within a barn. The application allows users to upload video streams from multiple cameras, organize their layout, and view tracking results projected onto a 2D map.

## Application Overview

The interface is built with **React** and **TypeScript**, using **Vite** as the build tool. The design focuses on ease of use to ensure that even non-technical users can effectively manage the monitoring system.

## Key Features

### 1. Drag & Drop Configuration
The application features a video configuration system based on drag-and-drop functionality:
* **AreaDropzone**: Allows users to upload video files by simply dragging them into areas corresponding to specific cameras.
* **Camera Mapping**: Supports the configuration of a video group (up to 4) by mapping them to the actual camera IDs (1, 4, 6, 8) required by the inference server.

### 2. Safety Constraint Validation
The interface implements checks to ensure the configuration is valid before sending it to the server:
* It verifies that the necessary videos for the group have been uploaded.
* It manages configuration parameters to ensure compatibility with the inference model.

### 3. Results Visualization
Once processing is complete, the app offers several visualization modes:
* **Annotated Videos**: Creates visualizations that combine the original video with tracking annotations.
* **Frame-by-Frame Data**: Allows users to view processed data frame-by-frame for detailed analysis.

## 🛠 Technologies Used

* **React (Vite)**: The primary framework for building the user interface.
* **TypeScript**: Used for type-safe data management between the frontend and the API.
* **Tailwind CSS**: Utilized for rapid and responsive component styling.
* **Axios**: Handles API communications with the Cowbook Inference Server.

## Server Communication

The interface acts as a client for the **Cowbook Inference Server**. It sends processing requests via multipart POST endpoints, transmitting video files and user-selected camera indices, and receives model outputs in JSON format.

---
*Note: For instructions regarding containerization and running the app via Docker, please refer to the `README_DOCKER.md` (or equivalent).*

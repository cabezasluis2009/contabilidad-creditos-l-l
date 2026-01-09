# Blueprint: Firebase Image Uploader

## Overview

This application is a simple yet robust image uploader built with Next.js and Firebase. It allows users to select an image file from their local machine, compress it on the client-side, upload it to Firebase Storage, and view the uploaded image. The interface provides real-time upload progress, error handling, and a modern, clean design, all optimized for performance and cost-effectiveness.

## Project Outline

### **1. Core Functionality & Features**

*   **Client-Side Image Compression:** Images are compressed in the browser before upload to save bandwidth and storage costs.
*   **File Selection:** Users can select image files (`image/*`) from their computer.
*   **Client-Side Validation:**
    *   File type check to ensure only images are selected.
    *   File size limit (pre-compression) of 5MB.
*   **Firebase Storage Integration:**
    *   Files are uploaded to a dedicated folder structure in Firebase Storage: `users/{userId}/{fileName}`.
    *   A placeholder `userId` (`test-user-id`) is used for demonstration.
*   **Upload Process:**
    *   Real-time progress bar shows the upload percentage.
    *   The "Upload" button is disabled during an active upload.
*   **Post-Upload:**
    *   Displays the uploaded image using `next/image` for optimization.
    *   Provides a direct link to the image file in Firebase Storage.
*   **Error Handling:** Displays user-friendly error messages for common issues.

### **2. Technical Stack**

*   **Framework:** Next.js (with App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Backend:** Firebase (specifically Firebase Storage)
*   **Performance:**
    *   `browser-image-compression` for client-side optimization.
    *   `next/font` for optimized font loading.
    *   `@next/bundle-analyzer` for build analysis.
*   **Linting:** ESLint with Next.js recommended rules.

### **3. Project Structure**

(The project structure remains the same as the previous version)

### **4. Design & UI/UX**

(The design remains the same as the previous version)

## Current Plan: Optimization & Cost-Saving

**Objective:** Enhance the application to be as fast, efficient, and cost-effective as possible.

**Phase 1: Client-Side Image Compression (In Progress)**

1.  **Install Dependency:** Add `browser-image-compression` to the project.
2.  **Integrate into Upload Logic:** Modify the `handleUpload` function in `FileUpload.tsx`.
    *   Before uploading, the selected image will be passed through the compression library.
    *   Set compression options to balance quality and file size (e.g., `maxSizeMB: 1`, `maxWidthOrHeight: 1920`).
3.  **Update UI:** Add a message to inform the user that the image is being compressed before upload.

**Phase 2: Next.js Performance Enhancements**

1.  **Optimize Fonts:** Modify `app/layout.tsx` to use `next/font` for loading the application's primary font, improving Core Web Vitals.
2.  **Bundle Analysis:** Install and configure `@next/bundle-analyzer` to allow for easy visualization of the final JS bundle size, helping identify any unnecessarily large dependencies.

**Phase 3: Firebase Cost-Saving Strategies**

1.  **Secure Storage Rules:** Provide updated, more secure Firebase Storage Rules to prevent unauthorized access and potential abuse.
2.  **Lifecycle Management:** Add a section to this blueprint explaining how to configure Object Lifecycle Management in the Firebase console. This will allow for the automatic transition of older images to cheaper storage classes or their deletion, significantly reducing long-term costs.

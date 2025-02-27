async function updateCourse(courseId, updatedData) {
    try {
        const response = await fetch(`http://localhost:5000/api/update-course/${courseId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });

        const data = await response.json();
        if (data.success) {
            console.log("Course updated:", data);
        } else {
            console.error("Failed to update course:", data.message);
        }
    } catch (error) {
        console.error("Error in updating course:", error);
    }
}

// Example Usage
updateCourse("65abc123def456", { courseName: "Updated Course", Teacher: "New Teacher", isActive: true });

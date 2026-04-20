export default function CourseList({ courses, selectedCourseId, onSelect }) {
  if (!courses || courses.length === 0) {
    return <p>No courses still.</p>;
  }

  return (
    <div className="course-list">
      {courses.map((course) => (
        <button
          key={course.id}
          className={selectedCourseId === course.id ? 'course active' : 'course'}
          onClick={() => onSelect(course)}
        >
          <div>
            <strong>{course.title}</strong>
            <span>{course.code}</span>
            <small>Course ID: {course.id}</small>
          </div>
          <small>{course.facultyName}</small>
        </button>
      ))}
    </div>
  );
}

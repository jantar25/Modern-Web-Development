import Course from "./component/Course"
import { courses } from "./component/data"


const App = () => {

  return (
    <div>
      {courses.map((course)=><Course key={course.id} course={course} />)}
    </div>
  )
}

export default App
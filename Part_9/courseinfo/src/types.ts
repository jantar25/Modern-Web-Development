// interface course {
//     name: string;
//     exerciseCount:number; 
// }

export interface HeaderProps {
    name: string;
}


interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
interface newIncludesDescrition extends CoursePartBase {
    description: string;
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }


  interface CourseNormalPart extends newIncludesDescrition { 
    type: "normal";
  }
  
  
  interface CourseSubmissionPart extends newIncludesDescrition {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseSpecialPart extends newIncludesDescrition {
    type: "special";
    requirements: string[];
  }

  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

export interface courseProps {
  courseParts:CoursePart[];
}
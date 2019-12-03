export default class Project {
  constructor(projectName,deadline,remainingHours,completedHours) {
    this.projectName = projectName;
    this.deadline = deadline;
    this.remainingHours = remainingHours;
    this.completedHours = completedHours;
  }
}
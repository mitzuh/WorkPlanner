export default class Project {
  constructor(projectName,deadline,remainingHours,completedHours) {
    this.projectName = projectName;
    this.deadline = deadline;
    this.remainingHours = remainingHours;
    this.completedHours = completedHours;
  }

  addHours(hours) {
    this.completedHours = this.completedHours + hours;
    this.remainingHours = this.remainingHours - hours;
    if(this.remainingHours < 0) {
      this.remainingHours = 0;
    }
  }
}
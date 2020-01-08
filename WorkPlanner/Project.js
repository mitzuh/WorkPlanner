export default class Project {
  constructor(projectName,deadline,remainingHours,completedHours,initialHours) {
    this.projectName = projectName;
    this.deadline = deadline;
    this.remainingHours = remainingHours;
    this.completedHours = completedHours;
    this.initialHours = initialHours;
  }

  addHours(hours) {
    this.completedHours = this.completedHours + hours;
    this.remainingHours = this.remainingHours - hours;
    if(this.remainingHours < 0) {
      this.remainingHours = 0;
    }
  }
}
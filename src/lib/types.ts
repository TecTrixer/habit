export type Task = {
  description: string;
  taskId: string;
  userId: string;
};

export type Streak = {
  streakId: string;
  userId: string;
  taskId: string;
  streak: Number;
}

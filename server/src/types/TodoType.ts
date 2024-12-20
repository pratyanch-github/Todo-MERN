export interface TodoType {
  user: string;
  TodoTitle: string;
  Tasks: [
    {
      Task: string;
      isDone: boolean;
      category: string;
    }
  ];
}

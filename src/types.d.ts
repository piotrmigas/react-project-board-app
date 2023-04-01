export type ListItem = {
  id: string;
  tasks: string[];
  title: string;
  icon: string;
};

export interface List {
  [key: string]: ListItem;
}

export type TaskListItem = {
  id: string;
  list: string;
  title: string;
  content: string;
  icon: string;
};

export interface TaskList {
  [key: string]: Task;
}

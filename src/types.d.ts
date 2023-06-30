type ListItem = {
  id: string;
  tasks: string[];
  title: string;
  icon: string;
};

interface List {
  [key: string]: ListItem;
}

type TaskListItem = {
  id: string;
  list: string;
  title: string;
  content: string;
  icon: string;
};

interface TaskList {
  [key: string]: Task;
}

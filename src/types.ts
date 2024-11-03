import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export type ListItem = {
  id: string;
  tasks: string[];
  title: string;
  icon: IconDefinition;
};

export interface List {
  [key: string]: ListItem;
}

export type TaskListItem = {
  id: string;
  list: string;
  title: string;
  content: string;
  icon: IconDefinition;
};

export interface TaskList {
  [key: string]: TaskListItem;
}

export type Inputs = {
  title: string;
  content: string;
};

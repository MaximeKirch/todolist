import { Task } from '../types/TaskType';

interface filterTodosProps {
  todos: Task[];
  filter: string;
}

export const filterTodos = ({ todos, filter }: filterTodosProps) => {
  const today = new Date();

  const dayTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.due_date);
    return dueDate.toDateString() === today.toDateString();
  });

  const weekTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.due_date);
    const today = new Date();

    const startOfWeek = new Date(today);
    startOfWeek.setDate(
      today.getDate() - (today.getDay() === 0 ? 6 : today.getDay() - 1)
    );

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return (
      dueDate >= startOfWeek && dueDate <= endOfWeek && !dayTodos.includes(todo)
    );
  });

  const monthTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.due_date);
    return (
      dueDate.getMonth() === today.getMonth() &&
      dueDate.getFullYear() === today.getFullYear() &&
      !dayTodos.includes(todo) &&
      !weekTodos.includes(todo)
    );
  });

  const yearTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.due_date);
    return (
      dueDate.getFullYear() === today.getFullYear() &&
      !dayTodos.includes(todo) &&
      !weekTodos.includes(todo) &&
      !monthTodos.includes(todo)
    );
  });

  const pastTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.due_date);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dueDate < yesterday && !todo.is_complete;
  });

  // Filtrer selon le filtre sélectionné
  switch (filter) {
    case 'Today':
      return dayTodos;
    case 'Week':
      return weekTodos;
    case 'Month':
      return monthTodos;
    case 'Year':
      return yearTodos;
    case 'Past':
      return pastTodos;
    default:
      return todos;
  }
};

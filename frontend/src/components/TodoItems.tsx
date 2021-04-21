import React, { useState } from "react";
import TodoItem from "./TodoItem";

interface Props {
  todoItems: ITodo[];
  updateTodo: (todo: ITodo) => void;
  deleteTodo: (_id: string) => void;
  memes: IMemes[];
}

/* Handles the Sorting */
const useSortableData = (items: any, config = { key: "", direction: "" }) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const TodoList: React.FC<Props> = ({
  todoItems,
  updateTodo,
  deleteTodo,
  memes,
}) => {
  const { items, requestSort, sortConfig } = useSortableData(todoItems);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <React.Fragment>
      <div className="sort-btn">
        <button
          type="button"
          onClick={() => requestSort("name")}
          className={getClassNamesFor("name")}
        >
          Name
        </button>
        <button
          type="button"
          onClick={() => requestSort("updatedAt")}
          className={getClassNamesFor("updatedAt")}
        >
          Date
        </button>
      </div>
      {items.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
          todo={todo}
          memes={memes}
        />
      ))}
    </React.Fragment>
  );
};

export default TodoList;

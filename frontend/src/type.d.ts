interface ITodo {
  _id: string;
  name: string;
  status: boolean;
  updatedAt?: string;
}

interface TodoProps {
  todo: ITodo;
}

type ApiDataType = {
  message: string;
  status: string;
  updatedAt?:string;
  todos: ITodo[];
  todo?: ITodo;
};

interface IMemes {
  id: string;
  name: string;
  url: string;
}
export type Items = {
    id: string;
    title: string;
    completed: boolean;
  };
  

export type ReactSetState<T> = React.Dispatch<React.SetStateAction<T>>;
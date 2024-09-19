import './App.css';
import { ImageHeader } from './components/ImageHeader';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { useState, useEffect } from 'react';
import { Items } from './types/utils';
import { ItemList } from './components/ItemList';

function App() {
  const [items, setItems] = useState<Items[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setItems(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('todos', JSON.stringify(items));
    }
  }, [items]);
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  
    const regex = /^[a-zA-Z0-9\s!@#$%^&*(),.?":{}|<>]+$/;
  
    if (inputValue.trim() === "" || !regex.test(inputValue)) {
      alert("Only letters, numbers, and symbols are allowed.")
      return
    }
    setItems(prev => [
      ...prev,
      { title: inputValue, id: Date.now().toString(), completed: false }
    ]);
    setInputValue("")
  }

  return (
    <div className="h-[100vh] flex flex-col justify-center items-center">
      <ImageHeader />

      <div className="w-[350px]">
        <form className="mb-5" onSubmit={handleSubmit}>
          <Input
            type="text"
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
          <Button className="w-full p-2 bg-gray-700">Add</Button>
        </form>
        <div className="overflow-y-auto h-52">
          <ItemList items={items} setItems={setItems} />
        </div>
      </div>
      
    </div>
  )
}

export default App;
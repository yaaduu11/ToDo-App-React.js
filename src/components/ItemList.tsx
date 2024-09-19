import { Items } from '../types/utils';
import { useState } from 'react';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

type ItemListProps = {
  items: Items[];
  setItems: React.Dispatch<React.SetStateAction<Items[]>>;
};

export const ItemList = ({ items, setItems }: ItemListProps) => {
  const [editId, setEditId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const handleCheckboxToggle = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleEdit = (id: string) => {
    const itemToEdit = items.find(item => item.id === id);
    if (itemToEdit) {
      setEditId(id);
      setEditValue(itemToEdit.title);
    }
  };

  const handleSaveEdit = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, title: editValue } : item
      )
    );
    setEditId(null);
    setEditValue("");
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <ul>
      {items.map(item => (
        <li key={item.id} className="flex items-center justify-between mb-2">
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => handleCheckboxToggle(item.id)}
          />

          {editId === item.id ? (
            <input
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => handleSaveEdit(item.id)} 
              className="p-1 border"
            />
          ) : (
            <span className={item.completed ? "line-through" : ""}>
              {item.title}
            </span>
          )}

          <div className="flex space-x-2">
            {editId === item.id ? (
              <button
                className="p-1 text-white bg-blue-500"
                onClick={() => handleSaveEdit(item.id)}
              >
                Save
              </button>
            ) : (
              <button className="p-1" onClick={() => handleEdit(item.id)}>
                <FaPencilAlt />
              </button>
            )}

            <button className="p-1 text-red-500" onClick={() => handleDelete(item.id)}>
              <FaTrash />
            </button>
          </div>
          
        </li>
      ))}
    </ul>
  );
};
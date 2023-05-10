import { useState, useEffect } from 'react'
import './App.css'
import { IUser } from './types';
import Username from './components/Username';

const App = () => {
  const [user, setUser] = useState<IUser>({name: '', address: '', age: 0});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.currentTarget.value;

    setUser({...user, name: value});
  }

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const firstUser = data.results[0];

      setUser((prev) => {
        return {
          ...prev,
          name: firstUser.name.first,
          age: firstUser.dob.age,
          address: firstUser.location.street.name
        }
      })
    }
    getData();
  }, []);

  return (
    <>
      <Username user = {user}/>
      <input type="text" value={user.name} onChange={handleChange} />
    </>
  )
}

export default App

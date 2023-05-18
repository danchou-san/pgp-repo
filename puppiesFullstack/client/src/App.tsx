import { useEffect, useState } from 'react'
import './App.css'

interface Puppy {
  id: number;
  breed: string;
  name: string;
  birth_date: string;
}

const App = () => {
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [selectedPuppy, setSelectedPuppy] = useState<Puppy | null>(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedBreed, setEditedBreed] = useState('');
  const [editedBirthDate, setEditedBirthDate] = useState('');


  useEffect(() => {
    fetchPuppies();
  }, [puppies]);

  const fetchPuppies = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/puppies');
      const data = await res.json();
      setPuppies(data);
    } catch (err) {
      console.error('Error fetching puppies', err);
    }
  }

  const handleSelectPuppy = (puppy: Puppy) => {
    setShowEditForm(false);
    if (selectedPuppy && selectedPuppy.id === puppy.id) {
      setSelectedPuppy(null);
    } else {
      setSelectedPuppy(puppy);
    }
  }

  const handleDeletePuppy = async (puppyId: number) => {
    try {
      await fetch(`http://localhost:3000/api/puppies/${puppyId}`, {
        method: 'DELETE'
      });
      setSelectedPuppy(null);
    } catch (err) {
      console.error('Error while deleting puppy', err);
    }
  }

  const handleAddPuppy = async () => {
    try {
      await fetch(`http://localhost:3000/api/puppies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          breed: breed,
          name: name,
          birth_date: birthDate
        })
      });

    } catch (err) {
      console.error('Error while adding puppy', err);
    }
  }

  const handleEditPuppy = async (puppyId: number) => {
    try {
      const updatedPuppy = {
        ...selectedPuppy,
        breed: editedBreed,
        name: editedName,
        birth_date: editedBirthDate
      }

      await fetch(`http://localhost:3000/api/puppies/${puppyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPuppy)
      });

    } catch (err) {
      console.error('Error while editing puppy', err);
    }
  }

  const handleEditForm = () => {
    setShowEditForm(!showEditForm);
  }

  return (
    <>
      <div>
        <h1>Puppies</h1>
        {puppies.length === 0 ? (
          <p>No puppies found</p>
        ) : (
          puppies.map((puppy) => (
            <div key={puppy.id}>
              <h2 onClick={() => handleSelectPuppy(puppy)}>{puppy.name}</h2>
              {selectedPuppy && selectedPuppy.id === puppy.id && (
                <div>
                  <h3>Details</h3>
                  <p>Breed: {puppy.breed}</p>
                  <p>Birth Date: {puppy.birth_date}</p>
                  <div>
                    <button onClick={() => handleEditForm()}>Edit</button>
                    <button onClick={() => handleDeletePuppy(puppy.id)}>Delete</button>
                  </div>
                  <br />
                  {showEditForm && (
                    <div>
                      <div>
                        <label htmlFor="">Name: </label>
                        <input
                          type="text"
                          value={editedName}
                          onChange={e => setEditedName(e.target.value)}
                        />
                      </div>

                      <br/>

                      <div>
                        <label htmlFor="">Breed: </label>
                        <input
                          type="text"
                          value={editedBreed}
                          onChange={e => setEditedBreed(e.target.value)}
                        />
                      </div>

                      <br/>

                      <div>
                        <label htmlFor="">Birth Date: </label>
                        <input
                          type="text"
                          value={editedBirthDate}
                          onChange={e => setEditedBirthDate(e.target.value)}
                        />
                      </div>

                      <br />

                      <button onClick={() => handleEditPuppy(puppy.id)}>Edit Puppy</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <br />
      
      <hr/>
      <div>
        <h1>Add a puppy</h1>

        <div>
          <label htmlFor="">Name: </label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <br/>

        <div>
          <label htmlFor="">Breed: </label>
          <input
            type="text"
            value={breed}
            onChange={e => setBreed(e.target.value)}
          />
        </div>

        <br/>

        <div>
          <label htmlFor="">Birth Date: </label>
          <input
            type="text"
            value={birthDate}
            onChange={e => setBirthDate(e.target.value)}
          />
        </div>

        <br />

        <button onClick={handleAddPuppy}>Add Puppy</button>
      </div>
    </>
  )
}

export default App

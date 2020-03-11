import React, { useState } from 'react'
import UserTable from './tables/UserTables'
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {
  const usersData = [
    { id: 1, name: 'aps', username: 'rajput' },
    { id: 2, name: 'vps', username: 'rajput' },
    { id: 3, name: 'shiva', username: 'rajput' },
  ]

  const [users, setUsers] = useState(usersData)

  //Add an Entry
  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  //Delete an Entry
  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  //Edit an Entry
  const [editing, setEditing] = useState(false)
  const initialFormState = { id: null, name: '', username: '' }
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const editRow = user => {
    setEditing(true)
  
    setCurrentUser({ id: user.id, name: user.name, username: user.username })
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row" style={{display:'flex'}}>
        <div className="flex-large" style={{width:'50%'}}>
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        <div className="flex-large" style={{width:'50%'}}>
          <h2>View users</h2>
          <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  )
}

export default App
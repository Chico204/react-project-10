import React, { useState, useEffect } from 'react';
import List from './list';
import Alert from './alert';

const getLocalStorage = ()=>{
  let list = localStorage.getItem('list')
  if(list){
    return(list = JSON.parse(localStorage.getItem('list')))
  }else{
    return[]
  }
}

function App() {
  const [name, setName] = useState('')
 const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
   const [editID, setEditID] = useState(null)
    const [alert, setAlert] = useState({show:false, msg:'', type:'', })

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!name){
        showaAlert(true, 'danger' , 'please enter value')
      }else if(name && isEditing){
        setList(
          list.map((item) => {
            if (item.id === editID){
              return {...item, title:name}
            }
            return item
          })
        )
        setName('')
        setEditID(null)
        setIsEditing(false)
         showAlert(true, 'success', 'value changed');
      }else {
      showAlert(true, 'success', 'item added to the list');
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName('');
    }
 }

 const showAlert = (show = false, type ='', msg='',) =>{
  setAlert({show,type,msg})
 }
const clearList = ()=> {
  showAlert(true, 'danger' , 'item removed')
  setList(list.filter((item)=> item.id != id))
}
  const removeItem = (id) => {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  }

 useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])

 return(
  <section className='section-center shadow-lg items-center text-center p-10 m-5 md:m-40'>
    <form className='grocery-form' onSubmit={handleSubmit}>
      <h3 className='text-2xl font-bold'>Grocery Bud</h3>
      <div className='underline border-2 border-green-400 mx-30 md:mx-90'></div>
      <div className='form-control p-4'>
    <input type="text" className='grocery border rounded p-1 ' placeholder='e.g eggs' value={name} onChange={(e)=> setName(e.target.value)}  />
     <button type='submit' className='submit-btn bg-green-400 p-1 rounded text-white font-bold shadow-md capitalize'>{isEditing ? 'edit' : 'submit'}  </button>
      </div>
    </form>
    {list.length > 0 && (
      <div className='grocery-container'>
         <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className='clear-btn' onClick={clearList}>
            clear items
          </button>
      </div>
    )

    }

  </section>
 )
}

export default App;
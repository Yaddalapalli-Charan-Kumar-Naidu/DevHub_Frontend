import React from 'react'
import Card from './Card'
import { useSelector,useDispatch } from 'react-redux'

const Profile = () => {
  const user=useSelector((store)=>store.user);
  const dispatch=useDispatch();
  return (
    <div className="flex justify-center items-center gap-3">
      <div>
      <>edit form</>
      </div>
      <div>
        <Card user={user}/>
        </div>
    </div>
  )
}

export default Profile

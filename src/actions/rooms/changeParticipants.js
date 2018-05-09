import updateRoom from './updateRoom'

export const addUser = (userId,room) => {
  console.log(userId,room)
  const { participants } = room
  if(!!room && !participants.includes(userId)){
    let updatedRoom = room
    updatedRoom.participants = participants.concat(userId)
    updateRoom(updatedRoom)
  }
}

export const removeUser = (userId,room) => {
  console.log(userId,room)
  if(!!room && !!userId){
    const index = room.participants.indexOf(userId)
    if(index > -1) {
      let updatedRoom = room
      updatedRoom.participants = room.participants.splice(index,1)
      console.log(userId,updatedRoom.participants)
      updateRoom(updatedRoom)
    }
  }
}

const convertTime = (time,prefix) => {
  const day = time.slice(0,10)
  const timeStamp = time.slice(11,16)
  let convertedTime =`${prefix} on ${ day } at ${timeStamp}`
  return convertedTime
}

export default convertTime

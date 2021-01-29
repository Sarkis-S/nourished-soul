// Helper function from 24 to 12 hour conversion
const timeConverter = (data) => {
  let newData = data;

  for (let key in newData) {
    let subString1 = parseInt(newData[key].substring(0, 2));
    let subString2 = newData[key].substring(3, 5);
    // Falls between (0:00 / midnight to 0:59), add 12 hours and AM
    if (subString1 === 0) {
      subString1 += 12;
      newData[key] = `${subString1}:${subString2} am`;
    // From (1:00 to 11:59), simply add AM
    } else if (subString1 >= 1 && subString1 <= 11) {
      newData[key] = `${subString1}:${subString2} am`;
    // If it's noon, simplay add PM
    } else if (subString1 === 12) {
      newData[key] = `${subString1}:${subString2} pm`;
    // For times between (13:00 to 23:59), subtract 12 hours and add PM
    } else if (subString1 >= 13 && subString1 <= 23) {
      subString1 -= 12;
      newData[key] = `${subString1}:${subString2} pm`;
    }
  }
  return newData;
}

export default timeConverter;

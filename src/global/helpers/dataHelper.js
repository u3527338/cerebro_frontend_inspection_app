

export const extExtractor = (fileName) => {

  const re = /(?:\.([^.]+))?$/;
  // console.log(re.exec(fileName))
  return re.exec(fileName)
}

export function getRandomInt(max) {
  return parseInt(Math.random() * parseInt(max, 10), 10);
}

export const parseCoord = (polygon) => {
  return polygon.map(item => {
    return {latitude: item[0], longitude: item[1]}
  })
}

export const samplingData = (data, expectedLength) => {
  const totalData = data.length
  if (totalData > expectedLength) {
    let newDataList = [];
    const step = parseInt(totalData / expectedLength)
    for (let i = 0; i < totalData; i++) {
      if (i % step === 0) {
        newDataList.push(data[i])
      }
    }
    return newDataList
  }
  return data
}

export const getAvg = (data, decimal = 2) => {
  if (data.length === 0) {
    return 0
  }
  const ratio = Math.pow(10, decimal);
  const avg = data.reduce((total, num) => total + num, 0) / data.length
  return Math.round(avg * ratio) / ratio
}

export const generateRandomColor =  () => "#" + Math.floor(Math.random()*16777215).toString(16);

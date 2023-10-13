
export const parserResultArea = (buffer, data) => {
  if (!(data.work in buffer)) {
     buffer[data.work] = {completed: 0, rejected: 0, pending: 0, overdue: 0}
  }

  if (data.state === "completed") {
    buffer[data.work].completed += data.count
  }

  if (data.state === "pending") {
    buffer[data.work].pending += data.count - data.overdue
    buffer[data.work].overdue += data.overdue
  }

  if (data.state === "rejected") {
    buffer[data.work].rejected += data.count
  }

  return buffer
}
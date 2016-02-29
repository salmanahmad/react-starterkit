
export function wait(duration) {
  return new Promise(function(resolve) {
    setTimeout(resolve, duration)
  })
}

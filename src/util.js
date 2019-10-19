export const fetch_json = async url => {
  // no error handling, lol
  const response = await fetch(url)
  const data = await response.json()
  return data
}

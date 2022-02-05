export const getUsers = async () => {
  return await fetch(
    "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data",
    {
      method: "GET",
    }
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => {
      console.log("Error");
    });
};

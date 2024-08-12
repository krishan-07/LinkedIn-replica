export default function searchData(data) {
  if (data === "") return [];
  const state = store.getState();
  const usersData = state.usersData;
  const startsWithData = usersData.filter(
    (user) =>
      user.name.toLowerCase().startsWith(data.toLowerCase()) ||
      user.userName.toLowerCase().startsWith(data.toLowerCase())
  );
  const containsData = usersData.filter(
    (user) =>
      !startsWithData.includes(user) &&
      user.name.toLowerCase().includes(data.toLowerCase())
  );
  return [...startsWithData, ...containsData];
}

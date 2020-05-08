import ky from "ky";

const fetchUpdate = () =>
  ky.get("https://rc-inventory.herokuapp.com/update/get").json();

export default fetchUpdate;

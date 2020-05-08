import ky from "ky";

const fetchOrder = () => {
  return new Promise(async resolve => {
    const fetched = await ky
      .get("https://rc-inventory.herokuapp.com/product/get")
      .json();
    resolve(
      fetched.product
        .map(d => {
          const fetchedName = `${d.product_name} ${d.product_size}`;
          let name;
          switch (fetchedName) {
            case "SUTD ring 7":
              name = "R5";
              break;
            case "SUTD ring 8":
              name = "R6";
              break;
            case "SUTD ring 9":
              name = "R7";
              break;
            case "SUTD ring 10":
              name = "R8";
              break;
            case "SUTD ring 11":
              name = "R9";
              break;
            default:
              name = "B7";
              break;
          }
          return {
            size: name,
            orders: {
              Total: 0,
              Pending: 0,
              Processed: 0,
              Collected: 0
            },
            stock: d.stock
          };
        })
        .sort((a, b) => a.size.localeCompare(b.size))
    );
  });
};

export default fetchOrder;

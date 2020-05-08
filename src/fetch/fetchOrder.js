import ky from "ky";

const fetchOrder = () => {
  return new Promise(async resolve => {
    const fetched = await ky
      .get("https://rc-inventory.herokuapp.com/order/get")
      .json();
    resolve(
      fetched.order.map(d => {
        const products = {
          "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4": 0,
          "222b1dd6-ce67-47b8-b763-52da91581597": 0,
          "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc": 0,
          "d75a6df2-1284-4e2f-808b-6e3753718d6d": 0,
          "ad99a78d-3e2e-4718-9c59-c4913f9d612f": 0,
          "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2": 0
        };
        d.items.forEach(i => (products[i.product_id] += i.quantity));

        return {
          orderID: d.order_id,
          name: d.customer.full_name,
          studentID: d.customer.customer_id,
          email: d.customer.email,
          submitDate: d.date_ordered,
          status: ["Pending", "Processed", "Collected"][
            Math.floor(Math.random() * 3)
          ],
          products: products
        };
      })
    );
  });
};

export default fetchOrder;

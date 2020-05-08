import ky from "ky";

const fetchOrder = () => {
  return new Promise(async resolve => {
    const fetched = await ky
      .get("https://rc-inventory.herokuapp.com/finance/get")
      .json();
    resolve(
      fetched.map(d => {
        const newReferences = d.reference.map(
          r => `data:${r.content_type};base 64, ${r.data}`
        );

        return {
          title: d.title,
          details: d.details,
          submitter: d.submitter,
          amount: d.amount,
          submitDate: d.submitted_date,
          references: newReferences
        };
      })
    );
  });
};

export default fetchOrder;

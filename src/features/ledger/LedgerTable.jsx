export default function LedgerTable({ data }) {

  return (

    <div className="ledger-table">

      <div className="table-header">

        <div>Date</div>
        <div>Product</div>
        <div>Operation</div>
        <div>From</div>
        <div>To</div>
        <div>Quantity</div>

      </div>

      {data.length === 0 && (
        <div className="empty-row">
          No stock movements found
        </div>
      )}

      {data.map((item) => (

        <div key={item.id} className="table-row">

          <div>{item.date}</div>
          <div>{item.product}</div>
          <div className={`type-${item.type.toLowerCase()}`}>
            {item.type}
          </div>
          <div>{item.from}</div>
          <div>{item.to}</div>
          <div className={item.quantity > 0 ? "qty-plus" : "qty-minus"}>
            {item.quantity > 0 ? `+${item.quantity}` : item.quantity}
          </div>

        </div>

      ))}

    </div>

  );

}
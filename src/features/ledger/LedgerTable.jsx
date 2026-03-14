import { useEffect, useState } from "react";
import { getLedger } from "../../services/ledgerService";

export default function LedgerTable() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLedger = async () => {

    try {

      const res = await getLedger();

      if (res.status) {
        setData(res.data);
      }

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchLedger();
  }, []);

  if (loading) {
    return <h3 style={{ padding: "20px" }}>Loading ledger...</h3>;
  }

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

          <div>{item.product?.name}</div>

          <div className={`type-${item.operation}`}>
            {item.operation}
          </div>

          <div>{item.from || "-"}</div>

          <div>{item.to || "-"}</div>

          <div
            className={
              parseFloat(item.qty) > 0
                ? "qty-plus"
                : "qty-minus"
            }
          >
            {parseFloat(item.qty) > 0
              ? `+${item.qty}`
              : item.qty}
          </div>

        </div>

      ))}

    </div>

  );

}
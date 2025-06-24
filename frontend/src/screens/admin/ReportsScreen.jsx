import { useState } from "react";
import { Button, ButtonGroup, Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useGetProductSalesReportQuery,
  useGetDailySalesReportQuery,
  useGetMonthlySalesReportQuery,
} from "../../slices/reportsApiSlice";

// Simple CSV export utility
const exportToCSV = (data, filename) => {
  if (!data || !data.length) return;
  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  for (const row of data) {
    csvRows.push(headers.map((h) => `"${row[h] ?? ""}"`).join(","));
  }
  const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.setAttribute("hidden", "");
  a.setAttribute("href", url);
  a.setAttribute("download", filename);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const ReportsScreen = () => {
  const [reportType, setReportType] = useState("product");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Add date range as params if needed in your API
  const {
    data: productSales = [],
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetProductSalesReportQuery({ from, to });

  const {
    data: dailySales = [],
    isLoading: loadingDaily,
    error: errorDaily,
  } = useGetDailySalesReportQuery({ from, to });

  const {
    data: monthlySales = [],
    isLoading: loadingMonthly,
    error: errorMonthly,
  } = useGetMonthlySalesReportQuery({ from, to });

  const handleExport = () => {
    if (reportType === "product")
      exportToCSV(productSales, "product-sales.csv");
    if (reportType === "daily") exportToCSV(dailySales, "daily-sales.csv");
    if (reportType === "monthly")
      exportToCSV(monthlySales, "monthly-sales.csv");
  };

  return (
    <>
      <h1>Sales Reports</h1>
      <ButtonGroup className="mb-3">
        <Button
          variant={reportType === "product" ? "primary" : "outline-primary"}
          onClick={() => setReportType("product")}
        >
          Product Based Sales
        </Button>
        <Button
          variant={reportType === "daily" ? "primary" : "outline-primary"}
          onClick={() => setReportType("daily")}
        >
          Daily Sales
        </Button>
        <Button
          variant={reportType === "monthly" ? "primary" : "outline-primary"}
          onClick={() => setReportType("monthly")}
        >
          Monthly Sales
        </Button>
      </ButtonGroup>
      <Form className="mb-3">
        <Row>
          <Col xs={12} md={3}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Col>
          <Col xs={12} md={3}>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </Col>
          <Col xs={12} md={3} className="d-flex align-items-end">
            <Button variant="success" onClick={handleExport}>
              Export to CSV
            </Button>
          </Col>
        </Row>
      </Form>
      {reportType === "product" && (
        <>
          {loadingProduct ? (
            <Loader />
          ) : errorProduct ? (
            <Message variant="danger">{errorProduct}</Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>PRODUCT ID</th>
                  <th>PRODUCT NAME</th>
                  <th>TOTAL SOLD</th>
                  <th>TOTAL SALES</th>
                </tr>
              </thead>
              <tbody>
                {productSales.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>
                      <Link to={`/admin/product/${item._id}/edit`}>
                        {item.name}
                      </Link>
                    </td>
                    <td>{item.totalSold}</td>
                    <td>Rs. {item.totalSales}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
      {reportType === "daily" && (
        <>
          {loadingDaily ? (
            <Loader />
          ) : errorDaily ? (
            <Message variant="danger">{errorDaily}</Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>DATE</th>
                  <th>TOTAL ORDERS</th>
                  <th>TOTAL SALES</th>
                  <th>TOTAL ITEMS</th>
                </tr>
              </thead>
              <tbody>
                {dailySales.map((report) => (
                  <tr key={report._id}>
                    <td>{report.date?.substring(0, 10)}</td>
                    <td>{report.totalOrders}</td>
                    <td>Rs. {report.totalSales}</td>
                    <td>{report.totalItems}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
      {reportType === "monthly" && (
        <>
          {loadingMonthly ? (
            <Loader />
          ) : errorMonthly ? (
            <Message variant="danger">{errorMonthly}</Message>
          ) : (
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>MONTH</th>
                  <th>TOTAL ORDERS</th>
                  <th>TOTAL SALES</th>
                  <th>TOTAL ITEMS</th>
                </tr>
              </thead>
              <tbody>
                {monthlySales.map((report) => (
                  <tr key={report._id}>
                    <td>{report.month}</td>
                    <td>{report.totalOrders}</td>
                    <td>Rs. {report.totalSales}</td>
                    <td>{report.totalItems}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </>
  );
};

export default ReportsScreen;

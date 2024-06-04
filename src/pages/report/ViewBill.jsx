import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { Pencil, Printer, XCircle,} from "lucide-react";
import logoImage from "../../assets/logo.svg";
import numWords from "num-words";

class ComponentToPrint extends React.Component {
  render() {

    const { ViewBillData } = this.props;

    if (!ViewBillData || ViewBillData.length === 0) {
        // Handle the case where ViewBillData is undefined or empty
        return <p>No data available</p>;
      }

    const commonValues = {
        name: ViewBillData[0].name,
        area: ViewBillData[0].area,
        invoiceNumber: ViewBillData[0].invoiceNumber,
        gst: ViewBillData[0].gst,
        spl: ViewBillData[0].spl,
        date: ViewBillData[0].date,
        paymentMethod: ViewBillData[0].paymentMethod
      };

    function numberToWords(num) {
      return numWords(num);
    }

    return (
    <div className="bg-white w-full h-min p-5 rounded-lg mt-5 border border-gray-300">
        <div className="flex justify-center space-x-10 items-center border-b border-gray-300 pb-3 mb-3">
          <img src={logoImage} alt="Logo" className="w-24" />
          <div className="text-center">
            <p className="font-bold text-lg tracking-wider">MARWA TRADERS</p>
            <p className="tracking-widest text-sm">
              No.44/A, MAMBALAPATTU ROAD,
            </p>
            <p className="tracking-widest text-sm">VILLUPURAM - 605602</p>
            <p className="tracking-widest text-sm">
              PHONE: 9043732149, 6381364796
            </p>
            <p className="tracking-widest text-sm">GSTIN: 33OLDPS1329N1ZJ</p>
          </div>
        </div>

        <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
          <div className="w-1/2 text-xs">
            <p className="font-bold">To:</p>
            <p>{commonValues.name}</p>
            <p>{commonValues.area}</p>
          </div>
          <div className="w-1/2 text-xs border-l border-gray-300 pl-3">
            <div className="flex justify-between border-b border-gray-300 pb-2">
              <p className="font-medium">TAX INVOICE </p>
              {/* <p className="font-medium">CASH BILL</p> */}
            </div>
            <div className="grid grid-cols-2 pt-2">
              <p>INVOICE NO:</p>
              <p>{commonValues.invoiceNumber}</p>
              <p>PAYMENT MODE:</p>
              <p>{commonValues.paymentMethod}</p>
              <p>DATE:</p>
              <p>{commonValues.date}</p>
            </div>
          </div>
        </div>

        <table className="w-full text-center text-xs border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="border-b border-gray-300">
              <th className="p-1">S.No</th>
              <th className="p-1 border-x border-gray-300">Description</th>
              <th className="p-1">Quantity</th>
              <th className="p-1 border-x border-gray-300">Rate</th>
              <th className="p-1">Disc</th>
              <th className="p-1 border-l border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {ViewBillData.map((item, index) => {
              const total = (
                item.quantity *
                item.mrp *
                (1 - item.discount / 100)
              ).toFixed(2);

              return (
                <tr key={index}>
                  <td className="p-1">{index + 1}</td>
                  <td className="p-1 border-x border-gray-300 text-start">
                    {item.productName} ({item.category})
                  </td>
                  <td className="p-1">{item.quantity}</td>
                  <td className="p-1 border-x border-gray-300">{item.mrp}</td>
                  <td className="p-1">{item.discount}%</td>
                  <td className="p-1 border-x border-gray-300">{total}</td>
                </tr>
              );
            })}

            <tr className="border-t border-gray-300">
              <td
                className="p-1 text-start border-r border-gray-300"
                colSpan="3"
                rowSpan="3"
              >
                {numberToWords(
                  commonValues.spl > 0
                    ? Math.round(
                        parseFloat(
                          ViewBillData.reduce((acc, item) => {
                            return (
                              acc +
                              item.quantity *
                                item.mrp *
                                (1 - item.discount / 100)
                            );
                          }, 0)
                        ) +
                          parseFloat(
                            ViewBillData.reduce((acc, item) => {
                              return (
                                acc +
                                item.quantity *
                                  item.mrp *
                                  (1 - item.discount / 100)
                              );
                            }, 0)
                          ) *
                            (commonValues.gst / 100)
                      ) -
                        Math.round(
                          ViewBillData.reduce((acc, item) => {
                            return (
                              acc +
                              item.quantity *
                                item.mrp *
                                (1 - item.discount / 100)
                            );
                          }, 0) *
                            (commonValues.spl / 100)
                        )
                    : Math.round(
                        parseFloat(
                          ViewBillData.reduce((acc, item) => {
                            return (
                              acc +
                              item.quantity *
                                item.mrp *
                                (1 - item.discount / 100)
                            );
                          }, 0)
                        ) +
                          parseFloat(
                            ViewBillData.reduce((acc, item) => {
                              return (
                                acc +
                                item.quantity *
                                  item.mrp *
                                  (1 - item.discount / 100)
                              );
                            }, 0)
                          ) *
                            (commonValues.gst / 100)
                      )
                )}
                <p className="font-medium underline mt-2">Our Bank Details:</p>
                <div className="flex space-x-3 mt-1">
                  <p className="font-medium">Bank Name:</p>
                  <p>Axis Bank</p>
                  <p className="font-medium">A/c No:</p>
                  <p>923020011076412</p>
                  <p className="font-medium">IFSC Code:</p>
                  <p>UTIB0000467</p>
                </div>
              </td>
              <td
                className="p-1 text-right border-r border-gray-300"
                colSpan="2"
              >
                Amount
              </td>
              <td className="p-1 text-center pr-8 font-medium">
                {ViewBillData
                  .map((item) => {
                    const total =
                      item.quantity * item.mrp * (1 - item.discount / 100);
                    return isNaN(total) ? 0 : total;
                  })
                  .reduce((acc, total) => acc + total, 0)
                  .toFixed(2)}
              </td>
            </tr>

            <tr>
              <td
                className="p-1 text-right border-r border-gray-300"
                colSpan="2"
              >
                Gst {commonValues.gst}%
              </td>
              <td className="p-1 text-center pr-8" colSpan="2">
                {(
                  ViewBillData.reduce((acc, item) => {
                    return (
                      acc + item.quantity * item.mrp * (1 - item.discount / 100)
                    );
                  }, 0) *
                  (commonValues.gst / 100)
                ).toFixed(2)}
              </td>
            </tr>

            {commonValues.spl > 0 && (
              <tr>
                <td
                  className="p-1 text-right border-r border-gray-300"
                  colSpan="2"
                >
                  Special dis(-) {commonValues.spl}%
                </td>
                <td className="p-1 text-center pr-8" colSpan="2">
                  {(
                    ViewBillData.reduce((acc, item) => {
                      return (
                        acc +
                        item.quantity * item.mrp * (1 - item.discount / 100)
                      );
                    }, 0) *
                    (commonValues.spl / 100)
                  ).toFixed(2)}
                </td>
              </tr>
            )}

            <tr className="border-t border-gray-300">
              <td
                className="p-1 text-right border-r border-gray-300"
                colSpan="2"
              >
                Total
              </td>
              <td className="p-1 text-center pr-8 font-medium">
                {commonValues.spl > 0
                  ? (
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) +
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) *
                        (commonValues.gst / 100)
                    ).toFixed(2) -
                    (
                      ViewBillData.reduce((acc, item) => {
                        return (
                          acc +
                          item.quantity * item.mrp * (1 - item.discount / 100)
                        );
                      }, 0) *
                      (commonValues.spl / 100)
                    ).toFixed(2)
                  : (
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) +
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) *
                        (commonValues.gst / 100)
                    ).toFixed(2)}
              </td>
            </tr>

            <tr className="border-t border-gray-300">
              <td
                className="p-2 text-start border-r border-gray-300"
                colSpan="3"
                rowSpan="2"
              >
                <p className="font-medium underline">E.& O.E</p>
                <div className="text-xs">
                  <p>
                    Certified the all particular given above are true and
                    correct.
                  </p>
                  <p>Goods once sold are not returnable or exchangable.</p>
                  <p>
                    Our responsibility ceases after the goods released from
                    shop.
                  </p>
                </div>
              </td>
              <td
                className="text-right border-r border-gray-300 p-2 font-medium"
                colSpan="2"
              >
                GRAND TOTAL
              </td>
              <td className="text-center pr-8 p-2 font-medium">
                {commonValues.spl > 0
                  ? Math.round(
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) +
                        parseFloat(
                          ViewBillData.reduce((acc, item) => {
                            return (
                              acc +
                              item.quantity *
                                item.mrp *
                                (1 - item.discount / 100)
                            );
                          }, 0)
                        ) *
                          (commonValues.gst / 100)
                    ) -
                    Math.round(
                      ViewBillData.reduce((acc, item) => {
                        return (
                          acc +
                          item.quantity * item.mrp * (1 - item.discount / 100)
                        );
                      }, 0) *
                        (commonValues.spl / 100)
                    )
                  : Math.round(
                      parseFloat(
                        ViewBillData.reduce((acc, item) => {
                          return (
                            acc +
                            item.quantity * item.mrp * (1 - item.discount / 100)
                          );
                        }, 0)
                      ) +
                        parseFloat(
                          ViewBillData.reduce((acc, item) => {
                            return (
                              acc +
                              item.quantity *
                                item.mrp *
                                (1 - item.discount / 100)
                            );
                          }, 0)
                        ) *
                          (commonValues.gst / 100)
                    )}
              </td>
            </tr>
            <tr className="border-t border-gray-300">
              <td
                className="p-3 text-start border-r border-gray-300 text-xs font-medium"
                colSpan="3"
              >
                <p>for MARWA TRADERS</p>
                <p className="text-end mt-10">Authorised Signatory</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export const ViewBill = ({
    setViewBillShow,
    ViewBillData,
    setViewBillData
}) => {

  const componentRef = useRef();

  console.log(ViewBillData)

  const handleClearData = () => {
    setViewBillShow(false);
    setViewBillData([]);
  };

  return (
    <div className=" w-full h-auto pt-5 px-5 bg-gray-200 ">
      <div className=" w-full">
        <div className=" flex space-x-5 justify-end">
          <button
            className="flex space-x-2 text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded-md"
            onClick={() => handleClearData()}
          >
            <XCircle />
            <p>Cancel</p>
          </button>
          <button
            className="flex space-x-2 text-white bg-green-500 hover:bg-green-700 px-4 py-2 rounded-md"
            onClick={() => handleClearData()}
          >
            <Pencil />
            <p>Edit</p>
          </button>
          <ReactToPrint
            trigger={() => (
              <button
                className="flex space-x-3 text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md"
              >
                <Printer />
                <p>Print</p>
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>

        <ComponentToPrint
          ref={componentRef}
          ViewBillData={ViewBillData}
        />
      </div>
    </div>
  );
};

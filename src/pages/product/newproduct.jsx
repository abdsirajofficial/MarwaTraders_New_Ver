import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { addProduct } from "../../server/app";
// import { addProduct} from "../../assets/upproduct.xlsx";
import Papa from "papaparse";

export const Newproduct = ({ setViewMode }) => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState();
  const [mrp, setMRP] = useState();
  const [discount, setDiscount] = useState();
  const [addMargin, setaddMargin] = useState();
  const [netRate, setnetRate] = useState();
  const [category, setCategory] = useState();

  useEffect(() => {
    if (mrp !== 0 && discount !== 0 && addMargin !== 0) {
      const netRate = mrp * (1 - discount / 100);
      const saleRate = netRate * (1 + addMargin / 100);
      setnetRate(netRate);
    }
  }, [mrp, discount, addMargin]);

  const handleSave = async () => {
    if (
      productName === "" ||
      quantity === 0 ||
      mrp === 0 ||
      discount === 0 ||
      addMargin === 0 ||
      netRate === 0 ||
      category === ""
    ) {
      toast.error("Please fill the required fields", { duration: 1500 });
    }

    const data = {
      productName: productName,
      quantity: parseInt(quantity),
      mrp: parseFloat(mrp),
      discount: parseFloat(discount),
      addMargin: parseInt(addMargin),
      netRate: parseFloat(netRate),
      category: category,
    };

    addProduct(data).then((res) => {
      if (res.status === 200) {
        toast.success("Material added successfully!", { duration: 1500 });
      } else {
        toast.error("Something went Wrong", { duration: 1500 });
      }
    });
  };

  // const handleCSVfile = async () => {
  //   const csvFile = document.getElementById('csvFile').files[0];

  //   if (csvFile) {
  //     const reader = new FileReader();

  //     reader.onload = function(event) {
  //       Papa.parse(event.target.result, {
  //         header: true,
  //         complete: function(results) {
  //           results.data.forEach(record => {
  //             const data = {
  //               productName: record['productName'],
  //               quantity: parseInt(record['quantity']),
  //               mrp: parseFloat(record['mrp']),
  //               discount: parseFloat(record['discount']),
  //               addMargin: parseInt(record['addMargin']),
  //               netRate: parseFloat(record['netRate']),
  //               category: record['category'],
  //             };

  //             addProduct(data).then((res) => {
  //               if (res.status === 200) {
  //                 toast.success('Material added successfully!', { duration : 1500 });
  //               }
  //               else {
  //                 toast.error('Something went Wrong', { duration : 1500 });
  //               }
  //             });
  //           });
  //         }
  //       });
  //     };

  //     reader.readAsText(csvFile);
  //   } else {
  //     toast.error('Please select a CSV file.', { duration: 1500 });
  //   }
  // };

  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
  };

  const handleChange = (event) => {
    const files = event.target.files;
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const csvFile = files[0];
      handleCSVfile(csvFile);
    } else {
      toast.error("Please select a CSV file.", { duration: 1500 });
    }
  };

  const handleCSVfile = async (csvFile) => {
    if (csvFile) {
      const reader = new FileReader();

      reader.onload = function (event) {
        Papa.parse(event.target.result, {
          header: true,
          complete: function (results) {
            results.data.forEach((record) => {
              const data = {
                productName: record["productName"],
                quantity: parseInt(record["quantity"]),
                mrp: parseFloat(record["mrp"]),
                discount: parseFloat(record["discount"]),
                addMargin: parseInt(record["addMargin"]),
                netRate: parseFloat(record["netRate"]),
                category: record["category"],
              };

              addProduct(data).then((res) => {
                if (res.status === 200) {
                  toast.success("Material added successfully!", {
                    duration: 1500,
                  });
                } else {
                  toast.error("Something went wrong", { duration: 1500 });
                }
              });
            });
          },
        });
      };

      reader.readAsText(csvFile);
    } else {
      toast.error("Please select a CSV file.", { duration: 1500 });
    }
  };

  return (
    <div className="w-full h-full pt-5 flex justify-between px-20">
      <div className=" w-full flex justify-center items-center">
        <div
          className={` w-[400px] h-[250px] flex justify-center items-center border-4 border-dashed border-blue-300 animate-pulse rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ease-in-out
          ${
            dragOver
              ? "bg-green-100 border-green-500"
              : "bg-blue-100 hover:bg-blue-100 hover:border-blue-500 active:bg-blue-200 active:border-blue-700"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("csvFile").click()}
        >
          <input
            type="file"
            id="csvFile"
            accept=".csv"
            onChange={handleChange}
            style={{ display: "none" }}
          />
          <p>Drag & Drop your file here or Click to choose</p>
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center space-x-4 text-white">
          <h1 className="bg-blue-400 py-1 px-2 rounded-lg">MRP: {mrp}</h1>
          <h1 className="bg-red-400 py-1 px-2 rounded-lg">Dis(-): {discount}%</h1>
          <h1 className="bg-green-400 py-1 px-2 rounded-lg">
            ADD(+): {addMargin}%
          </h1>
          <h1 className="bg-yellow-400 py-1 px-2 rounded-lg">
            Net Rate: {netRate}
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <div className=" w-[550px] mt-10 py-10 px-10 flex flex-col justify-start bg-white space-y-4 rounded-2xl shadow-lg">
            <h1 className="text-center font-medium">ADD PRODUCTS</h1>
            <div className="flex justify-between items-center">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                className="rounded border-2 p-3 w-[300px]"
                name="productName"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center space-x-5">
              <label htmlFor="description">Quantity:</label>
              <input
                type="number"
                className="rounded border-2 p-3 w-[300px] "
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center space-x-5">
              <label htmlFor="price">MRP:</label>
              <input
                type="number"
                className="rounded border-2 p-3 w-[300px]"
                name="mrp"
                value={mrp}
                onChange={(e) => setMRP(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center space-x-5">
              <label htmlFor="quantity">Discount (-):</label>
              <input
                type="number"
                className="rounded border-2 p-3 w-[300px]"
                name="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center space-x-5">
              <label htmlFor="quantity">Add Margin (+):</label>
              <input
                type="number"
                className="rounded border-2 p-3 w-[300px]"
                name="addMargin"
                value={addMargin}
                onChange={(e) => setaddMargin(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="category">Category:</label>
              <div className="flex items-center gap-x-4">
                <div>
                  <input
                    type="radio"
                    value="PVC"
                    name="category"
                    checked={category === "PVC"}
                    onChange={() => setCategory("PVC")}
                  />
                  <label htmlFor="pvc">PVC</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="UPVC"
                    name="category"
                    checked={category === "UPVC"}
                    onChange={() => setCategory("UPVC")}
                  />
                  <label htmlFor="upvc">UPVC</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="CPVC"
                    name="category"
                    checked={category === "CPVC"}
                    onChange={() => setCategory("CPVC")}
                  />
                  <label htmlFor="cpvc">CPVC</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="SOLVENT"
                    name="category"
                    checked={category === "SOLVENT"}
                    onChange={() => setCategory("SOLVENT")}
                  />
                  <label htmlFor="SOLVENT">SOLVENT</label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-5">
              <button
                className="bg-red-400 text-white py-2 px-4 rounded"
                onClick={() => setViewMode("view")}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded"
                onClick={handleSave}
              >
                {}
                <p>Save</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState } from "react";
import { CustomerUpdateApi } from "../../controllers/customerApi";
import AutocompleteField from "../AutocompleteField/AutocompleteField";
import EditButton from "../EditButton/EditButton";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { ClearIcon } from "../icons";
import { GstCustomerUpdateApi } from "../../controllers/gstcustomerApi";
import { toast } from "react-toastify";

const CustomerField = ({
  customerName,
  setCustomerName,
  phoneno,
  setPhoneno,
  customerData,
  GetFunction,
  address,
  setAddress,
  gstNo,
  setGstNo,
  SelectCustomerID,
  setSelectedCustomerID,
  isGstCustomer = false,
}) => {
  const [Open, setOpen] = useState(false);
  const UpdateUser = async () => {
    if (SelectCustomerID) {
      if (!isGstCustomer) {
        const data = {
          data: {
            name: customerName,
            phonenumber: phoneno,
          },
        };
        const userupdated = await CustomerUpdateApi(SelectCustomerID, data);
        if (userupdated.status === 200) {
          console.log(userupdated.data.data);
          setSelectedCustomerID(userupdated.data.data.id);
          setCustomerName(userupdated.data.data.attributes.name);
          setPhoneno(userupdated.data.data.attributes.phonenumber);
          setOpen(false);
          toast.success("You have successfully updated Customer");
          GetFunction();
        }
      } else {
        const data = {
          data: {
            name: customerName,
            address: address,
            gstno: gstNo,
          },
        };
        const gstuserupdated = await GstCustomerUpdateApi(
          SelectCustomerID,
          data,
        );

        if (gstuserupdated.status === 200) {
          setSelectedCustomerID(gstuserupdated.data.data.id);
          setCustomerName(gstuserupdated.data.data.attributes.name);
          setAddress(gstuserupdated.data.data.attributes.address);
          setGstNo(gstuserupdated.data.data.attributes.gstno);
          setOpen(false);
        }
      }
    } else {
      setOpen(false);
    }
  };

  const handleCustomerChange = (e, newValue, field) => {
    console.log(newValue, field);
    if (!newValue) {
      setCustomerName("");
      setSelectedCustomerID("");
      if (isGstCustomer) {
        setAddress("");
        setGstNo("");
      } else {
        setPhoneno("");
      }
      return;
    }

    const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "").trim(); // Remove spaces and lowercase

    const selectedCustomer = customerData.find((data) => {
      const attr = data.attributes;

      if (field === "name") {
        return normalize(attr.name) === normalize(newValue);
      }
      if (field === "phone" && !isGstCustomer) {
        return normalize(attr.phonenumber) === normalize(newValue);
      }
      if (field === "gst" && isGstCustomer) {
        return normalize(attr.gstno) === normalize(newValue);
      }
      if (field === "address" && isGstCustomer) {
        return normalize(attr.address) === normalize(newValue);
      }
      return false;
    });

    if (selectedCustomer) {
      const { id, attributes } = selectedCustomer;

      setSelectedCustomerID(id || "");
      setCustomerName(attributes.name || "");

      if (isGstCustomer) {
        setAddress(attributes.address || "");
        setGstNo(attributes.gstno || "");
      } else {
        setPhoneno(attributes.phonenumber || "");
      }
    } else {
      setCustomerName("");
      setSelectedCustomerID("");
      if (isGstCustomer) {
        setAddress("");
        setGstNo("");
      } else {
        setPhoneno("");
      }
    }
  };

  const handleBlur = (field, fieldname) => {
    console.log(field);

    const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "").trim();

    let inputValue = "";

    if (field === "name") {
      inputValue = customerName;
    } else if (field === "phone" && !isGstCustomer) {
      inputValue = phoneno;
    } else if (field === "gst" && isGstCustomer) {
      inputValue = gstNo;
    } else if (field === "address" && isGstCustomer) {
      inputValue = address;
    }

    if (!inputValue || normalize(inputValue) === "") {
      return;
    }

    let existingCustomer;

    if (field === "name") {
      existingCustomer = customerData.find(
        (data) => normalize(data.attributes.name) === normalize(customerName),
      );
    } else if (field === "phone" && !isGstCustomer) {
      existingCustomer = customerData.find(
        (data) => normalize(data.attributes.phonenumber) === normalize(phoneno),
      );
    } else if (field === "gst" && isGstCustomer) {
      existingCustomer = customerData.find(
        (data) => normalize(data.attributes.gstno) === normalize(gstNo),
      );
    } else if (field === "address" && isGstCustomer) {
      existingCustomer = customerData.find(
        (data) => normalize(data.attributes.address) === normalize(address),
      );
    }

    if (existingCustomer) {
      handleCustomerChange(null, existingCustomer.attributes[fieldname], field);
    }
  };

  return (
    <div
      className={`grid grid-cols-${isGstCustomer ? "3" : "2"} gap-4 mt-4 mb-8`}
    >
      <AutocompleteField
        label="Customer Name"
        value={customerName}
        onInputChange={(e, newInputValue) => setCustomerName(newInputValue)}
        onChange={(e, newValue) => handleCustomerChange(e, newValue, "name")}
        onBlur={() => handleBlur("name", "name")}
        options={[
          ...new Set(
            customerData.map((data) => data.attributes.name).filter(Boolean),
          ),
        ]}
        required={true}
      />

      {isGstCustomer ? (
        <>
          <AutocompleteField
            label="Address"
            value={address}
            onInputChange={(e, newInputValue) => setAddress(newInputValue)}
            onChange={(e, newValue) =>
              handleCustomerChange(e, newValue, "address")
            }
            options={[
              ...new Set(
                customerData
                  .map((data) => data.attributes.address)
                  .filter(Boolean),
              ),
            ]}
            // required={true}
          />
          <div className="flex gap-2 items-end">
            <AutocompleteField
              label="GST No"
              value={gstNo}
              onInputChange={(e, newInputValue) => setGstNo(newInputValue)}
              onChange={(e, newValue) =>
                handleCustomerChange(e, newValue, "gst")
              }
              onBlur={() => handleBlur("gst", "gstno")}
              options={[
                ...new Set(
                  customerData
                    .filter((data) => data.attributes.gstno)
                    .map((data) => data.attributes.gstno),
                ),
              ]}
            />
            {SelectCustomerID && (
              <div className="h-9">
                <EditButton onClick={() => setOpen(true)} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex gap-2 items-end">
          <AutocompleteField
            label="Phone Number"
            value={phoneno}
            onInputChange={(e, newInputValue) => setPhoneno(newInputValue)}
            onChange={(e, newValue) =>
              handleCustomerChange(e, newValue, "phone")
            }
            onBlur={() => handleBlur("phone", "phonenumber")}
            options={[
              ...new Set(
                customerData
                  .map((data) => data.attributes.phonenumber)
                  .filter(Boolean),
              ),
            ]}
            type="tel"
          />
          {SelectCustomerID && (
            <div className="h-9">
              <EditButton onClick={() => setOpen(true)} />
            </div>
          )}
        </div>
      )}

      <div>
        {Open && (
          <>
            <div className="absolute top-0 left-0 w-full h-full  flex items-center justify-center z-[999]">
              <div className="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm bg-white p-4">
                <div className="flex justify-end my-1">
                  <ClearIcon onClick={() => setOpen(false)} />
                </div>
                <InputField
                  name="customerName"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                {isGstCustomer ? (
                  <>
                    <InputField
                      name="address"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <InputField
                      name="gstNo"
                      placeholder="GST No"
                      value={gstNo}
                      onChange={(e) => setGstNo(e.target.value)}
                    />
                  </>
                ) : (
                  <InputField
                    name="phoneno"
                    placeholder="Phone Number"
                    value={phoneno}
                    onChange={(e) => setPhoneno(e.target.value)}
                  />
                )}

                <Button
                  label="Update"
                  classvalues={"bg-[#9E77D2] w-full text-white mt-3"}
                  onClick={UpdateUser}
                />
              </div>
            </div>
            <div
              className="bg-[#0000007d] h-full absolute top-0 left-0 w-full flex items-center justify-center z-[998]"
              onClick={() => setOpen(false)}
            ></div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerField;

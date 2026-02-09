import { useState } from "react";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import Datepicker from "../../components/Datepicker/Datepicker";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [Loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [DashboardData, setDashboardData] = useState({});

  const {
    localsales = {},
    localexpense = {},
    gst = {},
    gstexpense = {},
    admin = {},
    debt = {},
    total = {},
  } = DashboardData;

  return (
    <MainLayout>
      <div>{Loading ? "Loading..." : " "}</div>
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="flex gap-4 items-center justify-start mt-4 mb-8">
        <Datepicker
          type="multipledatepicker"
          FromDate={FromDate}
          ToDate={ToDate}
          setFromDate={setFromDate}
          setToDate={setToDate}
        />
      </div>

      <h1 className="text-xl font-medium">Local Info</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Local Cash */}
        <DashboardCard
          title={"Local Sales Cash"}
          titleColor={"text-green-900"}
          totalAmount={total.localSalesPaidCashTotal}
          amountdetails={[
            {
              name: "Local Paid",
              value: localsales.totalLocalCashPaid,
            },
            {
              name: "Local paid Pending",
              value: localsales.totalLocalCashPaidPending,
            },
            {
              name: "Local Party",
              value: localsales.localpartypaidcash,
            },
            {
              name: "Local unapprove",
              value: localsales.totalLocalunapprovedCash,
            },
            {
              name: "Local Recive",
              value: localexpense.totalLocalReciveCash,
            },
            { name: "Debt Recive", value: debt.totaldebtReciveCashPublic },
            {
              name: "Gst Cash",
              value: gst.totalgstcashpaid,
            },
            {
              name: "Local Admin Public Recieve",
              value: admin.totalrecievepbcashinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Local Cash Expenses"}
          titleColor={"text-red-800"}
          totalAmount={total.localExpenseCashTotal}
          amountdetails={[
            {
              name: "Local Expenses",
              value: localexpense.totalLocalExpense,
            },
            {
              name: "Debt Expenses",
              value: debt.totaldebtExpenseCashPublic,
            },
            {
              name: "Admin Public Expenses",
              value: admin.totalexpensepbcashinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={total.localCashBalane}
          amountdetails={[]}
        />

        {/* Local Gpay */}
        <DashboardCard
          title={"Local Sales Gpay"}
          titleColor={"text-green-800"}
          totalAmount={total.localSalesPaidGpayTotal}
          amountdetails={[
            {
              name: "Local Paid",
              value: localsales.totalLocalgpayPaid,
            },
            {
              name: "Local paid Pending",
              value: localsales.totalLocalgpayPending,
            },
            {
              name: "Local Party",
              value: localsales.localpartypaidgpay,
            },
            {
              name: "Local unapprove",
              value: localsales.totalLocalunapprovedgpay,
            },
            {
              name: "Local Recive",
              value: localexpense.totalLocalReciveGpay,
            },
            {
              name: "Debt Recive",
              value: debt.totaldebtReciveGapayPublic,
            },
            {
              name: "Gst Gpay",
              value: gst.totalgstgpaypaid,
            },
            {
              name: "Local Admin Public Recieve",
              value: admin.totalrecievepbgpayinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Local Gapy Expenses"}
          titleColor={"text-red-800"}
          totalAmount={total.localExpenseGpayTotal}
          amountdetails={[
            {
              name: "Local Expenses",
              value: localexpense.totalLocalExpenseGapay,
            },
            {
              name: "Debt Expenses",
              value: debt.totaldebtExpenseGapayPublic,
            },
            {
              name: "Admin Public Expenses",
              value: admin.totalexpensepbgpayinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={total.localGpayBalane}
          amountdetails={[]}
        />
      </div>

      {/* GST Tax*/}
      <h1 className="text-xl font-medium mt-12">Tax Info</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <DashboardCard
          title={`Gst Sales (${(gst?.totalgstsaleswithoutgst || 0).toFixed(
            2,
          )})`}
          titleColor={"text-green-800"}
          totalAmount={gst?.totalgstsaleswithgst || 0}
          amountdetails={[]}
          taxAmount={(gst?.totalgsttax || 0).toFixed(2)}
        />
        <DashboardCard
          title={`Gst Expenses (${(
            gstexpense?.totalgstexpensewithoutgst || 0
          ).toFixed(2)})`}
          titleColor={"text-red-800"}
          totalAmount={gstexpense?.totalgstexpensewithgst || 0}
          amountdetails={[]}
          taxAmount={(gstexpense?.totalgstexpensetax || 0).toFixed(2)}
        />
        <DashboardCard
          title={"Gst Tax"}
          titleColor={"text-yellow-800"}
          totalAmount={(total.totalGstTax || 0).toFixed(2)}
          amountdetails={[]}
        />
      </div>

      {/* Finalize*/}
      <h1 className="text-xl font-medium mt-[250px]">Finalize</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <DashboardCard
          title={"Total Amount"}
          titleColor={"text-green-800"}
          totalAmount={total.totalFinalizeGetAmount}
          amountdetails={[
            {
              name: "Cash",
              value: total.localSalesExpensesPaidCashTotal,
            },
            {
              name: "Gpay",
              value: total.localSalesExpensesPaidGpayTotal,
            },
            {
              name: "Gst Bank",
              value: total.gstReceivetotal,
            },

            {
              name: "Local Need To Get",
              value: total.localNeedtoGet,
            },
            {
              name: "Gst Need To Get",
              value: gst.totalgstneedtoget,
            },
          ]}
        />

        <DashboardCard
          title={"Total Expense  Amount"}
          titleColor={"text-red-800"}
          totalAmount={total.totalFinalizeGiveAmount}
          amountdetails={[
            {
              name: "Cash",
              value: total.localSalesExpenseCashTotal,
            },
            {
              name: "Gpay",
              value: total.localSalesExpenseGpayTotal,
            },
            {
              name: "Gst Bank",
              value: (total.gstExpensetotal || 0).toFixed(2),
            },
            {
              name: "Gst Need To Pay",
              value: gstexpense.totalgstexpenseneedtoget,
            },
          ]}
        />

        <DashboardCard
          title={"Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={(total.totalFinalizeBalance || 0).toFixed(2)}
          amountdetails={[]}
        />
      </div>

      {/* Local Sales & Expenses */}
      <h1 className="text-xl font-medium mt-12">Local Sales & Expenses</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Local Cash */}
        <DashboardCard
          title={"Local Cash"}
          titleColor={"text-green-800"}
          totalAmount={total.localSalesExpensesPaidCashTotal}
          amountdetails={[
            {
              name: "Local Paid",
              value: localsales.totalLocalCashPaid,
            },
            {
              name: "Local paid Pending",
              value: localsales.totalLocalCashPaidPending,
            },
            {
              name: "Local Party",
              value: localsales.localpartypaidcash,
            },
            {
              name: "Local Recive",
              value: localexpense.totalLocalReciveCash,
            },
            {
              name: "Debt Cash",
              value: debt.totaldebtReciveCash,
            },
            {
              name: "Gst Cash",
              value: gst.totalgstcashpaid,
            },
            {
              name: "Admin Cash",
              value: admin.totalrecievecashinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Local Cash Expenses"}
          titleColor={"text-red-800"}
          totalAmount={total.localSalesExpenseCashTotal}
          amountdetails={[
            {
              name: "Local Cash Expenses",
              value: localexpense.totalLocalExpense,
            },
            {
              name: "Debt Expenses",
              value: debt.totaldebtExpenseCash,
            },
            {
              name: "Admin Cash Expenses",
              value: admin.totalexpensecashinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Local Cash Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={total.localSalesExpensesCashBalane}
          amountdetails={[]}
        />

        {/* Local Gpay */}
        <DashboardCard
          title={"Local Sales Gpay"}
          titleColor={"text-green-800"}
          totalAmount={total.localSalesExpensesPaidGpayTotal}
          amountdetails={[
            {
              name: "Local Paid",
              value: localsales.totalLocalgpayPaid,
            },
            {
              name: "Local paid Pending",
              value: localsales.totalLocalgpayPending,
            },
            {
              name: "Local Party",
              value: localsales.localpartypaidgpay,
            },
            {
              name: "Local Recive",
              value: localexpense.totalLocalReciveGpay,
            },
            {
              name: "Debt Gpay",
              value: debt.totaldebtReciveGapay,
            },
            {
              name: "Gst Gpay",
              value: gst.totalgstgpaypaid,
            },
            {
              name: " Admin Gpay ",
              value: admin.totalrecievegpayinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Local Gapy Expenses"}
          titleColor={"text-red-800"}
          totalAmount={total.localSalesExpenseGpayTotal}
          amountdetails={[
            {
              name: "Local Expenses",
              value: localexpense.totalLocalExpenseGapay,
            },
            {
              name: "Debt Expenses",
              value: debt.totaldebtExpenseGapay,
            },
            {
              name: "Admin Expense Gpay",
              value: admin.totalexpensegpayinadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={Math.round(total.localSalesGpayBalane)}
          amountdetails={[]}
        />
      </div>
      {/* Local Need to Get */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <DashboardCard
          title={" Local Need to Get"}
          titleColor={"text-sky-800"}
          totalAmount={total.localNeedtoGet}
          amountdetails={[
            {
              name: "Local Pending",
              value: localsales.localneedtogetinpending,
            },
            {
              name: "Local party Pending",
              value: localsales.localneedtogetinparty,
            },
          ]}
        />

        <DashboardCard
          title={" Local Unapproved"}
          titleColor={"text-sky-800"}
          totalAmount={
            Number(localsales.totalLocalunapprovedCash) +
            Number(localsales.totalLocalunapprovedgpay)
          }
          amountdetails={[
            {
              name: "Local Unapproved Cash",
              value: localsales.totalLocalunapprovedCash,
            },
            {
              name: "Local Unapproved Gpay",
              value: localsales.totalLocalunapprovedgpay,
            },
          ]}
        />
      </div>

      {/* Gst Offical Bank */}
      <h1 className="text-xl font-medium mt-12">Official Bank</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        <DashboardCard
          title={"Recieved Amount"}
          titleColor={"text-green-800"}
          totalAmount={total.gstReceivetotal}
          amountdetails={[
            {
              name: "Gst Sales Credited Amount",
              value: gst.totalgstaccountpaid,
            },
            {
              name: "Admin Gst Credited Amount",
              value: admin.totalrecieveinbankadmin,
            },
          ]}
        />
        <DashboardCard
          title={"Expense Amount"}
          titleColor={"text-red-800"}
          totalAmount={(total.gstExpensetotal || 0).toFixed(2)}
          amountdetails={[
            {
              name: "Gst Sales Debited Amount ",
              value: gstexpense.totalgstexpenseaccount,
            },
            {
              name: "Admin Gst Debited Amount ",
              value: (admin.totalexpenseinbankadmin || 0).toFixed(2),
            },
          ]}
        />
        <DashboardCard
          title={"Bank Balance"}
          titleColor={"text-yellow-800"}
          totalAmount={(total.gstBankBalance || 0).toFixed(2)}
          amountdetails={[]}
        />

        {/* Need to get */}
        <DashboardCard
          title={"Gst Need to get"}
          titleColor={"text-sky-800"}
          totalAmount={gst.totalgstneedtoget}
          amountdetails={[]}
        />
        <DashboardCard
          title={"Gst Need to pay"}
          titleColor={"text-sky-800"}
          totalAmount={gstexpense.totalgstexpenseneedtopay}
          amountdetails={[]}
        />
      </div>

      {/* Admin Users */}
      <h1 className="text-xl font-medium mt-12">Admin Users</h1>
      <div className="grid grid-cols-3 gap-4 mt-4 mb-4">
        <DashboardCard
          title={`Asmath, Get:(${total.totalAsmathGetAmount}), Give:(${total.totalAsmathGiveAmount})`}
          titleColor={"text-sky-800"}
          totalAmount={total.totalAmountAsmath}
          amountdetails={[
            {
              name: "Get in Cash",
              value: admin.totalAsmathgetincash,
            },
            {
              name: "Get in Gapy",
              value: admin.totalAsmathgetingpay,
            },
            {
              name: "Get in Gst",
              value: admin.totalAsmathgetingst,
            },
            {
              name: "Give in Cash",
              value: admin.totalAsmathgiveincash,
            },
            {
              name: "Give in Gapy",
              value: admin.totalAsmathgiveingpay,
            },
            {
              name: "Give in Gst",
              value: admin.totalAsmathgiveingst,
            },
          ]}
        />

        <DashboardCard
          title={`Ibu, Get:(${total.totalIbuGetAmount}), Give:(${total.totalIbugiveAmount})`}
          titleColor={"text-sky-800"}
          totalAmount={total.totalAmountIbu}
          amountdetails={[
            {
              name: "Get in Cash",
              value: admin.totalIbugetincash,
            },
            {
              name: "Get in Gapy",
              value: admin.totalIbugetingpay,
            },
            {
              name: "Get in Gst",
              value: admin.totalIbugetingst,
            },
            {
              name: "Give in Cash",
              value: admin.totalIbugiveincash,
            },
            {
              name: "Give in Gapy",
              value: admin.totalIbugiveingpay,
            },
            {
              name: "Give in Gst",
              value: admin.totalIbugiveingst,
            },
          ]}
        />
      </div>
    </MainLayout>
  );
};

export default Dashboard;

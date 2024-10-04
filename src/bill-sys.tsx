'use client';

import { useState } from 'react';

const customers = [
  {
    id: 1,
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    address: 'شارع 1، المدينة',
    balance: 500,
    transactions: [
      { date: '2023-05-01', description: 'شراء بضائع', amount: -200 },
      { date: '2023-05-15', description: 'دفعة', amount: 300 },
    ],
  },
  {
    id: 2,
    name: 'فاطمة علي',
    email: 'fatima@example.com',
    address: 'شارع 2، المدينة',
    balance: -150,
    transactions: [
      { date: '2023-06-01', description: 'شراء خدمات', amount: -300 },
      { date: '2023-06-10', description: 'دفعة جزئية', amount: 150 },
    ],
  },
  {
    id: 3,
    name: 'محمود حسن',
    email: 'mahmoud@example.com',
    address: 'شارع 3، المدينة',
    balance: 0,
    transactions: [
      { date: '2023-07-01', description: 'شراء منتجات', amount: -500 },
      { date: '2023-07-20', description: 'تسديد كامل', amount: 500 },
    ],
  },
];

export default function InvoiceSystem() {
  const [selectedCustomer, setselectedCustomer] = useState<any>(null);
  const [invoiceItems, setInvoiceItems] = useState([
    { description: '', amount: '' },
  ]);
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  const handleCustomerselect = (customerId: any) => {
    const customer = customers.find((c) => c.id === parseInt(customerId));
    setselectedCustomer(customer);
    console.log(`تم اختيار الزبون: ${customer!.name}`);
  };

  const handleItemChange = (index: any, field: any, value: any) => {
    const newItems = [...invoiceItems];
    newItems[index][field] = value;
    setInvoiceItems(newItems);
    calculateTotal(newItems);
  };

  const addInvoiceItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', amount: '' }]);
  };

  const calculateTotal = (items: any) => {
    const total = items.reduce(
      (sum: any, item: any) => sum + (parseFloat(item.amount) || 0),
      0
    );
    setInvoiceTotal(total);
  };

  const printInvoice = () => {
    console.log('طباعة الفاتورة:', {
      customer: selectedCustomer,
      items: invoiceItems,
      total: invoiceTotal,
    });
  };

  return (
    <div className="container mx-auto p-4 font-cairo ">
      <div className="mb-6 card">
        <div>
          <div className="text-xl">اختيار الزبون</div>
        </div>
        <div>
          <select onChange={(e) => handleCustomerselect(e.target.value)}>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id.toString()}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCustomer && (
        <div className="card">
          <div className="mb-6 card">
            <div>
              <div className="text-xl">بيانات الزبون</div>
            </div>
            <div>
              <p className="mb-2">
                <strong>الاسم:</strong> {selectedCustomer.name}
              </p>

              <p
                className={`font-bold ${
                  selectedCustomer.balance >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                <strong>الرصيد الحالي:</strong> {selectedCustomer.balance} دينار
              </p>
            </div>
          </div>

          <div className="mb-6 card">
            <div>
              <div className="text-xl">الحركات السابقة</div>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>التاريخ</th>
                    <th>الوصف</th>
                    <th>المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCustomer.transactions.map(
                    (transaction: string, index: number) => (
                      <tr key={index}>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td
                          className={
                            transaction.amount >= 0
                              ? 'text-green-600'
                              : 'text-red-600'
                          }
                        >
                          {transaction.amount} دينار
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 card">
        <div>
          <div className="text-xl">تفاصيل الفاتورة الجديدة</div>
        </div>
        <div>
          {invoiceItems.map((item, index) => (
            <div key={index} className="flex gap-4 mb-4">
              <input
                placeholder="وصف البند"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, 'description', e.target.value)
                }
                className="flex-grow"
              />
              <input
                type="number"
                placeholder="المبلغ"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, 'amount', e.target.value)
                }
                className="w-1/3"
              />
            </div>
          ))}
          <button onClick={addInvoiceItem} className="mt-4">
            إضافة بند
          </button>
        </div>
        <footer>
          <p className="text-xl font-bold">الإجمالي: {invoiceTotal} دينار</p>
        </footer>
      </div>

      <button
        onClick={printInvoice}
        disabled={!selectedCustomer || invoiceItems.length === 0}
        className="w-full"
      >
        طباعة الفاتورة
      </button>
    </div>
  );
}

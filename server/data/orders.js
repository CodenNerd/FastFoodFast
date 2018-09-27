const orders = [
  {
    orderId: 1,
    userId: 6,
    food: {
      foodname: 'bread',
      quantity: 2,
      price: 400.00,
    },
    foodstatus: 'accepted',
    date: '9/5/2017',
    time: '08:20',
  },
  {
    orderId: 2,
    userId: 8,
    food: {
      foodname: 'milk',
      quantity: 2,
      price: 200.00,
    },
    foodstatus: 'pending',
    date: '4/2/2018',
    time: '03:11',
  },
  {
    orderId: 3,
    userId: 20,
    food: {
      foodname: 'amala',
      quantity: 3,
      price: 50.00,
    },
    foodstatus: 'rejected',
    date: '9/3/2018',
    time: '13:01',
  },
  {
    orderId: 4,
    userId: 6,
    food: {
      foodname: 'egusi',
      quantity: 1,
      price: 50.00,
    },
    foodstatus: 'delivered',
    date: '29/5/2018',
    time: '08:15',
  },
];

export default orders;

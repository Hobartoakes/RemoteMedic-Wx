Page({
  data: {
    active: 0,
    ingList: [
      {
        id: '123',
        doctor_name: '钟南山',
        begin_date: '2020-09-09',
        end_date: '2020-09-30',
        doctor_confirm: true,
        user_confirm: false,
        price: 15
      }
    ],
    waitCommentList: [
      {
        id: '123',
        doctor_name: '钟南山',
        begin_date: '2020-09-09',
        end_date: '2020-09-30',
        price: 15
      }
    ],
    finishList: [
      {
        id: '123',
        doctor_name: '钟南山',
        begin_date: '2020-09-09',
        end_date: '2020-09-30',
        price: 15
      }
    ],
  },
  onClickButton(){
    console.log('i am button')
  }
});
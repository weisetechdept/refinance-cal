var refi = new Vue({
    el: '#refi',
    data: {
        cal: {
            loan: '',
            toLoan: '0',
            installments: 48,
            instBook: 48,
            firate: 6.8,
            bookrate: 13.90
        },
        out: {
            paymonthfi: 0,
            paymonthbook: 0,
            payratefi: 0,
            payratebook: 0,
            save: 0
        }
    },
    watch: {
        cal: {
            deep: true,
            handler() {

                if(this.cal.loan == '') {
                    swal("กรุณากรอกจำนวนเงินกู้\nก่อนทำการคำนวณ", {
                        icon: "warning",
                    });
                    this.cal.toLoan = 0
                    this.out.paymonthfi = 0
                    this.out.paymonthbook = 0
                    this.out.payratefi = 0
                    this.out.payratebook = 0
                    this.out.save = 0

                } else {
                    this.cal.toLoan = parseInt(this.cal.loan).toLocaleString('th-TH');

                    if(this.cal.installments == 36) {
                        this.cal.instBook = 36;
                    } else if(this.cal.installments == 48) {
                        this.cal.instBook = 48;
                    } else if(this.cal.installments == 60) {
                        this.cal.instBook = 60;
                    } else if(this.cal.installments >= 72) {
                        this.cal.instBook = 60;
                    } 

                    this.out.payratefi =  parseInt((((this.cal.loan * (this.cal.firate * (this.cal.installments / 12))) / 100) * 1.07).toFixed(0)).toLocaleString('th-TH')
                    this.out.payratebook =  parseInt(((this.cal.loan * ((this.cal.bookrate) * (this.cal.instBook / 12))) / 100).toFixed(0)).toLocaleString('th-TH')

                    this.out.paymonthfi =  parseInt((((parseInt(((this.cal.loan * (this.cal.firate * (this.cal.installments / 12))) / 100)) + parseInt(this.cal.loan)) * 1.07 ) / this.cal.installments).toFixed(0)).toLocaleString('th-TH')
                    this.out.paymonthbook = parseInt(((parseInt(((this.cal.loan * ((this.cal.bookrate) * (this.cal.instBook / 12))) / 100)) + parseInt(this.cal.loan)) / this.cal.instBook).toFixed(0)).toLocaleString('th-TH')
                    this.out.save = parseInt(parseInt(((this.cal.loan * (this.cal.bookrate * (this.cal.instBook / 12))) / 100).toFixed(0)) - (parseInt((((this.cal.loan * (this.cal.firate * (this.cal.installments / 12))) / 100) * 1.07).toFixed(0))) - parseInt(10000)).toLocaleString('th-TH')
                }

                
            }
        }
    },
});

function Comma(Num) { //function to add commas to textboxes
    Num += '';
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    Num = Num.replace(',', '');
    x = Num.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}
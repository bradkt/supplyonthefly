<template>
  <section>

    <div class="row">
      <div class="container-fluid bg-1 text-center">
        <h2>Welcome To your Employee Page, {{ getUserData.person.firstname }}</h2>
        <div class="earned-days-off">
          <div class="dayOffBlock"><span class="label">Employee ID: </span><span class="med-num">{{ getUserData.employee.employeeNumber }}</span></div>
          <div class="dayOffBlock"><span class="label">Sick Days: </span><span class="big-num">{{ profile.sickDaysRemain }}</span></div>
          <div class="dayOffBlock"><span class="label">Vacation Days: </span><span class="big-num">{{ profile.vacationDaysRemain }}</span></div>
          <div class="dayOffBlock"><span class="label">Personal Days: </span><span class="big-num">{{ profile.personalDays }}</span></div>
        </div>
      </div>
    </div>  <!--End Row-->


    <div class="row">
      <div class="container-fluid bg-2 text-center">
        <h3 class="">Documents & Upcoming Marketing Programs</h3>
        <ul class="list">
          <li v-for="doc in documents">
            <a v-bind:href="doc.url">{{ doc.title }}</a>
          </li>
        </ul>
      </div>



    </div> <!--End Row-->

    <div class="row">

      <div class="container-fluid bg-2 text-center col-sm-6">
        <h3 class="">Training</h3>
        <ul class="list">
          <li v-for="doc in training">
            <a v-bind:href="doc.url">{{ doc.title }}</a>
          </li>
        </ul>
      </div>

      <div class="container-fluid bg-2 text-center col-sm-6">
        <h3 class="">Holiday Schedule</h3>
        <ul class="list">
          <li v-for="day in holidays">
            <span>{{ day.name }}</span><span>{{ day.date }}</span>
          </li>
        </ul>
      </div>

    </div>

    <div class="row">

      <div class="container-fluid bg-1">
        <div class="timeOff">
          <h3 class="">Time Off Requests</h3>
          <div class="list full-width">
            <label>Begin: </label><datepicker v-model="fromDate" class="datepicker input" :disabled="startDateDisabled"></datepicker>
            <label>End : </label><datepicker v-model="toDate" class="datepicker input" :disabled="endDateDisabled"></datepicker>

            <select v-model="reasonSelected" class="input">
              <option disabled value="">Please select Reason</option>
              <option>Sick Day</option>
              <option>Personal Day</option>
              <option>Vacation</option>
            </select>
            <button :disabled="isDisabled" @click.prevent="submitTimeOff" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>  <!--End Row-->

    <div class="row">
      <div class="container-fluid bg-2 text-center">
        <h3 class="">Employee Directory</h3>
        <ul class="employee-list">
          <li v-for="emp in employees">
          <a @click="showEmp(emp)">{{ emp.name }}</a><span>{{ emp.position }}</span><span>{{ emp.phone }}</span>
          </li>
        </ul>
      </div>

    </div>  <!--End Row-->


    <div class="modal fade" id="displayInfo" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">

          <div v-if="!recover" class="modal-body">

            {{ data }}

          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>

  </section>





</template>

<script>
    import { mapGetters } from 'vuex';
    import Datepicker from 'vuejs-datepicker';

    export default {
        name: 'Portal',
        components: {
            Datepicker: Datepicker,
        },
        data() {
            return {
                data:'',
                fromDate: new Date(2017, 10, 10),
                toDate: new Date(2017, 11,  12),
                startDateDisabled: {
                    to: new Date(2017, 11, 1), // Disable all dates up to specific date
                    from: new Date(2018, 11, 31), // Disable all dates after specific date
                    days: [6, 0], // Disable Saturday's and Sunday's
                },
                endDateDisabled: {
                    to: new Date(2017, 11, 1), // Disable all dates up to specific date
                    from: new Date(2018, 11, 31), // Disable all dates after specific date
                    days: [6, 0], // Disable Saturday's and Sunday's
                },
                reasonSelected: '',
                profile: {"username": "Brad", sickDaysRemain: 3, vacationDaysRemain: 6, personalDays: 2},
                holidays:  {"day1": { name: "Christmas", date: "December 25, 2017"},
                            "day2": { name: "New Years Day", date: "January 01, 2017"},
                            "day2": { name: "Martin Luther King, Jr. Day", date: "January 15, 2017"},
                            "day3": { name: "Thanksgiving Day", date: "November 25, 2017"},
                            "day4": { name: "Memorial Day", date: "May 15, 2017"},
                            "day5": { name: "Labor Day", date: "September 15, 2017"},
                },
                documents: {
                    "doc1": { url: "https://www.irs.gov/pub/irs-pdf/fw4.pdf", title: "W4 on the IRS site"},
                    "doc2": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                    "doc14": { url: "http://www.supplyonthefly.site/documents/Mission-Statement.pdf", title: "Mission Statement PDF"},
                    "doc3": { url: "https://www.uscis.gov/sites/default/files/files/form/i-9.pdf", title: "I-9 on the IRS site"},
                    "doc4": { url: "http://www.supplyonthefly.site/images/EmployeeBadges-SotF.png", title: "Employee Badge"},
                    "doc5": { url: "http://www.supplyonthefly.site/images/PayStub-SotF.png", title: "Pay Stub"},
                    "doc6": { url: "http://www.supplyonthefly.site/images/TimeOffRequest-SotF.png", title: "Christmas Marketing Preview"},
                    "doc7": { url: "http://www.supplyonthefly.site/images/TimeOffRequest-SotF.png", title: "Company History"},
                    "doc8": { url: "http://www.supplyonthefly.site/images/Website-Promo-2.png", title: "OnLine Promo"},
                    "doc9": { url: "http://www.supplyonthefly.site/images/Website-Promo-1.png", title: "Printer Ink Sale"},
                    "doc10": { url: "http://www.supplyonthefly.site/images/jamie-card.png", title: "Sample Business Card"},
                    "doc11": { url: "http://www.supplyonthefly.site/images/FlyerPromoChristmas.png", title: "Christmas Promo"},
                    "doc12": { url: "http://www.supplyonthefly.site/images/FlyerPromoReponing.png", title: "Reopening Promo"},
                    "doc13": { url: "http://www.supplyonthefly.site/images/WebsitePromoNewYear.png", title: "New Year Promo"},
                },
                training: {
                    "doc1": { url: "https://www.irs.gov/pub/irs-pdf/fw4.pdf", title: "Employee Web Portal"},
                    "doc2": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Shopping Site"},
                    "doc14": { url: "http://www.supplyonthefly.site/documents/Mission-Statement.pdf", title: "Financial Application"},
                    "doc3": { url: "https://www.uscis.gov/sites/default/files/files/form/i-9.pdf", title: "Inventory Management Application"},
                    "doc4": { url: "http://www.supplyonthefly.site/images/EmployeeBadges-SotF.png", title: "Network"},
                    "doc5": { url: "http://www.supplyonthefly.site/images/PayStub-SotF.png", title: "Quick How Tos"},
                    "doc6": { url: "http://www.supplyonthefly.site/images/TimeOffRequest-SotF.png", title: "Other Resources"},
                },
                employees: {"emp1": { id: "1234qwer", position: "Web Developer", name: "Brad Tracy", phone: "(614)555-5555",
                                email: "brad@supplyonthefly.site", sickDaysRemain: "2", vacationDaysRemain: "6", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp2": { id: "sdfg5678", position: "Software Engineer", name: "Jason Parker", phone: "(614)555-5555",
                                email: "jason@supplyonthefly.site", sickDaysRemain: "3", vacationDaysRemain: "6", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp3": { id: "sery89gh", position: "Software Engineer", name: "Yonas Milo", phone: "(614)555-5555",
                                email: "yonas@supplyonthefly.site", sickDaysRemain: "4", vacationDaysRemain: "2", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp4": { id: "43lk5jh5", position: "Network Engineer", name: "Jamie Diehl", phone: "(614)555-5555",
                                email: "jamie@supplyonthefly.site", sickDaysRemain: "5", vacationDaysRemain: "3", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp5": { id: "w45kj5kl", position: "Network Engineer", name: "Jeff Lynch", phone: "(614)555-5555",
                                email: "jeff@supplyonthefly.site", sickDaysRemain: "6", vacationDaysRemain: "4", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                },
            };
        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                if(!vm.isLoggedIn || !vm.getUserData.employee){
                    return next('/');
                }
            });
        },
        computed: {
            ...mapGetters({
                getUserData: 'getUserData',
                isLoggedIn: 'isLoggedIn',
            }),
            isDisabled(){
                if (!this.errors.any() && this.reasonSelected != 'Please select Reason') {
                    return false;
                } else {
                    return true;
                }

            },
        },
        methods: {
            showEmp(emp) {
                this.data =
                  `Employee Name: ${emp.name} -
                  Position:      ${emp.position} -
                  Email:      ${emp.email} -
                  Phone:      ${emp.phone}`;
                jQuery('#displayInfo').modal('show');
            },
            submitTimeOff(){
                this.data = "Your Request Has been Submitted.";
                jQuery('#displayInfo').modal('show');
            },
        },
    }

</script>

<style scoped>

  button{
    margin: 10px 50%;
  }

  h2 {
    color: white;
    margin-bottom: 40px;
  }

  .list {
    font-size: 18px;
    border: solid 1px dimgrey;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    width: 430px;
    margin: 10px auto;
    padding: 10px 10px;
  }

  .list li {
    margin: 5px 0;
  }

  .full-width {
    width: 95%;
  }

  .employee-list{
    font-size: 18px;
    border: solid 1px dimgrey;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    width: 80%;
    margin: 10px auto;
    padding: 10px 10px;

  }

  .employee-list li {
    margin: 8px 10px;
    text-align: center;
  }

  .bg-2 .employee-list span {
    display: inline-block;
    border-left: 2px solid white;
    padding: 0 12px;
    margin: 10px 10px;
    width: 200px;
  }

  .bg-2 .employee-list a {
    display: inline-block;
    padding: 0 12px;
    margin: 10px 10px;
    width: 180px;
  }

  .timeOff {
    color: #474e5d;
  }

  .timeOff .full-width div {
    display: inline-block;
    margin: 30px 55px;

  }

  .timeOff select {
    width: 350px;
    display: block;
  }

  /*.timeOff label {*/
    /*display: block;*/
  /*}*/

  .datepicker {
    display: inline-block;
  }

  .input {
    display: block;
    color: black;
    margin: 20px auto;
    height: 28px;
    width: 170px;
  }

  p {
    font-size: 16px;
    margin: 25px 0 10px 0;
  }

  .bg-2 {
    background-color: #474e5d; /* Dark Blue */
    color: #ffffff;
    min-height: 500px;
  }

  .bg-1 {
    background-color: #00BEC5;
    color: #474e5d;
    min-height: 400px;
  }

  .bg-2 a, .bg-2 span, .bg-2 span, .bg-1 a {
    margin: 5px 20px 5px 0px;
  }

  .bg-2 ul li, .bg-1 ul li {
    list-style-type: none;
  }

  a {
    color: whitesmoke;
  }

  .container-fluid {
    padding-top: 70px;
    padding-bottom: 70px;
  }

  .dayOffBlock {
    display: inline-block;
    border: solid 1px dimgrey;
    padding: 5px 15px;
    margin: 5px 10px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    width: 250px;
    height: 150px;
  }

  .label {
    display: block;
    margin: 0 0 10px 0;
    color: #474e5d;
  }

  .earned-days-off span {
    font-size: 16px;
    padding: 20px 0 0 0;
  }

  span.big-num {
    font-size: 35px;
  }

  span.med-num {
    font-size: 35px;
  }

  #displayInfo input[type=text], input[type=password] {
    height: 44px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
    /*background: #fff;*/
    border: 1px solid #d9d9d9;
    border-top: 1px solid #c0c0c0;
    padding: 0 8px;
    box-sizing: border-box;
  }

  #displayInfo input[type=text]:hover, input[type=password]:hover {
    border: 1px solid #b9b9b9;
    border-top: 1px solid #a0a0a0;
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .hidden {
    display: none;
  }

  .modal-footer {
    text-align: center;
  }

  .modal-footer button, .modal-footer .login-help {
    margin: 15px 0 0 0;
  }

</style>
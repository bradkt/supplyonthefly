<template>
  <section>

    <div class="row">
      <div class="container-fluid bg-top text-center">
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
      <div class="container-fluid bg-2 text-center col-sm-6">
        <h3 class="">Documents & Training Guides</h3>
        <ul class="list">
          <li v-for="doc in documents">
            <a href="">{{ doc.title }}</a>
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

    </div> <!--End Row-->

    <div class="row">

      <div class="container-fluid bg-1 text-center col-sm-6">
        <div class="timeOff">
          <h3 class="">Time Off Requests</h3>
          <div class="list">
            <label>Begin: </label><datepicker v-model="fromDate" class="datepicker input" :disabled="dateDisabled"></datepicker>
            <label>End : </label><datepicker v-model="toDate" class="datepicker input"></datepicker>
            <label>Reason : </label><select v-model="reasonSelected" class="input">
              <option disabled value="">Please select Reason</option>
              <option>Sick Day</option>
              <option>Personal Day</option>
              <option>Vacation</option>
            </select>
            <button :disabled="isDisabled" @click.prevent="submitTimeOff" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>

      <div class="container-fluid bg-1 text-center col-sm-6">
        <h3 class="">Employee Directory</h3>
        <ul class="list">
          <li v-for="emp in employees">
            <a @click="showEmp(emp)">{{ emp.name }}</a><span>{{ emp.position }}</span>
          </li>
        </ul>
      </div>

    </div>  <!--End Row-->

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
                fromDate: new Date(2017, 11,  16),
                toDate: new Date(2017, 11,  16),
                dateDisabled: {
                    to: new Date(2018, 0, 1), // Disable all dates up to specific date
                    from: new Date(2017, 0, 31), // Disable all dates after specific date
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
                documents: {"doc1": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                            "doc2": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Christmas Marketing Preview"},
                            "doc3": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                            "doc4": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                            "doc5": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                            "doc6": { url: "http://www.supplyonthefly.site/documents/Company-History.pdf", title: "Company History"},
                },
                employees: {"emp1": { id: "1234qwer", position: "Web Developer", name: "Brad Tracy", phone: "(614)555-5555",
                                email: "brad@supplyonthefly.site", sickDaysRemain: "2", vacationDaysRemain: "6", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp2": { id: "sdfg5678", position: "Software Engineer", name: "Jason Parker", phone: "(614)555-5555",
                                email: "jason@supplyonthefly.site", sickDaysRemain: "3", vacationDaysRemain: "6", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp3": { id: "sery89gh", position: "Software Engineer", name: "Yonas Milo", phone: "(614)555-5555",
                                email: "brad@supplyonthefly.site", sickDaysRemain: "4", vacationDaysRemain: "2", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp4": { id: "43lk5jh5", position: "Network Engineer", name: "Jamie Diehl", phone: "(614)555-5555",
                                email: "brad@supplyonthefly.site", sickDaysRemain: "5", vacationDaysRemain: "3", hireDate: "",
                                department: "Technoloy Development", status: "active"},
                            "emp5": { id: "w45kj5kl", position: "Network Engineer", name: "Jeff Lynch", phone: "(614)555-5555",
                                email: "brad@supplyonthefly.site", sickDaysRemain: "6", vacationDaysRemain: "4", hireDate: "",
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
                return false;
            },
        },
        methods: {
            showEmp(emp) {
                alert( "\n " +
                      "Employee Name - " + emp.name + "\n " +
                      "Position -      " + emp.position + "\n " +
                      "email -         " + emp.email + "\n " +
                      "phone -         " + emp.phone + "\n "
                );
            },
            submitTimeOff(){
                alert("Your Request Has been Submitted.");
            },
        },
    }

</script>

<style scoped>

  button{
    margin: 10px 50%;
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

  .timeOff {
    text-align: left;
    padding: 0 0 0 8%;
  }

  .datepicker {
    display: block;
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

  .bg-top {
    background-color: #00BEC5;
    color: #ffffff;
    min-height: 300px;
  }
  .bg-2 {
    background-color: #474e5d; /* Dark Blue */
    color: #ffffff;
    min-height: 500px;
  }
  .bg-1 {
    background-color: #00BEC5;
    color: #ffffff;
    min-height: 550px;
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
    width: 200px;
    height: 150px;
  }

  .label {
    display: block;
    margin: 0 0 10px 0;
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

</style>
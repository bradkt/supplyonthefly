<template>
  <div class="modal fade" id="updateInformationModal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">Update Account Information</h4>
        </div>
        <div class="modal-body">
          <form>

            <p :class="{ 'control': true }">
              <input id="firstName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('firstName') }"
                     data-vv-delay="300" name="firstName" type="text" placeholder="First Name" v-model="getUserData.person.firstname" required autofocus>
              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
            </p>

            <p :class="{ 'control': false }">
              <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                     data-vv-delay="300" name="lastName" type="text" placeholder="Last Name" v-model="getUserData.person.lastname" required>
              <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     data-vv-delay="300" name="email" type="text" placeholder="Email" v-model="getUserData.person.login.username" required>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="address" id="address" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" :class="{'input': true, 'is-danger': errors.has('address') }"
                     data-vv-delay="300" name="address" type="text" placeholder="Street Address" v-model="getUserData.person.address" required>
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="city" id="city" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="city" type="text" placeholder="City" v-model="getUserData.person.city" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="state" id="state" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="state" type="text" placeholder="State ex: OH" v-model="getUserData.person.state" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="zipcode" id="zipcode" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="zipcode" type="text" placeholder="Zip Code" v-model="getUserData.person.zipcode" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="phone" id="phoneNumber" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="phone" type="text" placeholder="Phone (ex: 6145555555)" v-model="getUserData.person.phoneNumber" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <hr>
            <div v-if="getUserData.customer">
              <h2>Payment Information</h2>

              <p :class="{ 'control': true }">
                <input id="ccFirstName" v-validate="'alpha'" :class="{'input': true, 'is-danger': errors.has('ccFirstName') }"
                       data-vv-delay="300" name="ccFirstName" type="text" placeholder="First Name On Card" v-model="getUserData.customer.ccFirstname" required>
                <span v-show="errors.has('ccFirstName')" class="help is-danger">{{ errors.first('ccFirstName') }}</span>
              </p>

              <p :class="{ 'control': false }">
                <input id="ccLastName" v-validate="'alpha'" :class="{'input': true, 'is-danger': errors.has('ccLastName') }"
                       data-vv-delay="300" name="ccLastName" type="text" placeholder="Last Name On Card" v-model="getUserData.customer.ccLastname" required>
                <span v-show="errors.has('ccLastName')" class="help is-danger">{{ errors.first('ccLastName') }}</span>
              </p>
              <!--required|credit_card-->
              <p :class="{ 'control': true }">
                <input v-validate="'credit_card'" :class="{'input': true, 'is-danger': errors.has('credit_card') }" v-model="getUserData.customer.creditcardNumber"
                       data-vv-delay="500" name="creditCard" type="text" placeholder="Credit Card Number">
                <span v-show="errors.has('creditCard')" class="help is-danger">Please Enter A Valid Credit Card Number</span>
              </p>
              <div>
                <select class="list" v-model="getUserData.customer.creditcardNumber">
                  <option>Type of Card</option>
                  <option>Visa</option>
                  <option>MasterCard</option>
                  <option>Amex</option>
                </select>
              </div>
              <p :class="{ 'control': true }">
                <input v-validate="'date_format:MM/YY'" data-vv-delay="200" v-model="getUserData.customer.expDate"
                       :class="{'input': true, 'is-danger': errors.has('expiry') }" name="expiry" type="text" placeholder="MM/YY of Expiration">
                <span v-show="errors.has('expiry')" class="help is-danger">Please Enter A Valid Month/Year</span>
                <p v-if="!validExpireDate()" class="help is-danger">{{ expireMessage }}</p>
              </p>
              <p :class="{ 'control': true }">
                <input id="cvv" v-validate="{rules: { regex:  /^[0-9]{3,4}$/}}" data-vv-delay="200"
                       :class="{'input': true, 'is-danger': errors.has('cvv') }"
                       v-model="getUserData.customer.cvv" name="cvv" type="text" placeholder="CVV">
                <span v-show="errors.has('cvv')" class="help is-danger">{{ errors.first('cvv') }}</span>
              </p>
            </div>


            <div v-if="getUserData.employee">
              <h2>Employee Information</h2>
                <p :class="{ 'control': true }">
                  <input id="role" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('role') }"
                         data-vv-delay="300" name="role" type="text" placeholder="Role" v-model="getUserData.employee.role" required>
                  <span v-show="errors.has('role')" class="help is-danger">{{ errors.first('role') }}</span>
                </p>
              <p :class="{ 'control': true }">
                <input id="department" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('department') }"
                       data-vv-delay="300" name="department" type="text" placeholder="Department" v-model="getUserData.employee.department" required>
                <span v-show="errors.has('department')" class="help is-danger">{{ errors.first('department') }}</span>
              </p>
            </div>

            <hr>
            <h2>Password</h2>
            <p :class="{ 'control': true }">
            <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }"
            data-vv-delay="300" name="password" type="password" placeholder="Password" v-model="getUserData.person.login.password" required>
            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
            <p :class="{ 'control': true }">
            <input id="passwordVerify" v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('passwordVerify') }"
            data-vv-delay="300" data-vv-as="password" name="passwordVerify" v-model="newPassword" type="password" placeholder="Verify Password" required>
            <span v-show="errors.has('passwordVerify')" class="help is-danger">{{ errors.first('passwordVerify') }}</span>
            </p>

          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

          <button :disabled="isDisabled" @click.prevent="updateData" type="submit" class="btn btn-primary">Update Information</button>
          <div class="login-help">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import moment from 'moment';

    export default {
        data () {
            return {
                headerText: "Supply On The Fly",
                newPassword: '',
                creditCard: '',
            }
        },
        created: function () {

        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                getUserData: 'getUserData'
            }),
            isDisabled(){
                if (!this.errors.any()){
                    return false;
                } else {
                    return true;
                }
            },
        },
        methods: {
            updateData(){
                let _this = this;
                if (this.getUserData.customer) {
                    let customerID = this.getUserData.customer.customerId;
                    if (this.newPassword != ''){
                        this.getUserData.person.login.password = window.btoa(this.newPassword);
                        this.newPassword = window.btoa(this.newPassword);
                    }
                    this.axios.put('http://supplyonthefly.business:8080/capstone-website-api/user/customer/profile/' + customerID, {
                        customer: this.getUserData.customer,
                        person: this.getUserData.person,
                    }).then(function (response) {
                            console.log(response);
                            _this.updatePassword();
                    }).catch(function (error) {
                            console.log(error);
                    });
                }
                if (this.getUserData.employee) {
                    let employeeID = this.getUserData.employee.employeeNumber;
                    if (this.newPassword != ''){
                        this.getUserData.person.login.password = window.btoa(this.newPassword);
                        this.newPassword = window.btoa(this.newPassword);
                    }
                    this.axios.put('http://supplyonthefly.business:8080/capstone-website-api/user/employee/profile/' + employeeID, {
                        employee: this.getUserData.employee,
                        person: this.getUserData.person,
                    }).then(function (response) {
                            console.log(response);
                    }).catch(function (error) {
                            console.log(error);
                    });
                }

            },
            updatePassword(){
                let email = this.getUserData.person.login.username;

                this.axios.put('http://supplyonthefly.business:8080/capstone-website-api/user/password/reset', {
                    username: email,
                    password: this.newPassword,
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            validExpireDate() {
                let dateArray = this.dateExpire.split('/');
                let month = dateArray[0];
                let year = parseInt(dateArray[1]) + 2000;
                let today = moment();
                let dateToExpire = moment(month + "-03-" + year);
                return today.isBefore(dateToExpire);
            },
        }
    }
</script>

<style scoped>

  .list {
    font-size: 18px;
    width: 100%;
    margin: 0 0 10px 0;
    padding: 10px 10px;
  }

  #updateInformationModal input[type=text], input[type=email], input[type=password] {
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

  #updateInformationModal input[type=text]:hover, input[type=email]:hover, input[type=password]:hover {
    border: 1px solid #b9b9b9;
    border-top: 1px solid #a0a0a0;
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .modal-footer {
    text-align: center;
  }

  .modal-footer button, .modal-footer .login-help {
    margin: 15px 0 0 0;
  }

  .menu-icons {
    margin: -10px 0px 0 0px;
  }

</style>
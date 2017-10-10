<template>
  <!-- Contact Modal -->
  <div class="modal fade" id="ContactModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h3 class="modal-title">How can we Help?</h3>
        </div>
        <div class="modal-body">

          <form>
            <p :class="{ 'control': true }">
              <input id="contact-email" v-validate="'required|email'" v-model="email"
                     :class="{'input': true, 'is-danger': errors.has('contact-email') }" name="contact-email" type="text" placeholder="Email" autofocus>
              <span v-show="errors.has('contact-email')" class="help is-danger">{{ errors.first('contact-email') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input id="fullName" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" data-vv-delay="300" v-model="name"
                     :class="{'input': true, 'is-danger': errors.has('fullName') }" name="fullName" type="text" placeholder="Name">
              <span v-show="errors.has('fullName')" class="help is-danger">Names should contain Letters and Numbers only</span>
            </p>
            <p :class="{ 'control': true }">
              <textarea id="comment" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" data-vv-delay="700" v-model="flyMessage"
                        :class="{'input': true, 'is-danger': errors.has('comment') }" name="comment" type="text" placeholder="Comment"></textarea>
              <span v-show="errors.has('comment')" class="help is-danger">Comments should contain Letters and Numbers only</span>
            </p>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button @click.prevent="submit" :disabled="isDisabled" type="button" class="btn btn-primary">Submit</button>
          <div class="login-help">
            <p>{{ Text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                Text: 'Supply On The Fly',
                email: '',
                name: '',
                flyMessage: '',
            };
        },
        created: function () {

        },
        computed: {
            isDisabled(){
                return this.errors.any();

            }
        },
        methods: {
            submit() {
                console.log(this.name, this.email, this.flyMessage);
            }
        }
    }

</script>

<style scoped>

  #ContactModal input[type=text], input[type=email] {
    height: 44px;
    font-size: 16px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid #d9d9d9;
    border-top: 1px solid #c0c0c0;
    padding: 0 8px;
    box-sizing: border-box;
  }

  #ContactModal input[type=text]:hover, input[type=email]:hover, textarea:hover{
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

  textarea {
    width: 100%;
    height: 150px;
    font-size: 16px;
    border: 1px solid #d9d9d9;
    border-top: 1px solid #c0c0c0;
    padding: 0 8px;
    box-sizing: border-box;
  }

</style>
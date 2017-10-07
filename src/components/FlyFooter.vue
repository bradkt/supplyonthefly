<template>
    <footer>
        <!--<p class="pull-right"><a href="#">Back to top</a></p>-->
        <p>&copy; 2017 {{ footerText }} Inc. &middot; <a href="#">Privacy</a> &middot; <a href="#">Terms</a></p>
    </footer>
</template>

<script>
    export default {
        data() {
            return {
                footerText: "Supply On The Fly"
            };
        }
    }

</script>

<style scoped>

    footer {
        height: 100px;
        font-family: Helvetica, sans-serif;
        margin: 15px 0 0 0;
        /*background-color: rgba(50, 50, 50, 0.3);*/
    }

</style>
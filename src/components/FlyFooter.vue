<template>
    <footer>
        <p><span>&copy; 2017 {{ footerText }} Inc. &middot;</span>
        </p>
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
        margin: 150px 0 0 0;
        font-size: 18px;
        padding: 20px 0;
        background-color: rgba(61, 55, 53, 0.6);
    }

    footer span {
        margin: 0px 40px;
    }

</style>
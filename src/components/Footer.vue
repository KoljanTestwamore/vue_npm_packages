<template>
    <footer class="footer">
        Made by <i> Anton Petrov </i>
        <a 
            class="footer__link"
            href="https://github.com/KoljanTestwamore"
        > https://github.com/KoljanTestwamore </a>
    </footer>
</template>

<script>
export default {
    
};
</script>

<style lang="scss" scoped>
.footer {
    left: 0;
    bottom: 0;
    text-align: right;
    padding: 20px 50px 10px 0;
    background-color: rgb(209, 209, 209);
    box-sizing: border-box;
    width: 100%;
    position: fixed;
}

.footer__link {
    padding: 10px;
}
</style>
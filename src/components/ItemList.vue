<template>
    <div
        class="pages"
        v-if="pageList.length > 1"
    >
        <span
            class="pages__page"
            v-for="tpage in pageList"
            :key="tpage"
            @click="setPage(tpage)"
            :class="(tpage === page) && 'pages__page--selected'"
        >
            {{tpage + 1}}

        </span>
    </div>
    <ItemCard
        v-for="item in currentItems"
        :key="item"
        :info="item"
        :clickable="true"
    />
</template>

<script>
import ItemCard from "./ItemCard.vue";

export default {
    props: {
        items: Array
    },
    components: {
        ItemCard
    },
    data: function() {
        return {
            page: 0
        };
    },
    methods: {
        setPage: function(page) {
            this.page = page;
        }
    },
    computed: {
        currentItems() {
            return this.items.slice(this.page * 10, this.page * 10 + 10);
        },
        pageList() {
            let result = [];
            for (let i = 0; i < this.items.length / 10; i++) {
                result.push(i);
            }
            return result;
        }
    },
    watch: {
        items: function() {
            this.setPage(0);
        }
    }
};
</script>

<style lang="scss" scoped>
.pages {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    &__page {
        padding: 4px;
        cursor: pointer;
    
        &--selected {
            text-decoration: underline;
        }
    }
}
</style>
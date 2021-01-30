<template>
    <div 
        class="item-card"
        @click="showPanel"
        :class="clickable && 'item-card--hoverable'"
    >
        <div class="item-card__title">
            {{parsedData.name}}
        </div>
        <div
            class="item-card__username"
        >
            🧍 {{parsedData.publisher.username}}
        </div>
        <p
            class="item-card__description"
        >
            {{parsedData.description}}
        </p>
        <div
            class="item-card__keyword-group"
            v-if="parsedData.keywords && parsedData.keywords.length > 0"
        >
            <div
                v-for="keyword in parsedData.keywords"
                :key="keyword"
                class="item-card__keyword"
            >
                {{keyword}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        info: Object,
        clickable: Boolean
    },
    data: function() {
        return {
            panelHidden: true
        };
    },
    computed: {
        parsedData: function () {
            return this.info.package;
        }
    },
    methods: {
        showPanel: function() {
            if (this.clickable) {
                this.$store.commit('setViewedPackageStringified', JSON.stringify(this.info));
                this.$store.commit('setModalVisible', true);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.item-card {
    width: 400px;
    padding: 10px;
    border-bottom: 3px solid #000;
    margin: 5px 0;

    &--hoverable:hover {
        background-color: #c9c9c9;
        cursor: pointer;
    }

    & > div {
        padding: 2px 0;
    }

    &__description {
        word-break: break-word;
    }

    &__title {
        font-size: 1.5rem;
    }

    &__username {
        font-size: 0.7rem;
    }

    &__keyword-group {
        display: flex;
        flex-wrap: wrap;
    }

    &__keyword {
        border: 1px solid #000;
        padding: 2px 3px;
        margin-left: 3px;
        margin-top: 5px;
    }
}

</style>
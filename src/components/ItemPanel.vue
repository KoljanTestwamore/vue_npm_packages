<template >
    <div 
        class="item-panel__paranja"
        v-if="modalVisible"
        @keydown.esc.stop="close"
    >
        <div
            class="item-panel__container"
        >
            <div
                v-if="searching"
            >
                ⏳
            </div>
            <ItemCard 
                :info="viewedPackage"
            />
            <div
                class="item-panel__versions"
                v-if="info.versions && (Object.keys(info.versions).length > 0)"
            >
                Versions:
                <span
                    v-for="version in Object.keys(info.versions)"
                    :key="version"
                    class="item-panel__version"
                >
                    {{version}}
                </span>
            </div>
            <div
                class="item-panel__rank"
                v-if="info.rank"
            >
                Rank: {{info.rank}}
            </div>
            <span
                class="item-panel__close-icon"
                @click.stop="close"
            >
                ❌
            </span>
        </div>
    </div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
    components: {
        ItemCard
    },
    data: function() {
        return {
            info: {},
            searching: false,
            error: false
        };
    },
    methods: {
        close: function() {
            this.$store.commit('setModalVisible', false);
        },
        getInfo: async function() {
            let body;
            this.searching = true;
            try {
                const result = await fetch(`https://data.jsdelivr.com/v1/package/npm/${this.viewedPackage.package.name}/stats`);
                body = await result.json();
            } catch(e) {
                console.log(e);
            }
            this.info = body;
            this.searching = false;
        }
    },
    computed: {
        name() {
            return this.$store.getters.packageName;
        },
        viewedPackage() {
            return this.$store.getters.viewedPackage;
        },
        modalVisible: function() {
            return this.$store.getters.isModalVisible;
        }
    },
    watch: {
        modalVisible: function() {
            if (this.modalVisible) {
                document.body.style.overflowY = 'hidden';
                this.getInfo();
            } else {
                document.body.style.overflowY = 'scroll';
            }
        }
    }
};
</script>

<style lang="scss">
.item-panel {
    &__paranja {
        position: fixed;
        background-color: rgba($color: #000000, $alpha: .4);
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__container {
        position: fixed;
        background-color: #fff;
        padding: 5px;
        border: 1px solid #000;
        box-shadow: 5px 5px 0px 0px rgba(0,0,0,0.48);
    }

    &__version {
        padding: 6px;
    }

    &__rank {
        padding-top: 6px;
    }

    &__close-icon {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
    }
}
</style>
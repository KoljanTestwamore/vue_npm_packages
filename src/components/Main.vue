<template>
    <div class="main-container">
        <form
            class="input-group"
            @submit="submit"
        >
            <input
                class="input-group__input"
                v-model="itemName"
                placeholder="Enter your package name"
            >
            <button
                class="input-group__submit-button"
                @click="submit"
            >
                🔍
            </button>
        </form>
        <div
            class="main-container__wait-sign"
            v-if="searching"
        >
            ⏳
        </div>
        <ItemList
            :items="items"
            v-else-if="items.length > 0"
        />
        <div
            class="main-container__empty-search"
            v-else-if="searched"
        >
            ⚪️ No results
        </div>
        
        <div
            class="main-container__error-message"
            v-if="isError"
        >
            ❗ Error occured
        </div>
        <ItemPanel
        />
    </div>
</template>

<script>
import ItemList from "./ItemList.vue";
import ItemPanel from "./ItemPanel";

export default {
    name: "Main",
    components: {
        ItemList,
        ItemPanel
    },
    data: function() {
        return {
            message: "",
            itemName: "",
            items: [],
            searched: false,
            searching: false,
            isError: false
        };
    },
    methods: {
        submit: function (e) {
            e.preventDefault();
            this.message = this.itemName;
            this.getPackageList(this.message);
        },
        getPackageList: async function(text) {
            this.items = [];
            this.searching = true;
            this.isError = false;
            let body;
            try {
                const result = await fetch(`https://registry.npmjs.org/-/v1/search?text=${text}&size=250`);
                body = await result.json();
                this.items = body.objects;
            } catch(e) {
                this.isError = true;
                console.log(e);
            }
            this.searched = true;
            this.searching = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
}

.input-group {
    display: flex;
    flex-direction: row;
    padding: 20px 0;
    justify-content: center;
    width: 400px;

    &__input {
        border: 0;
        border-bottom: 2px solid #000;
        margin-right: 20px;
        outline: none;
        width: 350px;
    }

    &__submit-button {
        width: 30px;
        height: 30px;
        padding: 1px;
        background-color: #fff;
        border: 2px solid #000;
        cursor: pointer;
    }

    @media screen 
        and (max-width:480px) {
          width: 100%;

          &__input {
              width: 80%;
        }
    }
}
</style>
